import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

export const Base = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid #dfdfdf;
`;

export const Form = styled.form`
  display: flex;
  height: 100%;

  > input {
    width: 100%;
    padding: 12px;
    border: none;
    font-size: 15px;
    &:focus {
      outline: none;
    }
  }

  > button {
    width: 60px;
    border: none;
    background-color: transparent;
  }
`;

export const Button = styled.button<{ color: string; disabled: boolean }>`
  color: ${({ color }) => color};
  font-weight: 700;
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
`;

interface IForm {
  content: string;
}

const CommentForm = () => {
  const theme = useTheme();
  const { register, handleSubmit, watch, reset } = useForm<IForm>({
    defaultValues: {
      content: '',
    },
  });
  const { content } = watch();
  const onSubmit = useCallback((data: IForm) => {
    console.log(data);
  }, []);
  return (
    <Base>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={'댓글 작성...'} {...register('content')} autoComplete={'off'} />
        <Button color={theme.colors.blue} disabled={!content} type={'submit'}>
          게시
        </Button>
      </Form>
    </Base>
  );
};

export default CommentForm;
