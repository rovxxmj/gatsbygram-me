export interface IUser {
  email: string;
  phone?: string;
  name: string;
  nickname: string;
  bio?: string;
  gender?: string;
  birth?: string;
}

export interface IPost {
  id: number;
  User: { id: number; nickname: string };
  content: string;
  Images: { src: string }[];
  Comments: { User: { nickname: string }; content: string }[];
}
