import React, { FC } from 'react';
import { IPost } from '@typings/db';

interface IProps {
  post: IPost;
}

const PostContent: FC<IProps> = ({ post }) => {
  return (
    <div>
      <div>content: {post.content}</div>
      <div>
        comments:
        {post.Comments.map((v) => (
          <div key={v.id}>{v.content}</div>
        ))}
      </div>
    </div>
  );
};

export default PostContent;
