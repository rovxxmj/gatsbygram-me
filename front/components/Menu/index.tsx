import React, { CSSProperties, FC, useCallback, useState } from "react";
import { Base, Container } from "@components/Menu/styles";
import { useRecoilState } from "recoil";

export interface IMenu {
  children: React.ReactNode;
  onCloseModal?: () => void;
  onClick?: () => void;
  show: boolean;
  baseBgColor?: CSSProperties;
  style: CSSProperties;
}

const Menu: FC<IMenu> = ({ children, onCloseModal, show, baseBgColor, style }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
    if (onCloseModal) onCloseModal();
  }, []);

  if (!show) return null;

  return (
    <Base style={baseBgColor} onClick={onCloseModal}>
      <Container>
        <div onClick={stopPropagation} style={style}>
          {children}
        </div>
      </Container>
    </Base>
  );
};

export default Menu;
