import Menu from '@components/Menu';
import React, { FC, useCallback } from 'react';
interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

import styled from '@emotion/styled';
import Link from 'next/link';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { IState, logoutAction } from '@reducers/index';
import Router from 'next/router';

export const MenuItemWrapper = styled.ul`
  position: absolute;
  top: 55px;
  right: 0;
  width: 200px;
  border-radius: 5px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
`;

export const MenuItem = styled.li<{ hoverColor: string }>`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  > a,
  span {
    padding: 10px 12px;
    cursor: pointer;
  }

  > #logout {
    border-top: 1px solid #dfdfdf;
  }

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;
const UserProfileMenu: FC<IProps> = ({ show, onCloseModal }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { me } = useSelector((state: IState) => state.user);
  const onLogout = useCallback(() => {
    dispatch(logoutAction());
    Router.push('/sign_in');
  }, []);

  return (
    <Menu show={show} onCloseModal={onCloseModal}>
      <MenuItemWrapper>
        <MenuItem hoverColor={theme.colors.gray[50]}>
          <Link href={`/${me?.email}`}>
            <a>프로필</a>
          </Link>
        </MenuItem>
        <MenuItem hoverColor={theme.colors.gray[50]}>
          <Link href="/[nickname]/saved">
            <a>저장됨</a>
          </Link>
        </MenuItem>
        <MenuItem hoverColor={theme.colors.gray[50]}>
          <Link href="/accounts/settings">
            <a>설정</a>
          </Link>
        </MenuItem>
        <MenuItem hoverColor={theme.colors.gray[50]}>
          <span>
            <a>계정 전환</a>
          </span>
        </MenuItem>
        <MenuItem hoverColor={theme.colors.gray[50]} onClick={onLogout}>
          <span id={'logout'}>로그아웃</span>
        </MenuItem>
      </MenuItemWrapper>
    </Menu>
  );
};

export default UserProfileMenu;
