export interface IUser {
  id: number;
  email: string;
  phone: string;
  name: string;
  nickname: string;
  avartar: string;
  bio: string;
  snsId: string;
  createdAt: Date;
  Posts: [];
  Followers: IUser[];
  Followings: IUser[];
  Mentioned: [];
}

// export interface IUserWithOnline extends IUser {
//   online: boolean;
// }
//
// export interface IChannel {
//   id: number;
//   name: string;
//   private: boolean;
//   WorkspaceId: number;
// }
//
// export interface IChat {
//   id: number;
//   UserId: number;
//   User: IUser;
//   content: string;
//   createdAt: Date;
//   ChannelId: number;
//   Channel: IChannel;
// }
//
// export interface IDM {
//   id: number;
//   SenderId: number;
//   Sender: IUser;
//   ReceiverId: number;
//   Receiver: IUser;
//   content: string;
//   createdAt: Date;
// }
//
// export interface IWorkspace {
//   id: number;
//   name: string;
//   url: string;
//   OwnerId: number;
// }
