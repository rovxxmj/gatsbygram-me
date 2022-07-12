import React, { FC } from 'react';
import { IPost } from '@typings/db';

interface IProps {
  post: IPost;
}

const PostContent: FC<IProps> = ({ post }) => {
  return (
    <div>
      <div>{post.content}</div>
      <div>
        {post.Comments.map((v) => (
          <div key={v.id}>{v.content}</div>
        ))}
      </div>
    </div>
  );
};

export default PostContent;
