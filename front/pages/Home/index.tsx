import React from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IPost } from '@typings/db';

const Home = () => {
  const { data: postsData, mutate, error } = useSWR<IPost[]>('/api/posts', fetcher);
  console.log(postsData);
  return (
    <div>
      <h1>홈</h1>
      <ul></ul>
    </div>
  );
};

export default Home;
