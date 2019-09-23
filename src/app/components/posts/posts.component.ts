import { Component, OnInit, ViewChild } from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {Subject} from 'rxjs';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { PostsActions } from '../../store/actions/posts.actions';
import { Posts } from '../../store/model/posts';
import { ActivatedRoute } from '@angular/router';
import { Comments } from '../../store/model/comments';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-articles',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})

export class PostsComponent implements OnInit {
  @select('posts') public posts$: Observable<Posts>;
  @select('comments') public comments$: Observable<Comments>;
  private  id_post:any;

  //fake session
  current_user_username: string | null;
  current_user_token: string | null;

  constructor( private activatedRoute: ActivatedRoute ,private postsService: PostsService,private authService: AuthService )
  {
    this.current_user_username =localStorage.getItem('username');
    this.current_user_token =localStorage.getItem('token');
  }

  ngOnInit() {

    this.id_post = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.id_post){
      this.postsService.getPostsById(this.id_post);
    }else{
     this.postsService.getPosts();
    }

  }


  storeComment(){
     let comment: any;
     let comment_postId= this.id_post ;
     let comment_name= localStorage.getItem('username'); ;
     let comment_email= localStorage.getItem('email'); ;
     let comment_body= document.getElementById('commentTxt').textContent;

     console.log(comment_body,comment_postId,comment_name,comment_email);

     this.postsService.storeComment(comment_body,comment_postId,comment_name,comment_email);
  }


  backLog(email) {
     this.authService.backLog(email , 'posts/'+this.id_post);
  }



}
