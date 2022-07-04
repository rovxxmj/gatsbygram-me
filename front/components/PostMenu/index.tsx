import React, { CSSProperties, FC, useCallback, useState } from 'react';
import Menu from '@components/Menu';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import useSWR from 'swr';
import CreatePostModal from '@components/CreatePostModal';

export interface IMenu {
  show: boolean;
  onCloseModal: () => void;
  style: CSSProperties;
  [key: string]: any;
}

interface IRest {
  [key: string]: any;
}

export const MenuContent = styled.div<IRest>`
  position: absolute;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: #fff;
  width: 210px;
  border-radius: 4px;
`;

export const MenuItem = styled.li<IRest>`
  width: 100%;

  & span,
  a {
    display: flex;
    padding: 10px 12px 8px;
    background-color: #fff;
    color: #000;
    font-size: 14px;
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
    transition: 0.2s ease;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }
`;

const PostMenu: FC<IMenu> = ({ show, setShow, onCloseModal, style, rest }) => {
  const theme = useTheme();
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const onClickCreatePost = useCallback(() => {
    setShowCreatePostModal(true);
  }, []);

  const onClose = useCallback(() => {
    setShowCreatePostModal(false);
    setShow(true);
  }, []);

  return (
    <>
      <Menu show={show} setShow={setShow} onCloseModal={onCloseModal}>
        <MenuContent style={style} {...rest} theme={theme}>
          <ul>
            <MenuItem onClick={onClickCreatePost}>
              <span>새 게시물 만들기</span>
            </MenuItem>
            <MenuItem>
              <span>릴스</span>
            </MenuItem>
            <MenuItem>
              <span>라이브</span>
            </MenuItem>
          </ul>
        </MenuContent>
      </Menu>
      <CreatePostModal show={showCreatePostModal} onCloseModal={onClose} />
    </>
  );
};

export default PostMenu;
