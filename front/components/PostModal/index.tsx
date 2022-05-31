import { IPost } from '@typings/db';
import { FC, useCallback, useState } from 'react';
import Modal from '@components/Modal';

interface IProps {
  post: IPost;
  show: boolean;
  onCloseModal(): void;
}

import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Button, ModalItem, MoreMenu } from '@components/PostCard/styles';
import { VscEllipsis } from 'react-icons/vsc';
import { ModalContentWrapper } from '@components/PostCard/styles';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import Comment from '@components/PostModal/Comment';
import CommentForm from '@components/PostCard/CommentForm';
import MoreSettingsMenu from '@components/PostCard/MoreSettingsMenu';
import UserInfoHeader from '@components/PostCard/UserInfoHeader';

export const ModifiedModalContentWrapper = styled.div`
  border-radius: 4px;
  overflow: hidden;
  height: 730px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;

export const ImageWrapper = styled.div`
  width: 730px;
  height: 730px;
  background-color: gray;
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  position: relative;
`;

export const Comments = styled.div``;

const PostModal: FC<IProps> = ({ post, show, onCloseModal }) => {
  const theme = useTheme();
  const { me } = useSelector((state: IState) => state.user);
  const [showMoreSettingsMenu, setShowMoreSettingsMenu] = useState(false);
  const onClickMoreMenu = useCallback(() => {
    setShowMoreSettingsMenu((prev) => !prev);
  }, []);
  const onCloseMoreMenu = useCallback(() => {
    setShowMoreSettingsMenu(false);
  }, []);
  return (
    <>
      <Modal show={show} onCloseModal={onCloseModal}>
        <ModifiedModalContentWrapper>
          <ImageWrapper></ImageWrapper>
          <ContentWrapper>
            {/* 작성자 정보 */}
            <UserInfoHeader post={post} style={{ height: '70px' }} onClickMoreSettingsMenu={onClickMoreMenu} />
            {/* post - content & comments */}
            <Comments>
              <Comment comment={post} />
              {post.Comments.map((c) => (
                <Comment comment={c} key={c.User.nickname} />
              ))}
            </Comments>
            {/* 댓글 작성 폼 */}
            <CommentForm />
          </ContentWrapper>
        </ModifiedModalContentWrapper>
      </Modal>

      {/* 게시물 설정 메뉴 모달 */}
      <MoreSettingsMenu show={showMoreSettingsMenu} onCloseModal={onCloseMoreMenu} post={post} />
    </>
  );
};

export default PostModal;
