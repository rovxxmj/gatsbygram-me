interface IUserProps {
  isLoggedIn: boolean;
  me: null;
  signUpData: {};
  loginData: {};
}

const initialState: IUserProps = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
