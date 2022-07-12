import React, { FC, useCallback, useContext, useState } from 'react';
import styled from '@emotion/styled';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {
  IoHeartOutline,
  IoHeart,
  IoPaperPlaneOutline,
  IoPaperPlane,
  IoPerson,
  IoPersonOutline,
  IoAddCircleOutline,
} from 'react-icons/io5';
import { BsChat, BsChatFill, BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IPost, IUser } from '@typings/db';
import { PostContext } from '@components/Post';
import PostDetailModal from '@components/PostDetailModal';
import { useHistory } from 'react-router-dom';

interface IProps {
  post: IPost;
}

export const Base = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
  & div {
    display: flex;
  }
  & .icon-button {
    font-size: 22px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  & .bigger {
    font-size: 24px;
  }
`;

const PostIcons: FC<IProps> = ({ post }) => {
  const [save, setSave] = useState(false);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const { like, setLike } = useContext(PostContext);
  const history = useHistory();

  const onCloseModal = useCallback(() => {
    setShowPostDetail(false);
    history.push('/');
  }, []);
  const onClickPost = useCallback(() => {
    history.push(`/p/${post.id}`);
    setShowPostDetail(true);
  }, []);
  return (
    <>
      <Base onClick={(e: any) => e.stopPropagation()}>
        <div>
          <span className={'icon-button'} onClick={() => setLike((prev) => !prev)}>
            {like ? <BsHeartFill /> : <BsHeart />}
          </span>
          <span className={'icon-button'} onClick={onClickPost}>
            <BsChat />
          </span>
          <span className={'icon-button bigger'}>
            <IoPaperPlaneOutline />
          </span>
        </div>
        <span className={'icon-button'} onClick={() => setSave((prev) => !prev)}>
          {save ? <BsBookmarkFill /> : <BsBookmark />}
        </span>
      </Base>
      <PostDetailModal post={post} show={showPostDetail} onCloseModal={onCloseModal} />
    </>
  );
};

export default PostIcons;
