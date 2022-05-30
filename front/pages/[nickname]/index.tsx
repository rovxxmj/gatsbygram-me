import type { NextPage } from "next";
import Head from "next/head";

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import ProfilePageBase from "@components/ProfilePageBase";

const Profile: NextPage = () => {
  const theme = useTheme();
  return (
    <ProfilePageBase data={[]}>
      <div>...</div>
    </ProfilePageBase>
  );
};

export default Profile;
