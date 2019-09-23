//authentication.reducer.ts

import { AuthActionTypes } from '../actions/auth.actions';
import { User } from '../model/user';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

//set the initial state with localStorage
export const initialState: State = {
  isAuthenticated: localStorage.getItem('token')!==null,
  user: {
          token: localStorage.getItem('token'),
          email: localStorage.getItem('email')
        },
  errorMessage: null
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Wrong credentials.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
