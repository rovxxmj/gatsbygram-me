import React, { FC, useCallback } from 'react';

interface IProps {
  children: React.ReactNode;
  show: boolean;
  onCloseModal: () => void;
}

import styled from '@emotion/styled';
import { Container } from '@components/AppLayout';

export const Base = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const Menu: FC<IProps> = ({ children, show, onCloseModal }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
    if (onCloseModal) onCloseModal();
  }, []);

  if (!show) return null;

  return (
    <Base onClick={onCloseModal}>
      <Container onClick={stopPropagation}>{children}</Container>
    </Base>
  );
};

export default Menu;
