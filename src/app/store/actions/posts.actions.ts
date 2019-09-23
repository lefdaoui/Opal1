import { Injectable } from '@angular/core';
import { IAppState } from '..';
import { NgRedux } from '@angular-redux/store';
import { Http } from '@angular/http';

@Injectable()
export class PostsActions {
  static LOAD_ALL_POSTS = 'LOAD_ALL_POSTS';
  static FIND_ONE_POSTS = 'FIND_ONE_POSTS';
}
