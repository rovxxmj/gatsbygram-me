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

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 760px;
  height: 720px;
  border-radius: 6px;
  overflow: hidden;
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
  // hashtags: string[],
  // mentions: string[]
}

interface IImage {
  src: string;
}

interface IContext {
  images: IImage[];
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
  [key: string]: any;
}
export const PostContext = createContext<IContext>({ images: [], setImages: () => [] });

const CreatePostModal: FC<IProps> = ({ show, onCloseModal }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [imageFiles, setImageFiles] = useState<any[]>([]);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [percent, setPercent] = useState(0); // progressBar - width(%)
  const [showMessage, setShowMessage] = useState(false);

  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: { content: '', location: '', hideCounts: false, turnOffComments: false },
  });

  const onShowMessage = useCallback(() => {
    setShowMessage(true);
  }, []);

  const onCloseMessage = useCallback(() => {
    setStep(1);
    setImages([]);
    setImageFiles([]);
    setShowMessage(false);
  }, []);
  // 추가 + 취소할 때마나 POST

  const onChange = useCallback((e: any) => {
    // 1. POST 방식
    setImageFiles((prev) => [...prev, ...e.target.files]);

    // const formData = new FormData();
    // for (let image of imageFiles) {
    //   formData.append('img', image);
    // }
    // axios
    //   .post('/api/post/img', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //     onUploadProgress: (e) => setPercent(Math.round((e.loaded / e.total) * 100)),
    //   })
    //   .then((res) => {
    //     setImages(res.data);
    //     setStep(2);
    //   })
    //   .then((error) => {
    //     console.error(error);
    //   });
    // 2. Reader 방식
    // for (let file of e.target.files) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = (e: any) => {
    //     setSrcs((prev) => [...prev, e.target.result]);
    //     setStep(2);
    //   };
    // }
  }, []);

  useEffect(() => {
    console.log({ imageFiles });
    if (imageFiles != []) {
      const formData = new FormData();
      for (let image of imageFiles) {
        formData.append('img', image);
      }
      axios
        .post('/api/post/img', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (e) => setPercent(Math.round((e.loaded / e.total) * 100)),
        })
        .then((res) => {
          setImages(res.data);
          setStep(2);
        })
        .then((error) => {
          console.error(error);
        });
    }
  }, [imageFiles]);

  const onSubmitFinalImages = useCallback((e, image) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', image);
    axios
      .post('/api/post/img', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res.data);
        setImages(res.data.src);
        setStep(3);
      })
      .then((error) => {
        console.error(error);
      });
  }, []);

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
    images,
    setImages,
    onChange,
  };

  return (
    <>
      <Modal
        show={show}
        onCloseModal={step !== 1 ? onShowMessage : onCloseModal}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <ModalContent>
          <PostContext.Provider value={postContextValue}>
            <form onSubmit={(e) => onSubmitFinalImages(e, images)} encType={'multipart/form-data'}>
              {step === 1 && <FirstStep />}
              {/* step 1 => 사진(들)을 FileList 에 저장*/}
              {step === 2 && <SecondStep onClickPrev={onShowMessage} />}
              {/* step 2 => 사진(들)을 FileList 에 추가적으로 저장*/}
            </form>

            {step === 3 && (
              <form onSubmit={handleSubmit(onSubmit)} encType={'multipart/form-data'}>
                <Step title={'작성하기'}>
                  <input type={'text'} {...register('content')} placeholder={'글'} />
                  <input type={'text'} {...register('location')} placeholder={'장소'} />
                  <input type={'checkbox'} {...register('hideCounts')} placeholder={'숫자표시'} />
                  <input type={'checkbox'} {...register('turnOffComments')} placeholder={'댓글 기능 유무'} />
                </Step>
                <button type={'submit'}>공유하기</button>
              </form>
            )}
          </PostContext.Provider>
        </ModalContent>
      </Modal>

      {/* Message Modal */}
      <MessageModal keyword="게시물" show={showMessage} setShow={setShowMessage} onCloseModal={onCloseMessage} />
    </>
  );
};

export default CreatePostModal;
