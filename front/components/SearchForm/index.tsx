import styled from "@emotion/styled";
import { IoSearchOutline } from "react-icons/io5";
import React, { FC, useCallback, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;
import { useForm } from "react-hook-form";
export const Base = styled.div<{ bgColor: string; iconColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > form {
    width: 80%;
    position: relative;
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 7px;
    //margin-right: 4px;
    font-weight: 300;
    overflow: hidden;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  > .search-icon {
    display: block;
    font-size: 18px;
    line-height: 15px;
    color: #878787;
    padding-left: 10px;
  }
  > input {
    display: block;
    height: 100%;
    width: 100%;
    padding: 8px 10px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    min-width: 0;

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-weight: 300;
    }
  }
`;

export const AutoSearchMenu = styled.div`
  width: 100%;
  min-height: 200px;
  font-size: 15px;
`;

export const SearchResultItem = styled.li`
  padding: 5px 10px;
`;

const SearchForm = () => {
  const theme = useTheme();
  const inputRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const [showAutoSearchMenu, setAutoSearchMenu] = useState(true);
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);
  const onClickInputRef = useCallback(() => {
    setAutoSearchMenu(false);
  }, []);
  const onSubmit = useCallback(() => {}, []);

  return (
    <Base bgColor={theme.colors.gray[100]} iconColor={theme.colors.gray[200]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper onClick={stopPropagation}>
          {showAutoSearchMenu && (
            <span className={"search-icon"}>
              <IoSearchOutline />
            </span>
          )}
          <input
            type={"search"}
            {...register("search")}
            placeholder={"검색"}
            ref={inputRef}
            onClick={onClickInputRef}
          />
        </InputWrapper>

        <button type={"submit"} hidden></button>
      </form>
      {/*<AutoSearchMenu>*/}
      {/*  <ul>*/}
      {/*    <SearchResultItem>검색 내용....</SearchResultItem>*/}
      {/*  </ul>*/}
      {/*</AutoSearchMenu>*/}
    </Base>
  );
};

export default SearchForm;
