import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { Base, Button, Container, Form, Input, Label, Title } from '@pages/sign_in/styles';
import axios from '@utils/axios';
import useSWR from 'swr';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { loginAction, logoutAction } from '@reducers/index';
import AniLabel from '@pages/sign_in/AniLabel';
import Link from 'next/link';
import { useTheme } from '@emotion/react';

interface IForm {
  email: string;
  password: string;
}
const SignIn: NextPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { email, password } = watch();

  axios.defaults.baseURL = 'http://localhost:3065';
  const onSubmit = useCallback((data: IForm) => {
    dispatch(loginAction({ id: 1, email: data.email, password: data.password }));

    axios
      .post('/api/users/login', data, { withCredentials: true })
      .then((res) => {
        console.log('what the fuck', res.data);
        // Router.push('/');
      })
      .catch((error) => console.error('what the fff', error));
  }, []);

  const onClickSocialLogin = useCallback(() => {
    axios
      .get('/auth/kakao', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // axios.get('http://localhost:3065/auth').then((res) => console.log(res.data));
  }, []);
  return (
    <Base>
      <Container>
        <Title>
          <h1>로그인</h1>
          <span>
            <Link href={'/sign_up'}>
              <a style={{ color: theme.colors.blue }}>회원가입</a>
            </Link>
            으로 이동하기
          </span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AniLabel title={'이메일'} isValue={Boolean(email)}>
            <Input type={'text'} {...register('email')} autoComplete={'off'} />
          </AniLabel>
          <AniLabel title={'비밀번호'} isValue={Boolean(password)}>
            <Input type={'password'} {...register('password')} autoComplete={'off'} />
          </AniLabel>
          <Button type={'submit'}>로그인</Button>
          <Button onClick={onClickSocialLogin}>카카오로 로그인</Button>
        </Form>
      </Container>
    </Base>
  );
};

export default SignIn;
