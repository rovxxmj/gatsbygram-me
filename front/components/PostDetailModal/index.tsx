import React, { FC } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import { IPost } from '@typings/db';
import Modal from '@components/Modal';
import { ImagePreview } from '@components/CreatePostModal/SecondStep';
import UserInfoBar from '@components/UserInfoBar';
import { IoLocationOutline } from 'react-icons/io5';
import SelectItem from '@components/CreatePostModal/SelectItem';
import SwitchButton from '@components/SwitchButton';
import { Content } from '@components/CreatePostModal/ThirdStep';

const Base = styled.div``;

interface IProps {
  post: IPost;
  show: boolean;
  onCloseModal: () => void;
}

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 1100px;
  height: 700px;
  border-radius: 6px;
  overflow: hidden;
  transition: 0.4s ease;

  & .post-container {
    display: flex;
  }
`;

const PostDetailModal: FC<IProps> = ({ post, show, onCloseModal }) => {
  return (
    <Modal show={show} onCloseModal={onCloseModal} style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <ModalContent>
        <div className={'post-container'}>
          <ImagePreview className={'img-preview'}>
            {post.Images?.map((image, idx) => (
              <img key={`big-img-${idx}`} src={`http://localhost:3095/${image.src}`} />
            ))}
          </ImagePreview>
          <Content>
            <UserInfoBar />
          </Content>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default PostDetailModal;
