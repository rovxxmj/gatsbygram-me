import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import ActionItem from './ActionItem';
import { AiOutlineUser } from 'react-icons/ai';
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
import { Link } from 'react-router-dom';
import Modal from '@components/Modal';
import LoginModal from '@components/Navigation/LoginModal';
import Logo from '@components/Logo';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';

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
`;
export const SearchBox = styled.div``;
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
  const { data: userData, error, mutate } = useSWR<IUser | false>('/api/users/me', fetcher);
  const theme = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const onClickLogin = useCallback(() => {
    setShowLogin(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowLogin(false);
  }, []);

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <Base theme={theme}>
      <div className={'container'}>
        <Link to={'/'}>
          <Logo />
        </Link>
        <ActionItems>
          <SearchBox />
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
              <button onClick={onLogout}>로그아웃</button>
              <ActionItem icon={<BsHouseDoor />} />
              <ActionItem icon={<IoPaperPlaneOutline />} />
              <ActionItem special icon={<BsInstagram />} />
              <ActionItem icon={<IoHeartOutline />} />
              <ActionItem icon={<IoPersonOutline />} />
            </>
          )}
        </ActionItems>
      </div>
      <LoginModal show={showLogin} onCloseModal={onCloseModal} />
    </Base>
  );
};

export default Navigation;
