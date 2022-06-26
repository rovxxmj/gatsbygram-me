import React, { FC } from 'react';
import Input from '@components/Input';
import { REG_EMAIL, REG_PHONE } from '@components/Navigation/LoginModal';
import { Button } from '@components/Navigation/LoginModal/styles';
import { useFormContext } from 'react-hook-form';
import Header from '@pages/SignIn/Header';
import UndoButton from '@pages/SignUp/UndoButton';
import useMutation from '@hooks/useMutation';
import { IMutationResult } from '@pages/SignUp';

interface IProps {
  onClickUndo: () => void;
}

const BirthInput: FC<IProps> = ({ onClickUndo }) => {
  const [join, { loading, data, error }] = useMutation<IMutationResult>('/api/users');
  const {
    register,
    watch,
    resetField,
    reset,
    formState: { errors },
  } = useFormContext();

  const { birth } = watch();

  return (
    <>
      <Header title={'생일 추가'} content={'공개 프로필에 포함되지 않습니다. 태어난 날짜를 입력해 주세요.'} />
      <Input
        type={'date'}
        show={false}
        label={'비밀번호'}
        isValue={Boolean(birth)}
        isInValid={Boolean(errors.birth) || Boolean(errors.birth?.message)}
        register={register('birth', { required: true })}
      />

      <Button type={'submit'} disabled={!birth || Boolean(errors.birth)}>
        {loading ? '로딩중..' : '다음'}
      </Button>
      <UndoButton onClick={onClickUndo} />
    </>
  );
};

export default BirthInput;
