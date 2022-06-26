import React, { FC } from 'react';
import Input from '@components/Input';
import { REG_EMAIL, REG_PHONE } from '@components/Navigation/LoginModal';
import { Button, LinkContainer } from '@components/Navigation/LoginModal/styles';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Socials from '@components/Navigation/LoginModal/Socials';
import Header from '@pages/SignIn/Header';

interface IProps {
  onClickContinue: () => void;
}

const BasicInputs: FC<IProps> = ({ onClickContinue }) => {
  const {
    register,
    watch,
    resetField,
    reset,
    formState: { errors },
  } = useFormContext();

  const { auth, name, nickname, password } = watch();

  return (
    <>
      <Header title={'가입하기'} content={'친구들의 사진과 동영상을 보려면 가입하세요.'} />
      <Input
        type={'text'}
        label={'이메일 또는 전화번호'}
        isValue={Boolean(auth)}
        isInValid={Boolean(errors.auth) || Boolean(errors.auth?.message)}
        register={register('auth', {
          required: true,
          validate: {
            checkForm: (value) => REG_EMAIL.test(value) || REG_PHONE.test(value),
          },
        })}
      />
      <Input
        type={'text'}
        label={'이름'}
        isValue={Boolean(name)}
        isInValid={Boolean(errors.name) || Boolean(errors.name?.message)}
        register={register('name', { required: true })}
      />
      <Input
        type={'text'}
        label={'사용자 이름'}
        isValue={Boolean(nickname)}
        isInValid={Boolean(errors.nickname) || Boolean(errors.nickname?.message)}
        register={register('nickname', { required: true })}
      />
      <Input
        type={'password'}
        label={'비밀번호'}
        isValue={Boolean(password)}
        isInValid={Boolean(errors.password) || Boolean(errors.password?.message)}
        register={register('password', { required: true })}
      />
      <Button
        type={'submit'}
        disabled={
          !auth ||
          !name ||
          !nickname ||
          !password ||
          Boolean(errors.auth) ||
          Boolean(errors.name) ||
          Boolean(errors.nickname) ||
          Boolean(errors.password)
        }
      >
        가입
      </Button>
      <LinkContainer>
        <Link to={'/sign_in'}>로그인</Link>
      </LinkContainer>
      <Socials title={'간편 회원가입'} />
    </>
  );
};

export default BasicInputs;
