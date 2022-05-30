import { FC } from 'react';

import styled from '@emotion/styled';
import { IPost } from '@typings/db';

interface IProps {
  post: IPost;
}
export const Base = styled.div``;

const PostCard: FC<IProps> = ({ post }) => {
  return <Base>{post?.content}</Base>;
};

export default PostCard;
