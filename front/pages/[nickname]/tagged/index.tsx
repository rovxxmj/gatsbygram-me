import type { NextPage } from "next";
import Head from "next/head";

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import ProfilePageBase from "@components/ProfilePageBase";

const ProfileTagged: NextPage = () => {
  const theme = useTheme();
  return (
    <ProfilePageBase>
      <div>내 프로필</div>
    </ProfilePageBase>
  );
};

export default ProfileTagged;
