import React, { FC } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';

interface IProps {
  onClick: () => void;
  [key: string]: any;
}

const Base = styled.button<{ special?: boolean }>`
  width: 34px;
  height: 34px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
  }
`;

const ProfileButton: FC<IProps> = ({ onClick }) => {
  const { data: userData, mutate, error } = useSWR<IUser | false>('/api/user/me', fetcher);
  if (!userData) return null;

  return <Base onClick={onClick}>{<img src={userData?.avartar || '/'} />}</Base>;
};

export default ProfileButton;
