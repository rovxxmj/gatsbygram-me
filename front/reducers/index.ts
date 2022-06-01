import { IUser } from '@typings/db';
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

export interface IState {
  user: {
    isLoggedIn: boolean;
    me: { id: number; email: string; password: string } | null;
    signUpData: {};
    loginData: {};
  };
  post: {
    mainPosts: [];
    imagePaths: [];
    postAdded: false;
  };
}

export const loginAction = (data: { id: number; email: string; password: string }) => ({ type: 'LOG_IN', data });

// action -> dispatch -> reducer => state change!
// (이전 상태, 액션) => 다음 상태
// action creator

export const logoutAction = () => ({ type: 'LOG_OUT' });

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return {
          ...state,
          ...action.payload,
        };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
