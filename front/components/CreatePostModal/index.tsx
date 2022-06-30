import React, { FC, useCallback, useState } from 'react';
import Modal from '@components/Modal';
import styled from '@emotion/styled';
import Step from '@components/CreatePostModal/Step';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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
  min-height: 720px;
  border-radius: 6px;
`;

interface IForm {
  content: string;
  location?: string;
  hideCounts: boolean;
  turnOffComments: boolean;
  // hashtags: string[],
  // mentions: string[]
}

const CreatePostModal: FC<IProps> = ({ show, onCloseModal }) => {
  const [step, setStep] = useState<1 | 2 | 3>(3);
  const [showMessage, setShowMessage] = useState(false);
  const { register, handleSubmit } = useForm<IForm>({ defaultValues: { content: '' } });
  const onShowMessage = useCallback(() => {
    setShowMessage(true);
  }, []);

  const onCloseMessage = useCallback(() => {
    setShowMessage(false);
  }, []);

  const onSubmit = useCallback((data: IForm) => {
    axios
      .post('/api/post', data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Modal
        show={show}
        onCloseModal={step !== 1 ? onShowMessage : onCloseModal}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <Step title={'새 게시물 만들기'}>
                <div></div>
              </Step>
            )}
            {step === 2 && (
              <Step title={'편집하기'}>
                <div></div>
              </Step>
            )}
            {step === 3 && (
              <Step title={'작성하기'}>
                <input type={'text'} {...register('content')} placeholder={'글'} />
                <input type={'text'} {...register('location')} placeholder={'장소'} />
                <input type={'checkbox'} {...register('hideCounts')} placeholder={'숫자표시'} />
                <input type={'checkbox'} {...register('turnOffComments')} placeholder={'댓글 기능 유무'} />
              </Step>
            )}
            <button type={'submit'}>공유하기</button>
          </form>
        </ModalContent>
      </Modal>
      <Modal show={showMessage} onCloseModal={onCloseMessage}>
        <div>Message</div>
      </Modal>
    </>
  );
};

export default CreatePostModal;
