import React, { FC, useCallback, useState } from 'react';
import { useContext } from 'react';
import { PostContext } from '@components/CreatePostModal';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { TbBoxMultiple } from 'react-icons/tb';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import Modal from '@components/Modal';

interface IProps {
  [key: string]: any;
}

export const Base = styled.div`
  position: absolute;
  right: 26px;
  bottom: 26px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & .hide-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: ${({ theme }) => theme.colors.gray[700]};
    transition: 0.2s ease;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[500]};
    }
  }
`;
export const ToolBox = styled.div`
  position: absolute;
  right: 26px;
  bottom: 80px;
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;

  & ul {
    display: flex;
  }
`;
export const ImageItem = styled.li`
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 15px;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  & .delete-button {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    transition: 0.2s ease;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
`;

export const AddMoreImageButton = styled.label`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 22px;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
  }
`;

const PostImageEditTool: FC<IProps> = () => {
  const theme = useTheme();
  const [value, setValue] = useState(undefined);
  const [showAllImagesModal, setShowAllImagesModal] = useState(false);
  const { id, images, setImages, onChange } = useContext(PostContext);
  const onClickHideButton = useCallback(() => {
    setShowAllImagesModal((prev) => !prev);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowAllImagesModal(false);
  }, []);
  const onDeleteImageItem = useCallback((idx: number) => {
    const result = images.filter;
  }, []);

  return (
    <Base>
      <div className={'hide-button'} onClick={onClickHideButton}>
        <TbBoxMultiple />
      </div>
      <Modal show={showAllImagesModal} onCloseModal={onCloseModal}>
        <ToolBox className={'toolbox'} onClick={onClickHideButton}>
          <ul>
            {images.map((image, idx) => (
              <ImageItem key={`small-img-${idx}`}>
                <img src={`http://localhost:3095/${image.src}`} />
                <div className={'delete-button'} onClick={() => onDeleteImageItem(idx)}>
                  <IoCloseOutline />
                </div>
              </ImageItem>
            ))}
          </ul>
          <AddMoreImageButton className={'add-button'}>
            <div onClick={(e: any) => e.stopPropagation()}>
              <input id={id} type={'file'} multiple accept={'image/*'} value={value} onChange={onChange} hidden />
              <span>
                <AiOutlinePlus />
              </span>
            </div>
          </AddMoreImageButton>
        </ToolBox>
      </Modal>
    </Base>
  );
};

export default PostImageEditTool;
