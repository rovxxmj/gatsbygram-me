import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IRest } from '@pages/SignIn';
import { useTheme } from '@emotion/react';
import Social from '@components/Navigation/LoginModal/Social';
import { BsFillChatFill, BsGithub } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
interface IProps {
  title: string;
}
export const SocialContainer = styled.div<IRest>`
  margin-top: 26px;
  & .divider {
    display: block;
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
    position: relative;
    > span {
      position: absolute;
      font-size: 11px;
      transform: translate(-50%, -50%);
      padding: 0 10px;
      background-color: #fff;
      color: ${({ theme }) => theme.colors.gray[500]};
    }
  }

  & .buttons {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
`;
const Socials: FC<IProps> = ({ title }) => {
  const theme = useTheme();
  return (
    <SocialContainer>
      <div className={'divider'}>
        <span>{title}</span>
      </div>
      <ul className={'buttons'}>
        <Social
          kakao
          onClick={() => console.log('social')}
          icon={
            <div>
              <BsFillChatFill />
            </div>
          }
          style={{ backgroundColor: theme.colors.yellow[200] }}
        />
        <Social
          onClick={() => console.log('social')}
          icon={
            <div>
              <FaFacebookF />
            </div>
          }
          style={{ backgroundColor: '#325ca6' }}
        />
        <Social
          onClick={() => console.log('social')}
          icon={
            <div>
              <BsGithub />
            </div>
          }
          style={{ backgroundColor: theme.colors.black }}
        />
      </ul>
    </SocialContainer>
  );
};

export default Socials;
