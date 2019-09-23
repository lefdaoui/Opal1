import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {tap} from 'rxjs/operators';
import { IAppState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { post } from 'selenium-webdriver/http';
import { PostsActions } from '../store/actions/posts.actions';
import { CommentsActions } from '../store/actions/comments.actions';

@Injectable()
export class PostsService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient ,  private ngRedux: NgRedux<IAppState>) {
  }

getPosts() {
  this.http.get(`${this.apiUrl}posts`)
    .subscribe((res) => {
      const list = res ; // parse to json

      console.log('[ngRedux] populate posts state (dispatch action)');
      this.ngRedux.dispatch({
        type: PostsActions.LOAD_ALL_POSTS,
        payload: {
          list
        }
      });
    });
}

 getPostsById(id_post) {
  this.http.get(`${this.apiUrl}posts/`+id_post)
    .subscribe((res) => {
      const list = res ; // parse to json

      console.log('[ngRedux] populate posts state (dispatch action)');
      this.ngRedux.dispatch({
        type: PostsActions.FIND_ONE_POSTS,
        payload: {
          list
        }
      });

      if(list){
        console.log('[ngRedux] OK FIND_ONE_POSTS ->');
        console.log('[ngRedux] Posts id : '+list["id"]);

        console.log('[ngRedux] populate comments state (dispatch action)');
        this.getComments(list["id"]);
      }//if list posts
    });
}

  getComments(idPost)
  {
    console.log('[ngRedux] OK  FIND_COMMENTS [idPost '+idPost+'] ');

    this.http.get(`${this.apiUrl}comments?postId=`+idPost)
      .subscribe((res) => {
        const list = res ; // parse to json
        console.log('[ngRedux] OK FIND_COMMENTS');
        console.log(list);

        this.ngRedux.dispatch({
          type: CommentsActions.COMMENTS_FIND_IDPOST,
          payload: {
            list
          }
        });
     })
  }



  storeComment(comment_body:string,comment_postId:number,comment_name:string,comment_email:string)
  {
    return  this.http.post(`${this.apiUrl}comments?name=`+comment_name+`&email=`+comment_email+`&body=`+comment_body+`&postId=`+comment_postId+` `,null).subscribe((res) => {
      const list = res ; // parse to json
      console.log(list);

      this.ngRedux.dispatch({
        type: CommentsActions.COMMENTS_ADD,
        payload: {
          list
        }
      });
      console.log('[ngRedux] OK COMMENTS_ADD');
   });
  }





}
