import styled from "@emotion/styled";

export const Base = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

export const Container = styled.div`
  max-width: 960px;
  height: 100%;
  margin: auto;
  padding: 0 20px;
  position: relative;

  > div {
    position: absolute;
  }
`;
