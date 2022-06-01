import { FC } from 'react';

interface IProps {
  comment: { User: { nickname: string }; content: string };
}

import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Avartar } from '@components/PostCard/UserInfoHeader';

export const Base = styled.div`
  padding: 20px 14px 10px;
  display: flex;
  align-items: flex-start;
`;

export const ContentWrapper = styled.p`
  font-size: 13px;
  margin-left: 10px;
  > .nickname {
    font-weight: 700;
    margin-right: 10px;
  }
`;

const Comment: FC<IProps> = ({ comment }) => {
  const theme = useTheme();
  return (
    <Base>
      <Avartar></Avartar>
      <ContentWrapper>
        <span className={'nickname'}>{comment.User.nickname}</span>
        {comment.content}
      </ContentWrapper>
    </Base>
  );
};

export default Comment;
