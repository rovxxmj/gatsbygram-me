import PostImages from '@components/PostFormModal/PostImages';

import styled from '@emotion/styled';
import Modal from '@components/Modal';
import { FC } from 'react';
import PostContents from '@components/PostFormModal/PostContents';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: 48px;
  width: 100%;
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  > .title {
  }

  > .dir-button {
    position: absolute;
    font-size: 14px;
    font-weight: 500;
    border: none;
    background-color: transparent;
  }

  > .prev {
    left: 20px;
    bottom: 13px;
  }

  > .next {
    right: 20px;
    bottom: 13px;
  }
`;

export const FormData = styled.div`
  display: flex;
`;

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

const PostFormModal: FC<IProps> = ({ show, onCloseModal }) => {
  const {} = useSelector((state: IState) => state.post.mainPosts);
  const images = [{ src: '' }];
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <ModalContent>
        <Header>
          <span className={'dir-button prev'}>이전</span>
          <span className={'title'}>새 게시글 만들기(final)</span>
          <button className={'dir-button next'}>공유하기</button>
        </Header>
        <FormData>
          <PostImages images={images} />
          <PostContents />
        </FormData>
      </ModalContent>
    </Modal>
  );
};

export default PostFormModal;
