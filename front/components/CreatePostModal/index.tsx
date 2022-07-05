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
  transition: 0.2s ease;
  & form {
    width: 100%;
    height: 100%;
  }
`;

interface IForm {
  content: string;
  location?: string;
  hideCounts: boolean;
  turnOffComments: boolean;
  images: { src: string }[];
  // hashtags: string[],
  // mentions: string[]
}

interface IImage {
  src: string;
}

interface IContext {
  imageUrls: IImage[];
  setImageUrls: React.Dispatch<React.SetStateAction<IImage[]>>;
  [key: string]: any;
}
export const PostContext = createContext<IContext>({ imageUrls: [], setImageUrls: () => [] });

const CreatePostModal: FC<IProps> = ({ show, onCloseModal }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [imageFiles, setImageFiles] = useState<any[]>([]);
  const [imageUrls, setImageUrls] = useState<{ src: string }[]>([]);
  const [imagesReturned, setImagesReturned] = useState<{ src: string }[]>();
  const [finalImages, setFinalImages] = useState<{ src: string }[]>([]);
  const [percent, setPercent] = useState(0); // progressBar - width(%)
  const [showMessage, setShowMessage] = useState(false);

  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: { content: '', location: '', hideCounts: false, turnOffComments: false, images: [] },
  });

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

  console.log(step);

  const onSubmit = useCallback((data: IForm) => {
    axios
      .post('/api/post', data)
      .then((res) => {
        console.log(res.data);
        toast.success('post submit 성공');
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
  };

  return (
    <>
      <Modal
        show={show}
        onCloseModal={step !== 1 ? onShowMessage : onCloseModal}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <ModalContent bigger={step === 3 ? true : false}>
          <PostContext.Provider value={postContextValue}>
            {[1, 2].includes(step) && (
              <form onSubmit={(e) => onSubmitFinalImages(e, imageFiles)} encType={'multipart/form-data'}>
                {step === 1 && <FirstStep />}
                {/* step 1 => 사진(들)을 FileList 에 저장*/}
                {step === 2 && <SecondStep onClickPrev={onShowMessage} />}
                {/* step 2 => 사진(들)을 FileList 에 추가적으로 저장*/}
              </form>
            )}

            {step === 3 && <ThirdStep />}
            <>
              // {/*<form onSubmit={handleSubmit(onSubmit)} encType={'multipart/form-data'}>*/}
              // {/*  <Step title={'작성하기'}>*/}
              // {/*    <input type={'text'} {...register('content')} placeholder={'글'} />*/}
              // {/*    <input type={'text'} {...register('location')} placeholder={'장소'} />*/}
              // {/*    <input type={'checkbox'} {...register('hideCounts')} placeholder={'숫자표시'} />*/}
              // {/*    <input type={'checkbox'} {...register('turnOffComments')} placeholder={'댓글 기능 유무'} />*/}
              // {/*  </Step>*/}
              // {/*  <button type={'submit'}>공유하기</button>*/}
              // {/*</form>*/}
              //{' '}
            </>
          </PostContext.Provider>
        </ModalContent>
      </Modal>

      {/* Message Modal */}
      <MessageModal keyword="게시물" show={showMessage} setShow={setShowMessage} onCloseModal={onCloseMessage} />
    </>
  );
};

export default CreatePostModal;
