import React, { CSSProperties, FC, useCallback, useState } from 'react';
import Menu from '@components/Menu';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import useSWR from 'swr';
import CreatePostModal from '@components/CreatePostModal';
import { IMenu, MenuContent, MenuItem } from '@components/PostMenu';
import axios from 'axios';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import ProfileButton from '@components/Navigation/ProfileButton';
import { ProfileCard } from '@components/ProfileMenu/styles';
import { Link } from 'react-router-dom';

const ProfileMenu: FC<IMenu> = ({ show, onCloseModal, style, rest }) => {
  const theme = useTheme();
  const { data: userData, mutate, error } = useSWR<IUser>('/api/user/me', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('/api/user/logout')
      .then((res) => {
        console.log(res.data);
        mutate();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickProfile = useCallback(() => {}, []);

  return (
    <>
      <Menu show={show} onCloseModal={onCloseModal}>
        <MenuContent style={style} {...rest} theme={theme}>
          <ul>
            <ProfileCard>
              <ProfileButton onClick={onClickProfile} />
              <div>
                <span className={'nickname'}>{userData?.nickname}</span>
              </div>
            </ProfileCard>
            <MenuItem>
              <Link to={`/${userData?.nickname}`}>프로필</Link>
            </MenuItem>
            <MenuItem>
              <span>저장됨</span>
            </MenuItem>
            <MenuItem>
              <span>설정</span>
            </MenuItem>
            <MenuItem>
              <span>계정 전환</span>
            </MenuItem>
            <MenuItem onClick={onLogout}>
              <span>로그아웃</span>
            </MenuItem>
          </ul>
        </MenuContent>
      </Menu>
      {/*<CreatePostModal show={showCreatePostModal} onCloseModal={onClose} />*/}
    </>
  );
};

export default ProfileMenu;
