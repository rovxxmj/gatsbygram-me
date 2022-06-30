import React, { FC, useCallback, useState } from 'react';
import Modal from '@components/Modal';
import CloseButton from '@components/CloseButton';
import { useTheme } from '@emotion/react';
import Logo from '@components/Logo';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { Button, Container, LinkContainer } from '@components/Navigation/LoginModal/styles';
import Socials from '@components/Navigation/LoginModal/Socials';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
import SelectAccountsModal from '@pages/SignIn/SelectAccountsModal';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}
interface IForm {
  username: string;
  password: string;
}

export const REG_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const REG_PHONE = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/i;

const LoginModal: FC<IProps> = ({ show, onCloseModal }) => {
  const theme = useTheme();
  const { data: userData, error, mutate } = useSWR<IUser>('/api/user/me', fetcher);
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

  const onSubmit = useCallback((data: IForm) => {
    const submitData = {
      username: data.username.replaceAll('-', ''),
      password: data.password,
    };

    axios
      .post('/api/user/login', submitData)
      .then((res) => {
        if (!res.data.currentAccount) {
          setAccounts(res.data.totalAccounts);
          setShowSelectAccountsModal(true);
        }
        console.log(res.data);
        mutate();
        reset();
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
    <Modal show={show} onCloseModal={onCloseModal} style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <Container>
        <CloseButton
          onClick={onCloseModal}
          style={{ fontSize: '26px', right: '20px', top: '20px', color: theme.colors.gray[700] }}
        />
        <div className={'form-wrapper'}>
          <div className={'logo-wrapper'}>
            <Logo />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Link to={'/find_password'} onClick={onCloseModal}>
              비밀번호 찾기
            </Link>
            <div className={'divider'}></div>
            <Link to={'/sign_up'} onClick={onCloseModal}>
              회원가입
            </Link>
          </LinkContainer>
          <Socials title={'간편 로그인'} />
        </div>
      </Container>
      <SelectAccountsModal
        accounts={accounts}
        setAccounts={setAccounts}
        show={showSelectAccountsModal}
        onCloseModal={onCloseModal}
      />
    </Modal>
  );
};

export default LoginModal;
