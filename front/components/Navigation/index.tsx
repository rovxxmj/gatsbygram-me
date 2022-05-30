import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  BsPlusSquare,
  BsHouseDoorFill,
  BsHouseDoor,
  BsShopWindow,
  BsFillBagFill,
  BsBag,
  BsCompass,
  BsCompassFill,
  BsHeartFill,
  BsHeart,
  BsGear,
  BsGearFill,
  BsHandbagFill,
  BsHandbag,
  BsBagFill,
} from "react-icons/bs";
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
} from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { user } from "@recoil/atoms";
import UserProfileMenu from "@components/Navigation/UserProfileMenu";

export const Base = styled.div<{ borderColor: string }>`
  border-bottom: 1px solid ${({ borderColor }) => borderColor};
  height: 68px;
`;

export const Container = styled.div`
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

export const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-right: 20px;
`;
export const SearchBox = styled.div`
  background-color: gray;
`;
export const ActionItemWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ActionItem = styled.li`
  font-size: 22px;
  margin-right: 3px;
  line-height: 16px;

  > a,
  span {
    display: block;
    padding: 10px 8px;
    cursor: pointer;
  }
`;

export const UserProfile = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #dfdfdf;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
`;

const Navigation = () => {
  const theme = useTheme();
  const router = useRouter();
  const [userData, setUserData] = useRecoilState(user);
  const [showLikeMenu, setShowLikeMenu] = useState(false);
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false);
  const [showMakePostModal, setShowMakePostModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setShowUserProfileMenu(false);
  }, []);
  const onClickUserProfileMenu = useCallback(() => {
    setShowUserProfileMenu((prev) => !prev);
  }, []);
  const onClickLikeMenu = useCallback(() => {
    setShowLikeMenu((prev) => !prev);
  }, []);
  return (
    <Base borderColor={theme.colors.gray[100]}>
      <Container>
        <Logo>
          <Link href={"/"}>
            <a>Gatsbygram</a>
          </Link>
        </Logo>
        <SearchBox>Search box..</SearchBox>
        <ActionItemWrapper>
          <ActionItem>
            <Link href={"/"}>
              <a>
                {router.route === "/" ? <BsHouseDoorFill /> : <BsHouseDoor />}
              </a>
            </Link>
          </ActionItem>
          <ActionItem>
            <Link href={"/direct/inbox"}>
              <a>
                {router.route === "/direct/inbox" ? (
                  <IoPaperPlane />
                ) : (
                  <IoPaperPlaneOutline />
                )}
              </a>
            </Link>
          </ActionItem>
          <ActionItem>
            <span>
              <BsPlusSquare />
            </span>
          </ActionItem>
          <ActionItem>
            <Link href={"/"}>
              <a>
                {router.route === "/explore" ? (
                  <BsCompassFill />
                ) : (
                  <BsCompass />
                )}
              </a>
            </Link>
          </ActionItem>
          <ActionItem onClick={onClickLikeMenu}>
            <span>{showLikeMenu ? <BsHeartFill /> : <BsHeart />}</span>
          </ActionItem>
          <ActionItem>
            <Link href={"/"}>
              <a>{router.route === "/market" ? <BsBagFill /> : <BsBag />}</a>
            </Link>
          </ActionItem>
          <UserProfile onClick={onClickUserProfileMenu}>
            {userData.nickname.slice(0, 1).toUpperCase()}
          </UserProfile>
        </ActionItemWrapper>
      </Container>
      <UserProfileMenu show={showUserProfileMenu} onCloseModal={onCloseModal} />
    </Base>
  );
};

export default Navigation;
