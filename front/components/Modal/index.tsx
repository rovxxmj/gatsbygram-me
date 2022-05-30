import React, { CSSProperties, FC, useCallback } from "react";
import { Base } from "@components/Menu/styles";
import { IMenu } from "@components/Menu";

const Modal: FC<IMenu> = ({ children, onCloseModal, show, baseBgColor, style }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;
  return (
    <Base style={baseBgColor} onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        {children}
      </div>
    </Base>
  );
};

export default Modal;
