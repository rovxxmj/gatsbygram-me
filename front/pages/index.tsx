import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { useCallback } from 'react';
import { addPostAction, dummyPost } from '@reducers/post';
import PostCard from '@components/PostCard';
import { IPost } from '@typings/db';

export const Base = styled.div`
  margin-top: 30px;
`;

const Home: NextPage = () => {
  const { isLoggedIn, me } = useSelector((state: IState) => state.user);
  const { mainPosts } = useSelector((state: IState) => state.post);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(addPostAction(dummyPost));
  }, []);
  return (
    <Base>
      {mainPosts?.map((post: IPost, idx) => (
        <PostCard post={post} key={post.id} />
      ))}
      <button onClick={onClick}>업로드</button>
    </Base>
  );
};

export default Home;
