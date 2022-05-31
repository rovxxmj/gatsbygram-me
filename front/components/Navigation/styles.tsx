import styled from '@emotion/styled';

export const Base = styled.div<{ borderColor: string }>`
  border-bottom: 1px solid ${({ borderColor }) => borderColor};
  height: 68px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;
export const Container = styled.div`
  max-width: 960px;
  margin: auto;
  height: 100%;
  padding: 0 20px;
  display: flex;

  > div,
  ul {
    width: 100%;
    display: flex;
    align-items: center;
    flex: 1;
  }
`;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-right: 20px;
`;
export const SearchBox = styled.div``;
export const ActionItemWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ActionItem = styled.li`
  font-size: 22px;
  margin-right: 3px;
  line-height: 16px;

  > a,
  span {
    display: block;
    padding: 10px 8px;
    cursor: pointer;
  }
`;

export const UserProfile = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #dfdfdf;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
`;
