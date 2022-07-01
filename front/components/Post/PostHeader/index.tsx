import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IPost, IUser } from '@typings/db';
import { useTheme } from '@emotion/react';

interface IProps {
  user: IUser;
  [key: string]: any;
}

export const Header = styled.header<{ [key: string]: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  & .left {
  }

  & .right {
  }

  & .user-info {
    display: flex;
    align-items: center;
    & .avartar {
      > img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }

    & .nickname {
      margin-left: 8px;
      font-size: 14px;
      font-weight: 600;
    }
  }

  & .settings-button {
    width: 36px;
    height: 36px;
    border: 0;
  }
`;

const PostHeader: FC<IProps> = ({ user }) => {
  const theme = useTheme();
  return (
    <Header theme={theme}>
      <div className={'left user-info'}>
        <div className={'avartar'}>
          <img src={'/'} />
        </div>
        <span className={'nickname'}>{user.nickname}</span>
      </div>
      <div className={'right'}>
        <button className={'settings-button'}>설정</button>
      </div>
    </Header>
  );
};

export default PostHeader;
