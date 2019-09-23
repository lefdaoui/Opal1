import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {PostsService} from './services/posts.service';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, IAppState } from './store';
import { UsersActions } from './store/actions/users.actions'
import { PostsActions } from './store/actions/posts.actions';
import { CommentsActions } from './store/actions/comments.actions';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {path: '', component:  PostsComponent,
  },
  {path: 'login', component:  AuthComponent,
  },
  {path: 'posts',component:  PostsComponent,
  },
  {path: 'posts/:id',component:  PostsComponent ,
  },
  {path: 'comments',component:  CommentsComponent,
  },
  {path: 'comments/:id',component:  CommentsComponent,
  }
  // {
  //   path: "auth",
  //   /* canActivate: [AfterLoginGuard], */
  //   loadChildren:  './main/auth/auth.module#AuthModule'  /* () => AuthModule */,
  // },
  // {
  //   path        : '',
  //   canActivate: [AuthGuard],
  //   loadChildren:  './main/main.module#MainModule'  /* () => MainModule */,
  // }
];



@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    CommentsComponent,
    AuthComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgReduxModule
  ],
  providers: [HttpClientModule , UsersActions , PostsActions , CommentsActions , PostsService],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension
  ) {

    this.ngRedux.configureStore(
      rootReducer, {} as IAppState, [ ], [ devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
