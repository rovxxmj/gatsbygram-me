import React, { createContext, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import Modal from '@components/Modal';
import styled from '@emotion/styled';
import Step from '@components/CreatePostModal/Step';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FirstStep from '@components/CreatePostModal/FirstStep';
import SecondStep from '@components/CreatePostModal/SecondStep';
import MessageModal from '@components/MessageModal';
import { toast } from 'react-toastify';
import ThirdStep from '@components/CreatePostModal/ThirdStep';
import useInput from '@hooks/useInput';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

export const ModalContent = styled.div<{ [key: string]: any }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: ${({ bigger }) => (bigger ? '1100px' : '700px')};
  height: 740px;
  border-radius: 6px;
  overflow: hidden;
  transition: 0.4s ease;
  & form {
    width: 100%;
    height: 100%;
  }
`;

interface IImage {
  src: string;
}

interface IContext {
  imageUrls: IImage[];
  setImageUrls: React.Dispatch<React.SetStateAction<IImage[]>>;
  [key: string]: any;
}
export const CreatePostContext = createContext<IContext>({ imageUrls: [], setImageUrls: () => [] });

const CreatePostModal: FC<IProps> = ({ show, onCloseModal }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [imageFiles, setImageFiles] = useState<any[]>([]);
  const [imageUrls, setImageUrls] = useState<{ src: string }[]>([]);
  const [finalImages, setFinalImages] = useState<{ src: string }[]>([]);
  const [location, onChangeLocation, setLocation] = useInput(undefined);
  const [content, onChangeContent, setContent] = useInput('');
  const [hideCounts, setHideCounts] = useState(false);
  const [turnOffComments, setTurnOffComments] = useState(false);
  const [percent, setPercent] = useState(0); // progressBar - width(%)
  const [showMessage, setShowMessage] = useState(false);

  const onShowMessage = useCallback(() => {
    setShowMessage(true);
  }, []);

  const onCloseMessage = useCallback(() => {
    setStep(1);
    setImageUrls([]);
    setImageFiles([]);
    setShowMessage(false);
  }, []);

  const onChange = useCallback((e: any) => {
    setImageFiles((prev) => [...prev, ...e.target.files]);
    for (let file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        setImageUrls((prev) => [...prev, { src: e.target.result }]);
        setStep(2);
      };
    }
  }, []);

  const onSubmitFinalImages = useCallback((e, imageFiles) => {
    e.preventDefault();

    const formData = new FormData();
    for (let file of imageFiles) {
      formData.append('img', file);
    }

    axios
      .post('/api/post/img', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log('이미지 먼저 submit 성공', res.data);
        setFinalImages(res.data);
        setStep(3);
      })
      .then((error) => {
        console.error(error);
      });
  }, []);

  const onSubmit = useCallback((e: any, data) => {
    e.preventDefault();
    console.log(data);
    axios
      .post('/api/post', data)
      .then((res) => {
        console.log(res.data);
        toast.success('post submit 성공');
        setStep(1);
        setImageUrls([]);
        setImageFiles([]);
        setFinalImages([]);
        setLocation(undefined);
        setContent('');
        setHideCounts(false);
        setTurnOffComments(false);
        onCloseModal();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  }, []);

  const postContextValue: IContext = {
    id: 'img',
    imageUrls,
    setImageUrls,
    imageFiles,
    setImageFiles,
    onChange,
    onSubmitFinalImages,
    step,
    setStep,
    location,
    onChangeLocation,
    setLocation,
    content,
    onChangeContent,
    setContent,
    hideCounts,
    setHideCounts,
    turnOffComments,
    setTurnOffComments,
  };

  return (
    <>
      <Modal
        show={show}
        onCloseModal={step !== 1 ? onShowMessage : onCloseModal}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <ModalContent bigger={step === 3 ? true : false}>
          <CreatePostContext.Provider value={postContextValue}>
            {[1, 2].includes(step) && (
              <form onSubmit={(e) => onSubmitFinalImages(e, imageFiles)} encType={'multipart/form-data'}>
                {step === 1 && <FirstStep />}
                {step === 2 && <SecondStep onClickPrev={onShowMessage} />}
              </form>
            )}

            {step === 3 && (
              <form
                onSubmit={(e) => onSubmit(e, { content, location, hideCounts, turnOffComments, images: finalImages })}
              >
                <ThirdStep />
              </form>
            )}
          </CreatePostContext.Provider>
        </ModalContent>
      </Modal>

      {/* Message Modal */}
      <MessageModal keyword="게시물" show={showMessage} setShow={setShowMessage} onCloseModal={onCloseMessage} />
    </>
  );
};

export default CreatePostModal;
