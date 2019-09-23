import { combineReducers } from 'redux';

import { User } from './model/user';

import { PostsReducer } from './reducers/posts.reducer';
import { Posts } from './model/posts';

import { CommentsReducer } from './reducers/comments.reducer';
import { Comments } from './model/comments';

import { createFeatureSelector } from '@ngrx/store';
import * as authentication from './reducers/auth.reducer';



export class IAppState {
 // users: User;
  posts: Posts;
  comments: Comments;
  auths: authentication.State;

}

export const rootReducer = combineReducers<IAppState>({
  //users: UsersReducer,
  posts: PostsReducer,
  comments: CommentsReducer,
  auths: authentication.reducer
});

export const selectAuthState = createFeatureSelector<IAppState>('auths');
