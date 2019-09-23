//authentication.services.ts
import { Injectable } from '@angular/core';
import { User } from '../store/model/user';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { IAppState } from '../store';
import { NgRedux } from '@angular-redux/store';
import {environment} from '../../environments/environment';
import { AuthActionTypes } from '../store/actions/auth.actions';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.API_URL;
  id?: string;
  email?: string;
  password?: string;
  token?: string;


  constructor(private http: HttpClient ,  private ngRedux: NgRedux<IAppState>, private router: Router)
  {
    console.log("AuthenticationService");
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    const token = this.getToken();
    return token != null;
  }




    login(email: string) {
      this.http.get(`${this.apiUrl}/users/`+email)
        .subscribe((res) => {
          const list = res ; // parse to json
          console.log('[ngRedux]  login state (dispatch action)');
          console.log(res);

          this.ngRedux.dispatch({
            type: AuthActionTypes.LOGIN,
            payload: {
              list
            }
          });

        });
    }



    backLog(email_ , route): any {
      let exit :boolean;
      console.log('authService backLog(email_ , route)');
      console.log('authService backLog('+email_+' , '+route+')');
      const payload = {
        email: email_
      };
      this.http.get(`${this.apiUrl}users?email=`+payload.email)
        .subscribe((res) => {
          const list = res ; // parse to json
          console.log('[ngRedux]  backLog state (dispatch action)');
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
            location.reload();
          }else{
            return 0 ;
          }


        });

    }


/*
  login___(email: string): Observable<any> {
    //this is a mocked response to be able to test the example
    return new Observable((observer) => {
      if (email === this.testUser.email && password === this.testUser.password) {
        observer.next({email: this.testUser.email, token: this.testUser.token});
      } else {
        observer.error({error: 'invalid credentials.'});
      }
      observer.complete();
    });
    //this would probably make an http post to the server to process the login
    //return this.http.post<User>(url, {email, password});
  }
*/



/*
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );


  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );
*/







}
