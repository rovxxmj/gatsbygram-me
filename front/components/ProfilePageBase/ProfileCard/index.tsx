import styled from "@emotion/styled";
import { FC } from "react";
import { useTheme } from "@emotion/react";
import { BsGear } from "react-icons/bs";

export const Base = styled.div<{ borderColor: string }>`
  display: flex;
  align-items: flex-start;
  padding: 30px 0 40px;
  border-bottom: 1px solid ${({ borderColor }) => borderColor};
`;
export const ProfileAvartar = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

export const AvartarWrapper = styled.div<{ bgColor: string; borderColor: string }>`
  border-radius: 50%;
  width: 150px;
  height: 150px;

  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ borderColor }) => borderColor};

  > img {
    width: 100%;
  }
`;

export const ProfileInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 150px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
  cursor: pointer;
`;
export const Nickname = styled.h1`
  margin-right: 20px;
  font-weight: 500;
  font-size: 28px;
`;

export const Subject = styled.span`
  margin-right: 5px;
`;
export const Counts = styled.span`
  font-weight: 600;
`;

export const EditProfileButton = styled.div<{ bgColor: string; borderColor: string }>`
  height: 30px;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ borderColor }) => borderColor};
`;
export const SettingsButton = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  line-height: 15px;
  cursor: pointer;
`;

export const Bio = styled.div`
  font-weight: 600;
  max-height: 100px;
  overflow: hidden;
`;

interface IProps {
  data: any;
}

const ProfileCard: FC<IProps> = ({ data }) => {
  const theme = useTheme();
  return (
    <Base borderColor={theme.colors.gray[200]}>
      <ProfileAvartar>
        <AvartarWrapper bgColor={theme.colors.gray[200]} borderColor={theme.colors.gray[300]}>
          <img alt={"kyle__mathews"} />
        </AvartarWrapper>
      </ProfileAvartar>
      <ProfileInfo>
        <Row>
          <Nickname>kyle__mathews</Nickname>
          <EditProfileButton bgColor={theme.colors.white} borderColor={theme.colors.gray[200]}>
            프로필 편집
          </EditProfileButton>
          <SettingsButton>
            <BsGear />
          </SettingsButton>
        </Row>
        <Row>
          <Col>
            <Subject>게시물</Subject>
            <Counts>0</Counts>
          </Col>
          <Col>
            <Subject>팔로워</Subject>
            <Counts>10</Counts>
          </Col>
          <Col>
            <Subject>팔로우</Subject>
            <Counts>20</Counts>
          </Col>
        </Row>
        <Row>
          <Bio>
            Be that one sandstone rock on the seashore amongst the 1000s of steel gray basalt rocks. "EXTRODINARY fresh
            mustards". This is where they're at folks.
          </Bio>
        </Row>
      </ProfileInfo>
    </Base>
  );
};

export default ProfileCard;
