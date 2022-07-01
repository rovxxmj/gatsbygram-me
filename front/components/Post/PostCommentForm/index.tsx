import React, { FC, useCallback } from 'react';
import { IPost, IUser } from '@typings/db';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

interface IProps {
  post: IPost;
}

interface IForm {
  content: string;
}
export const Base = styled.div``;
export const Form = styled.form``;

const PostCommentForm: FC<IProps> = ({ post }) => {
  const { data: userData, mutate: userDataMutate } = useSWR<IUser>('/api/user/me', fetcher);
  const { data: postsData, mutate: postsDataMutate } = useSWR<IPost>('/api/posts', fetcher);
  const { handleSubmit, register, reset } = useForm<IForm>();
  const onSubmit = useCallback((data: IForm) => {
    axios
      .post(`/api/post/${post.id}/comment`, data)
      .then((res) => {
        console.log(res.data);
        postsDataMutate();
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Base>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input type={'text'} {...register('content')} placeholder={'댓글 달기...'} />
          <button>제출</button>
        </label>
      </Form>
    </Base>
  );
};

export default PostCommentForm;
