import React, { FC, useCallback, useState } from 'react';
import Modal from '@components/Modal';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IUser } from '@typings/db';
import { useFieldArray, useForm } from 'react-hook-form';
import { IForm } from '..';
import axios from 'axios';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  accounts: IUser[];
  [key: string]: any;
}

export const ModalContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid gray;
  background-color: white;
  & h1 {
  }

  & ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const InnerLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  border: 1px solid gray;
`;
export const AccountItem = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  font-size: 18px;
`;

const SelectAccountsModal: FC<IProps> = ({ show, onCloseModal, accounts, rest }) => {
  const theme = useTheme();
  console.log(accounts);
  const [targetAccountIdx, setTargetAccountIdx] = useState(0);
  const onClickAccount = useCallback((idx) => {
    setTargetAccountIdx(idx);
  }, []);
  const onSubmit = useCallback((e: any, accounts) => {
    e.preventDefault();
    const data = {
      username: accounts[targetAccountIdx].nickname,
      password: accounts[targetAccountIdx].password,
    };
    axios
      .post('/api/users/login', data)
      .then((res) => {
        console.log(res.data);
        onCloseModal();
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Modal show={show} onCloseModal={onCloseModal} style={{ backgroundColor: theme.colors.white }}>
      <ModalContent>
        <InnerLayout>
          <h1>Select an account</h1>
          <form onSubmit={(e) => onSubmit(e, accounts)}>
            <ul>
              {accounts
                ? accounts.map((v, idx) => (
                    <AccountItem key={v.id} type={'submit'} onClick={() => onClickAccount(idx)}>
                      {v.nickname}
                    </AccountItem>
                  ))
                : null}
            </ul>
          </form>
        </InnerLayout>
      </ModalContent>
    </Modal>
  );
};

export default SelectAccountsModal;
