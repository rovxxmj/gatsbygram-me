import React, { createContext, FC, useCallback, useState } from 'react';
import { IPost } from '@typings/db';
import styled from '@emotion/styled';
import PostHeader from '@components/Post/PostHeader';
import { useTheme } from '@emotion/react';
import PostImages from '@components/Post/PostImages';
import PostIcons from '@components/Post/PostIcons';
import PostContent from '@components/Post/PostContent';
import PostCommentForm from '@components/Post/PostCommentForm';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Link, useHistory } from 'react-router-dom';
import PostDetailModal from '@components/PostDetailModal';

interface IProps {
  post: IPost;
}
interface IContext {
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  [key: string]: any;
}

export const Card = styled.div<{ [key: string]: any }>`
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: #fff;
  width: 470px;
  border-radius: 4px;
  //overflow: unset;
  margin-bottom: 20px;
`;
export const ImageWrapper = styled.div``;
export const PostContext = createContext<IContext>({ like: false, setLike: () => false });
const Post: FC<IProps> = ({ post }) => {
  const theme = useTheme();
  const history = useHistory();
  // const [showPostDetail, setShowPostDetail] = useState(false);
  const [like, setLike] = useState(false);

  const onDoubleClick = useCallback(() => {
    console.log('double click');
  }, []);

  const value = {
    like,
    setLike,
  };

  return (
    <>
      <PostContext.Provider value={value}>
        <Card onDoubleClick={onDoubleClick}>
          <PostHeader user={post.User} />
          <PostImages images={post.Images} />
          <PostIcons post={post} />
          <PostContent post={post} />
          <PostCommentForm post={post} />
          {/*</Link>*/}
        </Card>
      </PostContext.Provider>
    </>
  );
};

export default Post;
