import React, { FC, useCallback, useState } from 'react';
import { useTheme } from '@emotion/react';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { Button, Container, LinkContainer } from '@components/Navigation/LoginModal/styles';
import { SignInContainer } from '@pages/SignIn/styles';
import Socials from '@components/Navigation/LoginModal/Socials';
import Header from '@pages/SignIn/Header';
import axios from 'axios';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import SelectAccountsModal from '@pages/SignIn/SelectAccountsModal';

export interface IForm {
  username: string;
  password: string;
}

export interface IRest {
  [key: string]: any;
}

const SignIn = () => {
  const theme = useTheme();
  const { data: userData, error, mutate } = useSWR<IUser>('/api/user/me', fetcher);
  console.log({ userData });
  const [accounts, setAccounts] = useState([]);
  const [showSelectAccountsModal, setShowSelectAccountsModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    reset,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: { username: '', password: '' },
    mode: 'onChange',
  });
  const { username, password } = watch();

  const onCloseModal = useCallback(() => {
    setShowSelectAccountsModal(false);
  }, []);

  const onSubmit = useCallback((data: IForm) => {
    const submitData = {
      username: data.username.replaceAll('-', ''),
      password: data.password,
    };

    console.log(submitData);

    axios
      .post('/api/user/login', submitData)
      .then((res) => {
        if (!res.data.single) {
          setAccounts(res.data.totalAccounts);
          setShowSelectAccountsModal(true);
        }
        console.log(res.data);
        // reset();
        mutate();
      })
      .catch((error) => {
        console.error(error);
        setError('password', { message: '잘못된 비밀번호 입니다.' });
      });

    console.log(accounts);
  }, []);

  // if (!userData) return <div>로딩중...</div>;

  if (userData) return <Redirect to={'/'} />;

  return (
    <div>
      <SignInContainer>
        <div className={'form-wrapper'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Header title={'로그인'} content={'친구들의 사진과 동영상을 보세요.'} />
            <Input
              type={'text'}
              label={'이메일, 사용자 이름 또는 전화번호'}
              isValue={Boolean(username)}
              isInValid={Boolean(errors.username) || Boolean(errors.username?.message)}
              register={register('username', {
                required: true,
                // validate: {
                //   checkForm: (value) => REG_EMAIL.test(value) || REG_PHONE.test(value),
                // },
              })}
            />
            <Input
              type={'password'}
              label={'비밀번호'}
              isValue={Boolean(password)}
              isInValid={Boolean(errors.password) || Boolean(errors.password?.message)}
              register={register('password', { required: true })}
            />
            <Button disabled={!username || !password || Boolean(errors.username) || Boolean(errors.username)}>
              로그인
            </Button>
          </form>
          <LinkContainer>
            <Link to={'/find_password'}>비밀번호 찾기</Link>
            <div className={'divider'}></div>
            <Link to={'/sign_up'}>회원가입</Link>
          </LinkContainer>
          <Socials title={'간편 로그인'} />
        </div>
      </SignInContainer>
      {accounts?.length > 1 && (
        <SelectAccountsModal
          accounts={accounts}
          setAccounts={setAccounts}
          show={showSelectAccountsModal}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
};

export default SignIn;
