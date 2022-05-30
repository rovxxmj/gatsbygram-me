import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { Base, Button, Container, Form, Input, Label, Title } from '@pages/sign_in/styles';
import axios from '@utils/axios';
import useSWR from 'swr';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { loginAction, logoutAction } from '@reducers/index';

interface IForm {
  email: string;
  password: string;
}
const SignIn: NextPage = () => {
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
  const onSubmit = useCallback((data: IForm) => {
    dispatch(loginAction({ email: data.email, password: data.password }));
    Router.push('/');
  }, []);
  return (
    <Base>
      <Container>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>이메일</span>
            <Input type={'text'} placeholder={'이메일'} {...register('email')} autoComplete={'off'} />
          </Label>
          <Label>
            <span>비밀번호</span>
            <Input type={'password'} placeholder={'password'} {...register('password')} autoComplete={'off'} />
          </Label>
          <Button type={'submit'}>로그인</Button>
        </Form>
      </Container>
    </Base>
  );
};

export default SignIn;
