import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IoEllipsisVerticalOutline } from 'react-icons/io5';
import Modal from '@components/Modal';

export const Base = styled.div<{ [key: string]: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[50]};
  & .left {
    display: flex;
    align-items: center;
    & .avartar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      & img {
        width: 100%;
        height: 100%;
      }
    }

    & .nickname {
      margin-left: 8px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  & .setting-button {
    font-size: 18px;
    cursor: pointer;
  }
`;
const UserInfoBar = () => {
  const theme = useTheme();
  const { data } = useSWR<IUser>('/api/user/me', fetcher);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const onCloseModal = useCallback(() => {}, []);
  const onClickSettingButton = useCallback(() => {}, []);
  return (
    <Base theme={theme}>
      <div className={'left'}>
        <div className={'avartar'}>
          <img src={data?.avartar} />
        </div>
        <span className={'nickname'}>{data?.nickname}</span>
      </div>
      <div className={'setting-button'} onClick={onClickSettingButton}>
        <IoEllipsisVerticalOutline />
      </div>
      <Modal show={showSettingsModal} onCloseModal={onCloseModal}>
        <div>....</div>
      </Modal>
    </Base>
  );
};

export default UserInfoBar;
