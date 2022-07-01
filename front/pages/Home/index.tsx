import React from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IPost, IUser } from '@typings/db';
import Post from '@components/Post';

const Home = () => {
  const { data: userData, mutate: userDataMutate } = useSWR<IUser>('/api/user/me', fetcher);
  const { data: postsData, mutate: postsDataMutate, error } = useSWR<IPost[]>(userData ? '/api/posts' : null, fetcher);
  const { data: followersPostsData } = useSWR<IPost[]>(userData ? '/api/posts/followings' : null, fetcher);

  console.log(postsData);
  console.log(followersPostsData);
  return (
    <div>
      <ul>
        {postsData?.map((v) => (
          <Post key={v.id} dataSource={v} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
