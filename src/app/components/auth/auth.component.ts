
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState, selectAuthState } from '../../store';
import { LogIn, AuthActionTypes } from '../../store/actions/auth.actions';
import { User } from '../../store/model/user';
import { Observable } from 'rxjs';

import {AuthService} from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { select } from '@angular-redux/store';

import { NgRedux } from '@angular-redux/store';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @select('auths') public auths$: Observable<User>;
  apiUrl = environment.API_URL;

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  current_user_email: string | null;

  constructor(   private ngRedux: NgRedux<IAppState>, private http: HttpClient, private router: Router) {
    this.getState = this.ngRedux.select(selectAuthState);
 }

  ngOnInit() {
    this.logout();

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });

    this.current_user_email =localStorage.getItem('email');
  }





  onSubmit(): void {
    const payload = {
      email: this.user.email
    };
    this.http.get(`${this.apiUrl}users?email=`+payload.email)
      .subscribe((res) => {
        const list = res ; // parse to json
        console.log('[ngRedux]  login state (dispatch action)');
        console.log(list);

        this.ngRedux.dispatch({
          type: AuthActionTypes.LOGIN,
          payload: {
            list
          }
        });
        if(list[0]){
          localStorage.setItem('token',Math.random().toString(36).substr(2) +Math.random().toString(36).substr(2));
          localStorage.setItem('id',list[0].id);
          localStorage.setItem('email',list[0].email);
          localStorage.setItem('username',list[0].username);
          this.router.navigateByUrl('/posts');
        }
      });
  }


logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('email');
  localStorage.removeItem('username');
  this.router.navigateByUrl('/login');
}



}
