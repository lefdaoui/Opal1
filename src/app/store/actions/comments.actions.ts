import { Injectable } from '@angular/core';
import { IAppState } from '..';
import { NgRedux } from '@angular-redux/store';
import { Comment } from '../model/comments';
import { Http } from '@angular/http';

@Injectable()
export class CommentsActions {
  static LOAD_ALL_COMMENTS = 'LOAD_ALL_COMMENTS';
  static COMMENTS_FIND_IDPOST = 'COMMENTS_FIND_IDPOST';
  static COMMENTS_FIND = 'COMMENTS_FIND';
  static COMMENTS_ADD = 'COMMENTS_ADD';
  static COMMENTS_UPDATE = 'COMMENTS_UPDATE';

  API_URL = 'https://jsonplaceholder.typicode.com';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private http: Http,
  ) {
  }

  getComments() {
    this.http.get(`${this.API_URL}/comments`)
      .subscribe((res) => {
        const list = res.json();
        this.ngRedux.dispatch({
          type: CommentsActions.LOAD_ALL_COMMENTS,
          payload: {
            list
          }
        });
      });
  }

  getCommentById($id) {
    this.http.get(`${this.API_URL}/comments/` + $id)
      .subscribe((res) => {
        const list = res.json();
        this.ngRedux.dispatch({
          type: CommentsActions.COMMENTS_FIND,
          payload: {
            list
          }
        });
      });
  }

  getCommentByIdPost(id_post) {
    this.http.get(`${this.API_URL}/comments?postId=`+id_post)
      .subscribe((res) => {
        const list = res.json();
        this.ngRedux.dispatch({
          type: CommentsActions.COMMENTS_FIND_IDPOST,
          payload: {
            list
          }
        });
      });
  }


  save(comment: Comment) {
    if (comment.id) {
      this.update(comment);
    } else {
      this.add(comment);
    }
  }

  add(comment: Comment): void {
      this.http.post(`${this.API_URL}/?name=`+comment.name+`&email=`+comment.email+`&body=`+comment.body+`&postId=`+comment.postId , null)
        .subscribe((res) => {
          this.ngRedux.dispatch({
            type: CommentsActions.COMMENTS_ADD,
            payload: { comment: res.json() }
          });
        });
    }

  update(comment: Comment) {
    this.http.patch(`${this.API_URL}/comments/${comment.id}`, comment)
      .subscribe((res) => {
        this.ngRedux.dispatch({
          type: CommentsActions.COMMENTS_UPDATE,
          payload: { user: res.json() }
        });
      });
  }





}
