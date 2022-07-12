import React, { FC } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import { IPost } from '@typings/db';

const Base = styled.div``;

interface IProps {
  post: IPost;
}

const Post: FC<IProps> = ({ post }) => {
  return <Base>ㅋㅋㅋㅋ</Base>;
};

export default Post;
