import styled from '@emotion/styled';
interface IRest {
  [key: string]: any;
}

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  background-color: #fff;
  border-radius: 6px;
  padding: 20px 20px 30px;

  & .form-wrapper {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 10px;
  }

  & .logo-wrapper {
    margin-bottom: 20px;
  }
`;

export const Button = styled.button<{ disabled: boolean; [key: string]: any }>`
  padding: 14px 0;
  width: 100%;
  height: 48px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  margin-top: 16px;
  background-color: ${({ disabled, theme }) => (disabled ? theme.colors.gray[200] : theme.colors.blue[600])};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.gray[500] : theme.colors.white)};
  cursor: ${({ disabled }) => (disabled ? 'text' : 'cursor')};
`;

export const LinkContainer = styled.div<IRest>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  & a,
  span {
    font-size: 13px;
    display: block;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
    color: ${({ theme }) => theme.colors.gray[600]};

    &:hover {
      color: ${({ theme }) => theme.colors.gray[900]};
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray[800]};
    }
  }

  & .divider {
    height: 13px;
    width: 1px;
    margin: 0 10px;
    border-left: 1px solid ${({ theme }) => theme.colors.gray[300]};
  }
`;
