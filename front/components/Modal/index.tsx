import React, { CSSProperties, FC, useCallback } from 'react';

interface IProps {
  children: React.ReactNode;
  show: boolean;
  onCloseModal: () => void;
  style?: string;
}
import styled from '@emotion/styled';
// import { Base } from '@components/Menu';

const Base = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const Modal: FC<IProps> = ({ children, show, onCloseModal }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <Base onClick={onCloseModal}>
      <div onClick={stopPropagation}>{children}</div>
    </Base>
  );
};

export default Modal;
