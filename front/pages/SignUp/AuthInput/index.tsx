import React, { FC } from 'react';
import Input from '@components/Input';
import { Button } from '@components/Navigation/LoginModal/styles';
import { useFormContext } from 'react-hook-form';
import Header from '@pages/SignIn/Header';
import UndoButton from '@pages/SignUp/UndoButton';
import useMutation from '@hooks/useMutation';
import { IMutationResult } from '@pages/SignUp';

interface IProps {
  onClickUndo: () => void;
  prepUser: {
    email: string | null;
    phone: string | null;
    nickname: string;
  };
}
interface IReturn {
  ok: boolean;
}

const AuthInput: FC<IProps> = ({ onClickUndo, prepUser }) => {
  const [confirm, { loading, data: authToken, error }] = useMutation<IReturn>('/api/users/confirm');
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const { payload } = watch();
  return (
    <>
      <Header
        title={'인증하기'}
        content={`${prepUser?.phone || prepUser?.email}(으)로 전송된 6자리 코드를 입력하세요`}
      />
      <Input
        type={'number'}
        label={'######'}
        isValue={Boolean(payload)}
        isInValid={Boolean(errors.payload) || Boolean(errors.payload?.message)}
        register={register('payload', {
          required: true,
          validate: { formCheck: (value) => /[0-9]{6}$/.test(value) },
        })}
      />

      <Button type={'submit'} disabled={!payload || Boolean(errors.payload)}>
        {loading ? '로딩중...' : '확인'}
      </Button>
      <UndoButton onClick={onClickUndo} />
    </>
  );
};

export default AuthInput;
