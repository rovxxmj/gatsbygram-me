export interface IUser {
  id: number;
  email: string;
  phone: string;
  name: string;
  nickname: string;
  avartar: string;
  bio: string;
  snsId: string;
  createdAt: string;
  Posts: [];
  Followers: IUser[];
  Followings: IUser[];
  Mentioned: [];
}

// Object 로 표시된 곳은 더 자세한 객체로 바뀔 예정!
export interface IPost {
  id: number;
  User: IUser;
  content: string;
  createdAt: string;
  uploadedAt: string;
  Images: { id: number; src: string; PostId: number }[];
  Videos: Object[];
  Hashtags: Object[];
  Mentions: Object[];
  Comments: { id: number; content: string; UserId: number; PostId: number }[];
  RetweetId: number;
  UserId: number;
  hideCounts: boolean;
  location: boolean;
  turnOffComments: boolean;
}

export interface IHashtag {}
export interface IComment {}
export interface IImage {}
export interface IVideo {}
export interface IMention {}
