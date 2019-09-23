import { PostsActions } from '../actions/posts.actions';
import { Posts } from '../model/posts';

const INITIAL_STATE: Posts = {
  list: [],
  active: {}
};

export function PostsReducer(state: Posts = INITIAL_STATE, action: any): any {

  switch (action.type) {

    case PostsActions.LOAD_ALL_POSTS:
      return Object.assign({}, state, { list: action.payload.list });

      case PostsActions.FIND_ONE_POSTS:
        return Object.assign({}, state, { list: action.payload.list });

    default:
      return state;
  }
}

