import React, { FC } from 'react';
import Input from '@components/Input';
import { REG_EMAIL, REG_PHONE } from '@components/Navigation/LoginModal';
import { Button } from '@components/Navigation/LoginModal/styles';
import { useFormContext } from 'react-hook-form';
import Header from '@pages/SignIn/Header';
import UndoButton from '@pages/SignUp/UndoButton';
import useMutation from '@hooks/useMutation';
import { Link } from 'react-router-dom';

interface IProps {
  prepUser: {
    email: string | null;
    phone: string | null;
    nickname: string;
  };
}

const Welcome: FC<IProps> = ({ prepUser }) => {
  return (
    <>
      <Header title={`${prepUser?.nickname}님:) 가입을 축하합니다`} />
      <span>
        <Link to={'/sign_in'}>로그인 바로가기</Link>
      </span>
    </>
  );
};

export default Welcome;
