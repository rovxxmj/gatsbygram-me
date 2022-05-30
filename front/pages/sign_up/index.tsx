import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import {
  Base,
  Button,
  Container,
  Form,
  Input,
  Label,
  Title,
} from "@pages/sign_in/styles";
import axios from "@utils/axios";
import Router from "next/router";

interface IForm {
  email: string;
  password: string;
  phone?: string;
  name: string;
  nickname: string;
  gender?: string;
  bio?: string;
  birth?: string;
}
const SignUp: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "",
      name: "",
      nickname: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = useCallback((data: IForm) => {
    axios
      .post("/api/users", data)
      .then((res) => {
        reset();
        Router.push("/sing_in");
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Base>
      <Container>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>이메일 주소</span>
            <Input
              type={"text"}
              placeholder={"이메일"}
              {...register("email")}
              autoComplete={"off"}
            />
          </Label>
          <Label>
            <span>성명</span>
            <Input
              type={"text"}
              placeholder={"name"}
              {...register("name")}
              autoComplete={"off"}
            />
          </Label>
          <Label>
            <span>사용자 이름</span>
            <Input
              type={"text"}
              placeholder={"nickname"}
              {...register("nickname")}
              autoComplete={"off"}
            />
          </Label>
          <Label>
            <span>비밀번호</span>
            <Input
              type={"password"}
              placeholder={"password"}
              {...register("password")}
              autoComplete={"off"}
            />
          </Label>
          <Button type={"submit"}>가입하기</Button>
        </Form>
      </Container>
    </Base>
  );
};

export default SignUp;
