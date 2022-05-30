import React, { FC, useCallback } from 'react';

interface IProps {
  children: React.ReactNode;
  show: boolean;
  onCloseModal: () => void;
}
import styled from '@emotion/styled';
import { Base } from '@components/Menu';

const ModalBase = styled(Base)`
  background-color: rgba(0, 0, 0, 0.7);
`;

const Modal: FC<IProps> = ({ children, show, onCloseModal }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <ModalBase onClick={onCloseModal}>
      <div onClick={stopPropagation}>{children}</div>
    </ModalBase>
  );
};

export default Modal;
