import React, { FC } from 'react';
import Step from '@components/CreatePostModal/Step';

interface IProps {
  [key: string]: any;
}
const ThirdStep: FC<IProps> = ({ register }) => {
  return (
    <Step title={'작성하기'}>
      <input type={'file'} {...register}>
        마지막 step
      </input>
    </Step>
  );
};

export default ThirdStep;
