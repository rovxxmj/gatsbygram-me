import React, { FC, useCallback } from 'react';
import styled from '@emotion/styled';

export interface IModal {
  children: React.ReactNode;
  show: boolean;
  onCloseModal?: () => void;
  [key: string]: any;
}

const Base = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3000;

  > div {
    max-width: 975px;
    margin: auto;
    position: relative;
  }
`;

const Menu: FC<IModal> = ({ children, show, onCloseModal, ...rest }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
    if (onCloseModal) onCloseModal();
  }, []);

  if (!show) return null;
  return (
    <Base onClick={onCloseModal} {...rest}>
      <div onClick={stopPropagation}>{children}</div>
    </Base>
  );
};

export default Menu;
