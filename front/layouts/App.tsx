import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@themes/themes';
import Navigation from '@components/Navigation';
import styled from '@emotion/styled';
const Home = loadable(() => import('@pages/Home'));
const SignIn = loadable(() => import('@pages/SignIn'));
const SignUp = loadable(() => import('@pages/SignUp'));

const Base = styled.div<{ [key: string]: any }>`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  width: 100vw;
  height: 100vh;
`;
const Container = styled.div`
  max-width: 975px;
  padding: 0 20px;
  margin: auto;
`;
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Base>
          <Navigation />
          <Container>
            <Switch>
              <Route exact path={'/'} component={Home} />
              <Route path={'/sign_in'} component={SignIn} />
              <Route path={'/sign_up'} component={SignUp} />
            </Switch>
          </Container>
        </Base>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
