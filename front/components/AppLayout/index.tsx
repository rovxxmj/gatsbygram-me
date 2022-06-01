import React, { FC } from 'react';
import Navigation from '@components/Navigation';
import styled from '@emotion/styled';
import { ThemeProvider, useTheme } from '@emotion/react';
import { light, dark } from '@themes/themes';
import { useRouter } from 'next/router';
interface IProps {
  children: React.ReactNode;
}

export const Base = styled.div<{ bgColor?: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ bgColor }) => bgColor};
`;

export const Main = styled.main``;

export const Container = styled.div`
  width: 960px;
  margin: 68px auto auto auto;
  padding: 0 20px;
  overflow-y: scroll;
  //position: relative;
  //background-color: gray;
`;

const AppLayout: FC<IProps> = ({ children }) => {
  const router = useRouter();
  return (
    <ThemeProvider theme={light}>
      <Base bgColor={'#fafafa'}>
        {['/sign_in', '/sign_up'].includes(router.route) ? (
          <div>{children}</div>
        ) : (
          <>
            <Navigation />
            <Container>{children}</Container>
          </>
        )}
      </Base>
    </ThemeProvider>
  );
};

export default AppLayout;
