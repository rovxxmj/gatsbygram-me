import styled from '@emotion/styled';
import { Container } from '@components/Navigation/LoginModal/styles';
import { IRest } from '@pages/SignIn/index';

export const Base = styled.div``;
export const SignInContainer = styled(Container)<IRest>`
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;
