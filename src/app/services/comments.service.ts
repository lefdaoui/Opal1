import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {tap} from 'rxjs/operators';
import { IAppState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { post } from 'selenium-webdriver/http';
import { CommentsActions } from '../store/actions/comments.actions';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiUrl = environment.API_URL;
  comments_list : any[];
  private _comments: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public readonly comments: Observable<any[]> = this._comments.asObservable();


  constructor(private http: HttpClient ,  private ngRedux: NgRedux<IAppState>) {
    this.comments.subscribe((comments: any[]) => { this.comments_list = comments; });

  }




 getComments() {
  this.http.get(`${this.apiUrl}comments`)
    .subscribe((res) => {
      const list = res ; // parse to json

      console.log('[ngRedux] populate comments state (dispatch action)');
      this.ngRedux.dispatch({
        type: CommentsActions.COMMENTS_FIND,
        payload: {
          list
        }
      });
    });
}


  storeComment(Comment: Comment): Observable<Comment>
  {
    return this.http.post<Comment>(this.apiUrl+'comments',Comment);
  }





}
