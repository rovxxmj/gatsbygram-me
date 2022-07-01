import React, { FC } from 'react';
import { IPost } from '@typings/db';

interface IProps {
  dataSource: IPost;
}

const PostContent: FC<IProps> = ({ dataSource }) => {
  return (
    <div>
      {dataSource.Comments.map((v) => (
        <li>{v.content}</li>
      ))}
    </div>
  );
};

export default PostContent;
