import { CommentsActions } from '../actions/comments.actions';
import { Comments } from '../model/comments';

const INITIAL_STATE: Comments = {
  list: [],
  active: {}
};

export function CommentsReducer(state: Comments = INITIAL_STATE, action: any): any {
  let index;
  let active;
  let list;

  switch (action.type) {

    case CommentsActions.COMMENTS_FIND:
      return Object.assign({}, state, { list: action.payload.list });

      case CommentsActions.COMMENTS_FIND_IDPOST:
      return Object.assign({}, state, { list: action.payload.list });

    case CommentsActions.COMMENTS_ADD:
      state.list.push(action.payload.comment);
      return state;

    default:
      return state;
  }
}

