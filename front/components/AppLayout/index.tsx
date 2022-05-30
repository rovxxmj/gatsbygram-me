import React, { FC } from "react";
import { ThemeProvider } from "@emotion/react";
import { dark, light } from "@themes/themes";
import { RecoilRoot } from "recoil";

interface IProps {
  children: React.ReactNode;
}

const AppLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={light}>{children}</ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default AppLayout;
