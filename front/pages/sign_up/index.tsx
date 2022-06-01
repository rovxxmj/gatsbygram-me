import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { Base, Button, Container, Form, Input, Label, Title } from '@pages/sign_in/styles';
import axios from '@utils/axios';
import Router from 'next/router';
import AniLabel from '@pages/sign_in/AniLabel';
import Link from 'next/link';
import { useTheme } from '@emotion/react';

interface IForm {
  email: string;
  password: string;
  phone?: string;
  name: string;
  nickname: string;
  gender?: string;
  bio?: string;
  birth?: string;
}
const SignUp: NextPage = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: '',
      name: '',
      nickname: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { email, name, nickname, password } = watch();
  const onSubmit = useCallback((data: IForm) => {
    axios
      .post('/api/users', data)
      .then((res) => {
        reset();
        Router.push('/sign_in');
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Base>
      <Container>
        <Title>
          <h1>가입하기</h1>
          <span>
            <Link href={'/sign_in'}>
              <a style={{ color: theme.colors.blue }}>로그인</a>
            </Link>
            으로 이동하기
          </span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AniLabel title={'이메일'} isValue={Boolean(email)}>
            <Input type={'text'} {...register('email')} autoComplete={'off'} />
          </AniLabel>
          <AniLabel title={'성명'} isValue={Boolean(name)}>
            <Input type={'text'} {...register('name')} autoComplete={'off'} />
          </AniLabel>
          <AniLabel title={'사용자이름'} isValue={Boolean(nickname)}>
            <Input type={'text'} {...register('nickname')} autoComplete={'off'} />
          </AniLabel>
          <AniLabel title={'비밀번호'} isValue={Boolean(password)}>
            <Input type={'password'} {...register('password')} autoComplete={'off'} />
          </AniLabel>
          <Button type={'submit'}>가입하기</Button>
        </Form>
      </Container>
    </Base>
  );
};

export default SignUp;
