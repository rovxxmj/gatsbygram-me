import React, { FC, useCallback, useState } from 'react';
import { useTheme } from '@emotion/react';
import { useForm, FormProvider } from 'react-hook-form';
import { REG_EMAIL, REG_PHONE } from '@components/Navigation/LoginModal';
import { SignInContainer } from '@pages/SignIn/styles';
import BirthInput from '@pages/SignUp/BirthInput';
import BasicInputs from '@pages/SignUp/BasicInputs';
import useMutation from '@hooks/useMutation';
import axios from 'axios';
import AuthInput from '@pages/SignUp/AuthInput';
import Welcome from '@pages/SignUp/Welcome';
import useSWR from 'swr';

interface IForm {
  auth: string;
  name: string;
  nickname: string;
  password: string;
  // birth: string;
}

interface IAuth {
  payload: string | null;
}

export interface IMutationResult {
  email: string | null;
  phone: string | null;
  nickname: string;
}

export interface IReturn {
  ok: boolean;
}

export interface IRest {
  [key: string]: any;
}

const SignUp = () => {
  // 가입 시 바로 로그인 처리! (로그인 정보를 어떻게 가져올까)
  const theme = useTheme();
  const [showBasic, setShowBasic] = useState(true);
  // const [showBirth, setShowBirth] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [prepUser, setPrepUser] = useState(null);

  const method = useForm<IForm>({
    defaultValues: { auth: '', name: '', nickname: '', password: '' },
    mode: 'onChange',
  });
  const authMethod = useForm<IAuth>({ defaultValues: { payload: null }, mode: 'onChange' });

  const onSubmit = useCallback((data: IForm) => {
    const submitData = {
      auth: data.auth,
      // email: REG_EMAIL.test(data.auth) ? data.auth : null,
      // phone: REG_PHONE.test(data.auth) ? data.auth.replaceAll('-', '') : null,
      name: data.name,
      nickname: data.nickname,
      password: data.password,
      // birth: data.birth.replaceAll('-', ''),
    };

    axios
      .post('/api/users', submitData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setShowBasic(false);
        setShowAuth(true);
        setPrepUser(res.data);
      })
      .catch((error) => {
        console.error(error);
        method.setError('nickname', { message: '이미 사용중인 사용자 이름입니다.' });
      });
  }, []);

  const onSubmitAuth = useCallback(async (data: IAuth) => {
    axios
      .post('/api/users/confirm', data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setShowAuth(false);
        setShowWelcome(true);
      })
      .catch((error) => {
        console.error(error);
        authMethod.setError('payload', { message: '잘못된 값.' });
      });
  }, []);

  const onClickContinue = useCallback(() => {
    setShowBasic(false);
    // setShowBirth(true);
  }, []);
  const onClickUndo = useCallback(() => {
    setShowBasic(true);
    // setShowBirth(false);
    setShowAuth(false);
    setShowWelcome(false);
    method.resetField('password');
    // method.resetField('birth');
    authMethod.resetField('payload');
  }, []);

  return (
    <div>
      <SignInContainer>
        <div className={'form-wrapper'}>
          <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(onSubmit)}>
              {showBasic && <BasicInputs onClickContinue={onClickContinue} />}
              {/*{showBirth && <BirthInput onClickUndo={onClickUndo} />}*/}
            </form>
          </FormProvider>
          <FormProvider {...authMethod}>
            <form onSubmit={authMethod.handleSubmit(onSubmitAuth)}>
              {showAuth && prepUser && <AuthInput onClickUndo={onClickUndo} prepUser={prepUser} />}
              {showWelcome && prepUser && <Welcome prepUser={prepUser} />}
            </form>
          </FormProvider>
        </div>
      </SignInContainer>
    </div>
  );
};

export default SignUp;
