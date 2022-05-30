import React, { FC } from "react";
import Navigation from "@components/Navigation";
import styled from "@emotion/styled";
import { ThemeProvider, useTheme } from "@emotion/react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { isDark } from "@recoil/atoms";
import { light, dark } from "@themes/themes";
import { useRouter } from "next/router";
interface IProps {
  children: React.ReactNode;
}

export const Base = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main<{ bgColor?: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ bgColor }) => bgColor};
`;

export const Container = styled.div`
  max-width: 960px;
  margin: auto;
  padding: 0 20px;
  position: relative;
`;

const AppLayout: FC<IProps> = ({ children }) => {
  const isDarkAtom = useRecoilValue(isDark);
  const router = useRouter();
  return (
    <ThemeProvider theme={isDarkAtom ? dark : light}>
      <Base>
        {["/sign_in", "/sign_up"].includes(router.route) ? (
          <div>{children}</div>
        ) : (
          <>
            <Navigation />
            <Main bgColor={"#fafafa"}>
              <Container>{children}</Container>
            </Main>
          </>
        )}
      </Base>
    </ThemeProvider>
  );
};

export default AppLayout;
