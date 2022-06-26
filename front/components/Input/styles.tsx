import styled from '@emotion/styled';

export const Base = styled.div<{ isValue: boolean; show: boolean; [key: string]: any }>`
  position: relative;
  margin-bottom: 10px;

  & .label {
    position: absolute;
    left: 13px;
    top: ${({ isValue }) => (isValue ? '7px' : '14px')};
    font-size: ${({ isValue }) => (isValue ? '11px' : '14px')};
    transition: 0.2s ease;
    color: ${({ isValue, theme }) => (isValue ? theme.colors.gray[600] : theme.colors.gray[800])};
  }

  & input {
    width: 100%;
    height: 48px;
    padding: ${({ isValue, show }) => (show && isValue ? '22px 12px 6px' : '14px 12px')};
    font-size: 15px;
    font-weight: 600;
    border: 1px solid ${({ theme }) => theme.colors.gray[300]};
    border-radius: 4px;
    &:focus {
      outline: none;
    }
  }

  & input[type='number']::-webkit-outer-spin-button,
  & input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & .validation {
    position: absolute;
    right: 13px;
    top: 12px;
    font-size: 25px;
  }

  & .valid {
    color: ${({ theme }) => theme.colors.blue[600]};
  }
  & .inValid {
    color: ${({ theme }) => theme.colors.red[600]};
  }
`;
