import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Navigation from "@components/Navigation";

export const Base = styled.div<{ textColor: string }>`
  width: 100vw;
  height: 100vh;
  color: ${({ textColor }) => textColor};
`;

export const Main = styled.main<{ bgColor: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ bgColor }) => bgColor};
`;

export const Container = styled.div`
  max-width: 960px;
  margin: auto;
  padding: 0 20px;
  transform: translateY(60px);
`;

const Market: NextPage = () => {
  const theme = useTheme();

  return (
    <Base textColor={theme.colors.textColor}>
      <Navigation />
      <Main bgColor={theme.colors.gray[10]}>
        <Container>마켓</Container>
      </Main>
    </Base>
  );
};

export default Market;
