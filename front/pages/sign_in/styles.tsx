import styled from "@emotion/styled";

export const Base = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 420px;
  min-height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
`;

export const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  > span {
    font-size: 13px;
  }
`;

export const Input = styled.input`
  border: 1px solid #dfdfdf;
  padding: 10px;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  margin-top: 20px;
  font-size: 15px;
  padding: 10px 0;
  border: 1px solid #dfdfdf;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
`;