import React, { FC, useCallback, useState } from 'react';
import Modal from '@components/Modal';

interface IProps {
  children: React.ReactNode;
  show: boolean;
  onCloseModal: () => void;
  title: string;
  subTitle?: string;
  accept?: string;
  cancel?: string;
}

import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { isModalShow } from '@recoil/atoms';
export const ModalContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  > .titles {
    padding: 30px 0;
  }

  > .buttons {
  }
`;
export const Title = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
  font-size: 17px;
  font-weight: 600;
`;
export const SubTitle = styled.p<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ color }) => color};
  font-size: 14px;
`;
export const Button = styled.div<{ color?: string }>`
  padding: 12px;
  border-top: 1px solid #dfdfdf;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: ${({ color }) => (Boolean(color) ? '700' : '400')};
  color: ${({ color }) => color};
  cursor: pointer;
`;

const MessageModal: FC<IProps> = ({ children, show, onCloseModal, title, subTitle, accept, cancel }) => {
  const theme = useTheme();
  const [showMessage, setShowMessage] = useState(false);
  const [showPostModal, setShowPostModal] = useRecoilState(isModalShow);
  const onCloseMessage = useCallback(() => {
    setShowMessage(false);
  }, []);

  const onShowMessage = useCallback(() => {
    setShowMessage((prev) => !prev);
  }, []);
  const onCloseBoth = useCallback(() => {
    onCloseModal();
    onCloseMessage();
  }, []);

  return (
    <>
      <Modal show={show} onCloseModal={onShowMessage}>
        {children}
      </Modal>
      {/* message 모달 */}
      <Modal show={showMessage} onCloseModal={onCloseMessage} style={'transparent'}>
        <ModalContentWrapper>
          <div className={'titles'}>
            <Title>{title}</Title>
            <SubTitle color={theme.colors.gray[400]}>{subTitle}</SubTitle>
          </div>
          <div className={'buttons'}>
            <Button
              color={theme.colors.red}
              onClick={() => {
                onCloseBoth();
                setShowPostModal(true);
              }}
            >
              {accept}
            </Button>
            <Button onClick={onCloseMessage}>{cancel}</Button>
          </div>
        </ModalContentWrapper>
      </Modal>
    </>
  );
};

export default MessageModal;
