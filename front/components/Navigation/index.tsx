import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import {
  BsPlusSquare,
  BsHouseDoorFill,
  BsHouseDoor,
  BsBag,
  BsBagFill,
  BsCompass,
  BsCompassFill,
  BsHeartFill,
  BsHeart,
  BsGear,
  BsGearFill,
} from 'react-icons/bs';
import {
  IoPaperPlaneOutline,
  IoPaperPlane,
  IoAddCircle,
  IoBookmarkOutline,
  IoBookmark,
  IoSync,
  IoPersonCircleSharp,
  IoPersonCircleOutline,
  IoHeartOutline,
  IoHeart,
  IoCompassOutline,
  IoCompass,
  IoToggleOutline,
  IoToggleSharp,
  IoVideocamOutline,
  IoVideocam,
} from 'react-icons/io5';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UserProfileMenu from '@components/Navigation/UserProfileMenu';
import {
  Base,
  ActionItem,
  ActionItemWrapper,
  // Container,
  Logo,
  SearchBox,
  UserProfile,
} from '@components/Navigation/styles';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import MakePostModal from '@components/MakePostModal';
import useSWR from 'swr';
import axios from 'axios';
import { create } from 'domain';
import { useRecoilState } from 'recoil';
import { isModalShow } from '@recoil/atoms';
import PostFormModal from '@components/PostFormModal';

const Container = styled.div`
  max-width: 960px;
  margin: auto;
  height: 100%;
  padding: 0 20px;
  display: flex;

  > div,
  ul {
    width: 100%;
    display: flex;
    align-items: center;
    flex: 1;
  }
`;

const Navigation = () => {
  const theme = useTheme();
  const router = useRouter();
  const { isLoggedIn, me } = useSelector((state: IState) => state.user);
  const [showLikeMenu, setShowLikeMenu] = useState(false);
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false);
  const [showMakePostModal, setShowMakePostModal] = useRecoilState(isModalShow);
  const onCloseModal = useCallback(() => {
    setShowUserProfileMenu(false);
    setShowMakePostModal(false);
  }, []);
  const onClickUserProfileMenu = useCallback(() => {
    setShowUserProfileMenu((prev) => !prev);
  }, []);
  const onClickMakePostModal = useCallback(() => {
    setShowMakePostModal((prev) => !prev);
  }, []);

  const onClickLikeMenu = useCallback(() => {
    setShowLikeMenu((prev) => !prev);
  }, []);
  return (
    <>
      <Base borderColor={theme.colors.gray[100]}>
        <Container>
          <Logo>
            <Link href={'/'}>
              <a>Gatsbygram</a>
            </Link>
          </Logo>
          <SearchBox>Search box..</SearchBox>
          <ActionItemWrapper>
            <ActionItem>
              <Link href={'/'}>
                <a>{router.route === '/' ? <BsHouseDoorFill /> : <BsHouseDoor />}</a>
              </Link>
            </ActionItem>
            <ActionItem>
              <Link href={'/direct/inbox'}>
                <a>{router.route === '/direct/inbox' ? <IoPaperPlane /> : <IoPaperPlaneOutline />}</a>
              </Link>
            </ActionItem>
            <ActionItem onClick={onClickMakePostModal}>
              <span>
                <BsPlusSquare />
              </span>
            </ActionItem>
            <ActionItem>
              <Link href={'/'}>
                <a>{router.route === '/explore' ? <BsCompassFill /> : <BsCompass />}</a>
              </Link>
            </ActionItem>
            <ActionItem onClick={onClickLikeMenu}>
              <span>{showLikeMenu ? <BsHeartFill /> : <BsHeart />}</span>
            </ActionItem>
            <ActionItem>
              <Link href={'/'}>
                <a>{router.route === '/market' ? <BsBagFill /> : <BsBag />}</a>
              </Link>
            </ActionItem>
            <UserProfile onClick={onClickUserProfileMenu}>{me?.email.slice(0, 1).toUpperCase()}</UserProfile>
          </ActionItemWrapper>
        </Container>
      </Base>
      <UserProfileMenu show={showUserProfileMenu} onCloseModal={onCloseModal} />
      {/*<MakePostModal show={showMakePostModal} onCloseModal={onCloseModal} />*/}
      <PostFormModal show={showMakePostModal} onCloseModal={onCloseModal} />
    </>
  );
};

export default Navigation;
