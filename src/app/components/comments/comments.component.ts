import { Component, OnInit } from '@angular/core';
import {CommentsService} from '../../services/comments.service';
import {Subject} from 'rxjs';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { CommentsActions } from '../../store/actions/comments.actions';
import { Comments } from '../../store/model/comments';

@Component({
  selector: 'app-articles',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})

export class CommentsComponent implements OnInit {
  @select('comments') public comments$: Observable<Comments>;

  constructor( private commentsService: CommentsService ,public actions:  CommentsActions)
  {
   // commentsService.getComments(1);
  }

  ngOnInit() {
  }


}
