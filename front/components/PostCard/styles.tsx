import styled from '@emotion/styled';
import { ActionItem } from '@components/Navigation/styles';

export const Base = styled.div<{ bgColor: string; borderColor: string }>`
  width: 470px;
  border-radius: 7px;
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ bgColor }) => bgColor};
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
`;

export const MoreMenu = styled.div`
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 10px 15px;
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  height: 470px;
  background-color: #fafafa;
`;

export const ImageInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
export const ActionItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 4px;
  > div {
    display: flex;
    align-items: center;
  }

  > .left {
  }

  > .mid {
    justify-content: center;
  }

  > .right {
    justify-content: flex-end;
  }
`;

export const PostActionItem = styled(ActionItem)<{ liked?: boolean; color?: string }>`
  font-size: 22px;
  line-height: 10px;
  margin: 0;
  > a,
  span {
    display: block;
    padding: 10px 8px;
    color: ${({ liked, color }) => (liked ? color : 'inherit')};
    cursor: pointer;
  }
`;

export const ContentWrapper = styled.div`
  padding: 0 10px;
`;

export const Likes = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  > .counts {
    font-weight: 700;
    margin: 0 1px 0 4px;
  }
`;

export const Content = styled.div`
  align-items: flex-start;
  font-size: 14px;
  position: relative;
  margin-bottom: 10px;
  > .nickname {
    font-weight: 700;
    margin-right: 10px;
  }
  & .see-more {
    font-size: 13px;
    color: #878787;
    cursor: pointer;
    margin-left: 10px;
  }
`;
export const SeeMore = styled.div`
  font-size: 13px;
  color: #878787;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const Time = styled.div`
  font-size: 10px;
  color: #878787;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const Button = styled.button<{ color: string; disabled: boolean }>`
  width: 50px;
  border: none;
  background-color: transparent;
  color: ${({ color }) => color};
  font-weight: 700;
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
`;

export const ModalContentWrapper = styled.ul<{ red: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 380px;
  border-radius: 10px;
  overflow: hidden;

  > .red {
    color: ${({ red }) => red};
  }
`;

export const ModalItem = styled.li`
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-bottom: 1px solid #dfdfdf;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;
