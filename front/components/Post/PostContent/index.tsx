import React, { FC } from 'react';
import { IPost } from '@typings/db';

interface IProps {
  dataSource: IPost;
}

const PostContent: FC<IProps> = ({ dataSource }) => {
  return <div>{dataSource.content}</div>;
};

export default PostContent;
