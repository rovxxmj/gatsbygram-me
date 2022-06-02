import { FC, useCallback, useState } from 'react';
import { VscEllipsis } from 'react-icons/vsc';
import styled from '@emotion/styled';
import { IPost } from '@typings/db';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { BsHeartFill, BsHeart, BsChat, BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import {
  ActionItemWrapper,
  Base,
  Button,
  Content,
  ContentWrapper,
  ImageInfoWrapper,
  ImageWrapper,
  Likes,
  ModalContentWrapper,
  ModalItem,
  MoreMenu,
  PostActionItem,
  SeeMore,
  Time,
} from '@components/PostCard/styles';
import PostModal from '@components/PostModal';
import CommentForm from '@components/PostCard/CommentForm';
import MoreSettingsMenu from '@components/PostCard/MoreSettingsMenu';
import UserInfoHeader from '@components/PostCard/UserInfoHeader';
import PostImages from '@components/PostCard/PostImages';
import PostcardContent from '@components/PostCard/PostcardContent';
interface IProps {
  post: IPost;
}

const PostCard: FC<IProps> = ({ post }) => {
  const theme = useTheme();
  const { me } = useSelector((state: IState) => state.user);
  const [showMoreContent, setShowSeeMoreContent] = useState(false);
  const [showMoreSettingsMenu, setShowMoreSettingsMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const onClickLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onClickSeeMoreContent = useCallback(() => {
    setShowSeeMoreContent((prev) => !prev);
  }, []);
  const onClickMoreSettings = useCallback(() => {
    setShowMoreSettingsMenu((prev) => !prev);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowMoreSettingsMenu(false);
    setShowPostModal(false);
  }, []);
  const onClickShowPostModal = useCallback(() => {
    setShowPostModal(true);
  }, []);
  return (
    <>
      <Base bgColor={theme.colors.bgColor} borderColor={theme.colors.border}>
        <UserInfoHeader onClickMoreSettingsMenu={onClickMoreSettings} post={post} style={{ height: '60px' }} />
        <ImageWrapper>
          <PostImages images={post.Images} />
        </ImageWrapper>
        {/* 포스트 내용 */}
        <ImageInfoWrapper>
          <ActionItemWrapper>
            <div className={'left'}>
              <PostActionItem onClick={onClickLike} liked={liked} color={theme.colors.red}>
                <span>{liked ? <BsHeartFill /> : <BsHeart />}</span>
              </PostActionItem>
              <PostActionItem>
                <span>
                  <BsChat />
                </span>
              </PostActionItem>
              <PostActionItem>
                <span>
                  <IoPaperPlaneOutline />
                </span>
              </PostActionItem>
            </div>
            <div className={'mid'}></div>
            <div className={'right'}>
              <PostActionItem>
                <span>
                  <BsBookmark />
                </span>
              </PostActionItem>
            </div>
          </ActionItemWrapper>
          <ContentWrapper>
            <Likes>
              좋아요<span className={'counts'}>{0}</span>개
            </Likes>
            <Content>
              <span className={'nickname'}>{post.User.nickname}</span>
              {showMoreContent ? (
                <PostcardContent content={post.content} />
              ) : (
                <PostcardContent content={post.content.slice(0, 30)} />
              )}
              <span className={'see-more'} onClick={onClickSeeMoreContent}>
                {showMoreContent ? '접기' : '더보기'}
              </span>
            </Content>
            <SeeMore onClick={onClickShowPostModal}>
              {/* 라우터는 변해도 화면 변화 없이, 모달 창을 띠울 수 있는 방법이 없을까?? */}
              {/*<Link href={`/p/${post.id}`}>*/}
              {/*  <a>*/}
              댓글 <span className={'counts'}>{post.Comments.length}</span>개 모두 보기
              {/*</a>*/}
              {/*</Link>*/}
            </SeeMore>
            <Time>{post.createdAt}분 전</Time>
          </ContentWrapper>
        </ImageInfoWrapper>
        {/* 댓글 작성 폼 */}
        <CommentForm />
      </Base>
      <MoreSettingsMenu show={showMoreSettingsMenu} onCloseModal={onCloseModal} post={post} />
      <PostModal post={post} show={showPostModal} onCloseModal={onCloseModal} />
    </>
  );
};

export default PostCard;
