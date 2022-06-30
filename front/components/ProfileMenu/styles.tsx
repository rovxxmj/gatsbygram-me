import styled from '@emotion/styled';

export const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  background-color: #fff;
  color: #000;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  transition: 0.2s ease;
  // &:hover {
  //   background-color: ${({ theme }) => theme.colors.gray[50]};
  // }

  & .nickname {
    margin-left: 10px;
    font-size: 15px;
    font-weight: 600;
  }
`;
