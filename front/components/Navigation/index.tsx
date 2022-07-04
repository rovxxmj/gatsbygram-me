import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import ActionItem from './ActionItem';
import { AiOutlineUser, AiOutlineBell, AiFillBell } from 'react-icons/ai';
import {
  IoHeartOutline,
  IoHeart,
  IoPaperPlaneOutline,
  IoPaperPlane,
  IoPerson,
  IoPersonOutline,
  IoAddCircleOutline,
} from 'react-icons/io5';
import {
  BsGear,
  BsGearFill,
  BsHouseDoorFill,
  BsHouseDoor,
  BsInstagram,
  BsPerson,
  BsPersonFill,
  BsHeart,
  BsHeartFill,
  BsPlusSquare,
  BsPlusSquareFill,
} from 'react-icons/bs';
import { MdOutlineExplore, MdExplore } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Modal from '@components/Modal';
import LoginModal from '@components/Navigation/LoginModal';
import Logo from '@components/Logo';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import PostMenu from '@components/PostMenu';
import ProfileButton from '@components/Navigation/ProfileButton';
import ProfileMenu from '@components/ProfileMenu';
import ToggleItem from '@components/Navigation/ToggleItem';

export const Base = styled.nav<{ [key: string]: any }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: #fff;
  & .container {
    max-width: 975px;
    height: 60px;
    padding: 0 20px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const ActionItems = styled.div`
  display: flex;
  position: relative;

  & button {
    //margin-left: 20px;
  }
`;
export const Button = styled.div`
  cursor: pointer;
  border: 1px solid gray;
  height: 32px;
  margin-left: 10px;
  border-radius: 4px;
  font-size: 14px;

  & a,
  span {
    padding: 8px 10px 6px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Navigation = () => {
  const { data: userData, error, mutate } = useSWR<IUser | false>('/api/user/me', fetcher);
  const theme = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const onClickLogin = useCallback(() => {
    setShowLogin(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowLogin(false);
    setShowPostMenu(false);
    setShowProfileMenu(false);
  }, []);

  const onClickPostMenu = useCallback(() => {
    setShowPostMenu((prev) => !prev);
  }, []);

  const onClickProfileButton = useCallback(() => {
    setShowProfileMenu((prev) => !prev);
  }, []);

  return (
    <>
      <Base theme={theme}>
        <div className={'container'}>
          <Link to={'/'}>
            <Logo />
          </Link>
          <ActionItems>
            {/*<SearchBox />*/}
            {!userData && (
              <>
                <Button onClick={onClickLogin}>
                  <span>로그인</span>
                </Button>
                <Button>
                  <Link to={'/sign_up'}>회원가입</Link>
                </Button>
              </>
            )}
            {userData && (
              <>
                <ActionItem route={'/'} icons={{ empty: <BsHouseDoor />, fill: <BsHouseDoorFill /> }} />
                <ActionItem
                  route={'/direct/inbox'}
                  icons={{ empty: <IoPaperPlaneOutline />, fill: <IoPaperPlane /> }}
                />
                <ToggleItem special icon={<BsInstagram />} onClick={onClickPostMenu} />
                <ActionItem route={'/explore'} icons={{ empty: <MdOutlineExplore />, fill: <MdExplore /> }} />

                <ToggleItem icons={{ empty: <IoHeartOutline />, fill: <IoHeart /> }} />
                <ProfileButton onClick={onClickProfileButton} />
              </>
            )}
          </ActionItems>
          <LoginModal show={showLogin} onCloseModal={onCloseModal} />
          <PostMenu
            show={showPostMenu}
            setShow={setShowPostMenu}
            onCloseModal={onCloseModal}
            style={{ top: '50px', right: '-12px' }}
          />
          <ProfileMenu show={showProfileMenu} onCloseModal={onCloseModal} style={{ top: '50px', right: '-60px' }} />
        </div>
      </Base>
    </>
  );
};

export default Navigation;
