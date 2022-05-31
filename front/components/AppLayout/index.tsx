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
  display: flex;
  flex-direction: column;
  background-color: ${({ bgColor }) => bgColor};
`;

export const Main = styled.main`
  transform: translateY(68px);
`;

export const Container = styled.div`
  max-width: 960px;
  margin: auto;
  padding: 0 20px;
  position: relative;
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
            <Main>
              <Container>{children}</Container>
            </Main>
          </>
        )}
      </Base>
    </ThemeProvider>
  );
};

export default AppLayout;
