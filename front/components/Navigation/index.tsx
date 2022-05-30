import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import SearchForm from "@components/SearchForm";
import { AiFillPlusSquare, AiOutlinePlusSquare } from "react-icons/ai";
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
import Menu from "@components/Menu";

export const Base = styled.nav<{ bgColor: string; borderColor: string; textColor: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${({ bgColor }) => bgColor};
  border-bottom: 1px solid ${({ borderColor }) => borderColor};
  color: ${({ textColor }) => textColor};
`;

export const Container = styled.div`
  max-width: 960px;
  height: 100%;
  margin: auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Logo = styled.h1`
  display: flex;
  align-items: center;
  max-width: 146px;
  font-style: italic;

  > a {
    padding-right: 18px;
    cursor: pointer;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const ActionItemWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 350px;
`;

export const ActionItem = styled.div`
  margin-right: 8px;
  font-size: 22px;
  line-height: 15px;
  z-index: 2000;
  > a,
  span {
    padding: 5px;
    display: block;
  }

  cursor: pointer;
`;

export const UserAvartar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #f2f2f2;
  cursor: pointer;
  font-size: 14px;
`;

export const MenuItemWrapper = styled.ul<{ bgColor: string; hoverColor: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ bgColor }) => bgColor};
  width: 200px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid lightgray;
  //box-shadow: ;

  > li {
    &:hover {
      background-color: ${({ hoverColor }) => hoverColor};
    }
  }
`;

export const MenuItem = styled.li`
  font-size: 14px;
  cursor: pointer;
  > a,
  span {
    display: flex;
    padding: 10px 12px;
    align-items: center;
    > svg {
      font-size: 18px;
      margin-right: 10px;
    }
  }
`;

const Navigation = () => {
  const Router = useRouter();
  const theme = useTheme();
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showHeartModal, setShowHeartModal] = useState(false);
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false);
  const [nickname, setNickname] = useState("example");

  const style = useMemo(() => ({ top: 60, right: 0 }), []);
  const onCloseModal = useCallback(() => {
    setShowUserProfileMenu(false);
  }, []);
  const onClickUserProfile = useCallback(() => {
    setShowUserProfileMenu(true);
  }, []);

  return (
    <>
      <Base bgColor={theme.colors.bgColor} borderColor={theme.colors.gray[100]} textColor={theme.colors.textColor}>
        <Container>
          <Logo>
            <Link href={"/"}>
              <a>Instagram</a>
            </Link>
          </Logo>
          <SearchWrapper>
            <SearchForm />
          </SearchWrapper>
          <ActionItemWrapper>
            <ActionItem>
              <Link href={"/"}>
                <a>{Router.route === "/" ? <BsHouseDoorFill /> : <BsHouseDoor />}</a>
              </Link>
            </ActionItem>
            <ActionItem>
              <Link href={"/direct/inbox"}>
                <a>{Router.route === "/direct/inbox" ? <IoPaperPlane /> : <IoPaperPlaneOutline />}</a>
              </Link>
            </ActionItem>
            <ActionItem>
              <span>{showAddPostModal ? <IoAddCircle /> : <BsPlusSquare />}</span>
            </ActionItem>
            <ActionItem>
              <Link href={"/explore"}>
                <a>{Router.route === "/explore" ? <BsCompassFill /> : <BsCompass />}</a>
              </Link>
            </ActionItem>
            <ActionItem>
              <span>{showHeartModal ? <BsHeartFill /> : <BsHeart />}</span>
            </ActionItem>
            <ActionItem>
              <Link href={"/market"}>
                <a>{Router.route === "/market" ? <BsFillBagFill /> : <BsBag />}</a>
              </Link>
            </ActionItem>
            <UserAvartar onClick={onClickUserProfile}>{nickname.slice(0, 2).toUpperCase()}</UserAvartar>
          </ActionItemWrapper>
        </Container>
      </Base>
      <Menu show={showUserProfileMenu} style={style} onCloseModal={onCloseModal}>
        <MenuItemWrapper bgColor={theme.colors.white} hoverColor={theme.colors.gray[50]}>
          <MenuItem>
            <Link href={`/${nickname}`}>
              <a>
                <IoPersonCircleOutline />
                프로필
              </a>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link href={`/${nickname}/saved`}>
              <a>
                <IoBookmarkOutline />
                저장됨
              </a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href={"/accounts/edit"}>
              <a>
                <BsGear />
                설정
              </a>
            </Link>
          </MenuItem>
          <MenuItem>
            <span>
              <IoSync />
              계정 전환
            </span>
          </MenuItem>
          <MenuItem>
            <span>로그아웃</span>
          </MenuItem>
        </MenuItemWrapper>
      </Menu>
    </>
  );
};

export default Navigation;
