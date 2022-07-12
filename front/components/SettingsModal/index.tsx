import React, { FC } from 'react';
import Modal from '@components/Modal';
import styled from '@emotion/styled';
import { ModalContent } from '@components/MessageModal';
import { IUser } from '@typings/db';
import { useHistory } from 'react-router-dom';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  user?: IUser;
}

const SettingsMenuModal: FC<IProps> = ({ show, onCloseModal, user }) => {
  const history = useHistory();
  return (
    <Modal
      show={show}
      onCloseModal={onCloseModal}
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', position: 'absolute', top: 0 }}
    >
      <ModalContent>
        <div className={'buttons'}>
          <span className={'button red-button'} onClick={() => history.push(`/${user?.nickname}`)}>
            프로필 이동
          </span>
          <span className={'button'}>공유 대상..</span>
          <span className={'button'}>링크 복사</span>
          <span className={'button'}>퍼가기</span>
          <span className={'button'}>취소</span>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SettingsMenuModal;
