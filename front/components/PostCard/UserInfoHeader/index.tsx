import styled from '@emotion/styled';
import { IPost } from '@typings/db';
import { CSSProperties, FC } from 'react';
import { MenuItem } from '@components/Navigation/UserProfileMenu';
import { useTheme } from '@emotion/react';
import { PostActionItem } from '@components/PostCard/styles';
import { VscEllipsis } from 'react-icons/vsc';

export const Base = styled.div`
  width: 100%;
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  align-items: center;
  padding: 14px;
  justify-content: space-between;
  cursor: pointer;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  > .user-info-detail {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin-left: 10px;

    > .nickname {
      font-weight: 700;
    }
  }
`;
export const Avartar = styled.div`
  width: 34px;
  height: 34px;
  min-width: 34px;
  background-color: gray;
  border-radius: 50%;
`;

export const Location = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 12px;
  margin-top: -2px;
`;

export const Follow = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 14px;
  font-weight: 600;
  margin-left: 10px;
`;

interface IProps {
  post: IPost;
  style: CSSProperties;
  onClickMoreSettingsMenu: () => void;
}

const UserInfoHeader: FC<IProps> = ({ post, style, onClickMoreSettingsMenu }) => {
  const theme = useTheme();
  return (
    <Base style={style}>
      <UserInfo>
        <Avartar></Avartar>
        <div className={'user-info-detail'}>
          <span className={'nickname'}>{post.User.nickname}</span>
          <Location color={theme.colors.gray[600]} className={'location'}>
            {post.location}
          </Location>
        </div>
        {/*{true && <Follow color={theme.colors.blue}>팔로우</Follow>}*/}
      </UserInfo>
      <PostActionItem onClick={onClickMoreSettingsMenu}>
        <span>
          <VscEllipsis />
        </span>
      </PostActionItem>
    </Base>
  );
};

export default UserInfoHeader;
