import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IPost, IUser } from '@typings/db';
import { useTheme } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import SettingsMenuModal from '@components/SettingsModal';
import { IoEllipsisVerticalOutline } from 'react-icons/io5';
import axios from 'axios';

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
    display: flex;
    align-items: center;
  }

  & .user-info {
    display: flex;
    align-items: center;
    & .avartar {
      border: 1px solid gray;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      > img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }

    & .nickname {
      margin-left: 8px;
      font-size: 14px;
      font-weight: 600;
    }
  }

  & .follow-button {
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.blue[500]};
  }

  & .settings-button {
    //width: 36px;
    height: 36px;
    margin-left: 20px;
    border: 0;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const PostHeader: FC<IProps> = ({ user }) => {
  const theme = useTheme();
  const history = useHistory();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const onClickSettings = useCallback(() => {
    setShowSettingsModal((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowSettingsModal(false);
  }, []);

  const onClickFollowing = useCallback(() => {
    console.log(user.nickname);
    axios
      .post(`/api/user/${user.nickname}/follow`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Header theme={theme}>
        <div className={'left user-info'}>
          <div className={'avartar'} onClick={() => history.push(`/${user.nickname}`)}>
            <img src={user.avartar} />
          </div>
          <span className={'nickname'}>{user.nickname}</span>
        </div>
        <div className={'right'}>
          <span className={'follow-button'} onClick={onClickFollowing}>
            팔로우
          </span>
          <span className={'settings-button'} onClick={onClickSettings}>
            <IoEllipsisVerticalOutline />
          </span>
        </div>
      </Header>
      <SettingsMenuModal user={user} show={showSettingsModal} onCloseModal={onCloseModal} />
    </>
  );
};

export default PostHeader;
