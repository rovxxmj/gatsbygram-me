import React, { FC } from 'react';
import { IPost } from '@typings/db';
import styled from '@emotion/styled';
import PostHeader from '@components/Post/PostHeader';
import { useTheme } from '@emotion/react';
import PostImages from '@components/Post/PostImages';
import PostIcons from '@components/Post/PostIcons';

interface IProps {
  dataSource: IPost;
}

export const Card = styled.div<{ [key: string]: any }>`
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: #fff;
  width: 470px;
  border-radius: 4px;
  overflow: hidden;
`;
export const ImageWrapper = styled.div``;
const Post: FC<IProps> = ({ dataSource }) => {
  const theme = useTheme();
  return (
    <Card>
      <PostHeader user={dataSource.User} />
      <PostImages images={dataSource.Images} />
      <PostIcons />
      content: {dataSource.content}
      comment:
    </Card>
  );
};

export default Post;
