import { FC, useCallback, useState } from 'react';
import { VscEllipsis } from 'react-icons/vsc';
import styled from '@emotion/styled';
import { IPost } from '@typings/db';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { BsHeartFill, BsHeart, BsChat, BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { ActionItem } from '@components/Navigation/styles';

interface IProps {
  post: IPost;
}
export const Base = styled.div<{ bgColor: string; borderColor: string }>`
  width: 470px;
  border-radius: 7px;
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ bgColor }) => bgColor};
  margin-bottom: 20px;
  overflow: hidden;
`;

export const UserMenuWrapper = styled.div<{ borderColor: string }>`
  height: 60px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ borderColor }) => borderColor};
`;
export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const UserAartar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: gray;
`;
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  margin-left: 10px;
  > .nickname {
    font-weight: 600;
  }

  > .location {
    margin-top: -3px;
  }
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

export const PostActionItem = styled(ActionItem)`
  font-size: 22px;
  line-height: 10px;
  margin: 0;
  > a,
  span {
    display: block;
    padding: 10px 8px;

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
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  position: relative;

  > .nickname {
    font-weight: 700;
    margin-right: 10px;
  }
  > .content {
    margin-bottom: 10px;
  }

  & .see-more {
    font-size: 13px;
    color: #878787;
    cursor: pointer;
    margin-left: 10px;
  }
`;

export const Time = styled.div`
  font-size: 10px;
  color: #878787;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const CommentFormWrapper = styled.div`
  height: 50px;
  border-top: 1px solid #dfdfdf;
`;

export const CommentForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;

  > input {
    width: 100%;
    padding: 10px 12px;
    border: none;
    font-size: 15px;
    &:focus {
      outline: none;
    }
  }
`;

export const Button = styled.button<{ color: string; disabled: boolean }>`
  width: 50px;
  border: none;
  background-color: transparent;
  color: ${({ color }) => color};
  font-weight: 700;
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
`;

const PostCard: FC<IProps> = ({ post }) => {
  const theme = useTheme();
  const [showMoreContent, setShowSeeMoreContent] = useState(true);
  const onClickSeeMoreContent = useCallback(() => {
    setShowSeeMoreContent((prev) => !prev);
  }, []);
  return (
    <Base bgColor={theme.colors.bgColor} borderColor={theme.colors.border}>
      <UserMenuWrapper borderColor={theme.colors.border}>
        <UserMenu>
          <UserAartar></UserAartar>
          <UserInfo>
            <span className={'nickname'}>{post.User.nickname}</span>
            <span className={'location'}>seoul</span>
          </UserInfo>
        </UserMenu>
        <MoreMenu>
          <VscEllipsis />
        </MoreMenu>
      </UserMenuWrapper>
      <ImageWrapper></ImageWrapper>
      <ImageInfoWrapper>
        <ActionItemWrapper>
          <div className={'left'}>
            <PostActionItem>
              <span>
                <BsHeart />
              </span>
            </PostActionItem>
            <PostActionItem>
              <span>
                <BsChat />
              </span>
            </PostActionItem>
            <PostActionItem>
              <span>
                <IoPaperPlaneOutline />
              </span>
            </PostActionItem>
          </div>
          <div className={'mid'}>...</div>
          <div className={'right'}>
            <PostActionItem>
              <span>
                <BsBookmark />
              </span>
            </PostActionItem>
          </div>
        </ActionItemWrapper>
        <ContentWrapper>
          <Likes>
            좋아요<span className={'counts'}>{0}</span>개
          </Likes>
          <Content>
            <div className={'nickname'}>{post.User.nickname}</div>
            <div className={'content'}>
              {showMoreContent ? post.content : `${post.content.slice(0, 30)}...`}
              <span className={'see-more'} onClick={onClickSeeMoreContent}>
                {showMoreContent ? '접기' : '더보기'}
              </span>
            </div>
          </Content>
          <Time>{post.createdAt}분 전</Time>
        </ContentWrapper>
      </ImageInfoWrapper>
      <CommentFormWrapper>
        <CommentForm>
          <input placeholder={'댓글 달기...'} />
          <Button type={'submit'} color={theme.colors.blue} disabled={true}>
            게시
          </Button>
        </CommentForm>
      </CommentFormWrapper>
    </Base>
  );
};

export default PostCard;
