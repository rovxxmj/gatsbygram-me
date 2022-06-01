import { ModalContentWrapper, ModalItem } from '@components/PostCard/styles';
import Modal from '@components/Modal';
import { useTheme } from '@emotion/react';
import { FC } from 'react';
import { IPost } from '@typings/db';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';

interface IProps {
  show: boolean;
  onCloseModal(): void;
  post: IPost;
}

const MoreSettingsMenu: FC<IProps> = ({ post, show, onCloseModal }) => {
  const theme = useTheme();
  const { me } = useSelector((state: IState) => state.user);
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <ModalContentWrapper red={theme.colors.red}>
        {me?.id === post.User.id ? (
          <>
            <ModalItem className={'red'}>수정</ModalItem>
            <ModalItem className={'red'}>삭제</ModalItem>
          </>
        ) : (
          <>
            <ModalItem className={'red'}>신고</ModalItem>
            <ModalItem className={'red'}>팔로우 취소</ModalItem>
          </>
        )}
        <ModalItem>게시물로 이동</ModalItem>
        <ModalItem>공유 대상...</ModalItem>
        <ModalItem>링크 복사</ModalItem>
        <ModalItem>퍼가기</ModalItem>
        <ModalItem onClick={onCloseModal}>취소</ModalItem>
      </ModalContentWrapper>
    </Modal>
  );
};

export default MoreSettingsMenu;
