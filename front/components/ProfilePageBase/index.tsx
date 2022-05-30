import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Navigation from "@components/Navigation";
import React, { useEffect } from "react";
import { Base, Container, Main } from "@pages/index";
import ProfileCard from "@components/ProfilePageBase/ProfileCard";
import Link from "next/link";
import { useRouter } from "next/router";

interface IProps {
  children: React.ReactNode;
  data: [];
}

export const PageRoutes = styled.div<{ textColor: string }>`
  display: flex;
  color: ${({ textColor }) => textColor};
  justify-content: center;
  align-items: center;
`;

export const Route = styled.div<{ active: boolean; borderColor: string | false }>`
  padding: 10px 3px;
  margin: 0 30px;
  font-size: 14px;
  border-top: ${({ active, borderColor }) => (active ? `2px solid ${borderColor}` : "none")};
  color: ${({ active, borderColor }) => (active ? `${borderColor}` : "none")};
  transform: translateY(-1px);
  font-weight: 500;
`;
const ProfilePageBase: NextPage<IProps> = ({ children, data }) => {
  const theme = useTheme();
  const router = useRouter();
  console.log(router.route);
  return (
    <Base textColor={theme.colors.textColor}>
      <Navigation />
      <Main bgColor={theme.colors.gray[10]}>
        <Container>
          <ProfileCard data={data} />
          <PageRoutes textColor={theme.colors.gray[400]}>
            <Route active={router.route === "/[nickname]"} borderColor={theme.colors.black}>
              <Link href={"/example"}>
                <a>게시물</a>
              </Link>
            </Route>
            <Route active={router.route === "/[nickname]/saved"} borderColor={theme.colors.black}>
              <Link href={"/example/saved"}>
                <a>저장됨</a>
              </Link>
            </Route>
            <Route active={router.route === "/[nickname]/tagged"} borderColor={theme.colors.black}>
              <Link href={"/example/tagged"}>
                <a>태그됨</a>
              </Link>
            </Route>
          </PageRoutes>
          {children}
        </Container>
      </Main>
    </Base>
  );
};

export default ProfilePageBase;
