import type { NextPage } from "next";
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

interface IForm {
  email: string;
  password: string;
}
const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = useCallback((data: IForm) => {
    axios
      .post("/api/users/login", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Base>
      <Container>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>이메일</span>
            <Input
              type={"text"}
              placeholder={"이메일"}
              {...register("email")}
              autoComplete={"off"}
            />
          </Label>
          <Label>
            <span>비밀번호</span>
            <Input
              type={"text"}
              placeholder={"password"}
              {...register("password")}
              autoComplete={"off"}
            />
          </Label>
          <Button type={"submit"}>로그인</Button>
        </Form>
      </Container>
    </Base>
  );
};

export default SignIn;
