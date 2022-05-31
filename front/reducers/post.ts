interface IPost {
  id: number;
  User: { id: number; nickname: string };
  content: string;
  Images: { src: string }[];
  location?: string;
  Comments: { User: { nickname: string }; content: string }[];
  createdAt: string;
  updatedAt: string;
}

interface IPostProps {
  mainPosts: IPost[];
  imagePaths: []; // 이미지 경로
  postAdded: boolean; // 작성 후 true
}

const initialState: IPostProps = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'rovxxmj',
      },
      content: 'Foggy day #sf #oceanbeach #sutroheights',
      Images: [
        { src: 'https://i.picsum.photos/id/1035/5854/3903.jpg?hmac=DV0AS2MyjW6ddofvSIU9TVjj1kewfh7J3WEOvflY8TM' },
        { src: 'https://i.picsum.photos/id/1033/2048/1365.jpg?hmac=zEuPfX7t6U866nzXjWF41bf-uxkKOnf1dDrHXmhcK-Q' },
        { src: 'https://i.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ' },
      ],
      location: 'hangang',
      Comments: [
        { User: { nickname: 'go_wun' }, content: 'yummy' },
        { User: { nickname: 'kyle__ck' }, content: 'kyle__ck heart' },
      ],
      createdAt: '15',
      updatedAt: '10',
    },
    {
      id: 2,
      User: {
        id: 2,
        nickname: 'ruggy_pants',
      },
      content: 'Looking back at snowshoe prints. #latergram #lehi',
      Images: [
        { src: 'https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k' },
      ],
      location: 'hangang',
      Comments: [
        { User: { nickname: 'go_wun' }, content: 'yummy' },
        { User: { nickname: 'kyle__ck' }, content: 'kyle__ck heart' },
      ],
      createdAt: '15',
      updatedAt: '10',
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPostAction = (data: any) => ({ type: ADD_POST, data });

export const dummyPost = {
  id: 3,
  content: 'This is dummy',
  User: {
    id: 3,
    nickname: 'rovxxmj',
  },
  location: 'seoul, korea',
  Images: [],
  Comments: [],
  createdAt: '15',
  updatedAt: '10',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
