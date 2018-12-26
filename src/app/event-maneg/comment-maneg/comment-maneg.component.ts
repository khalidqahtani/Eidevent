import { Component, OnInit } from '@angular/core';
import {Comments} from './comments.model';
import {AuthenticationService} from '../../authentication/authentication.service';
import {CommentService} from './comment.service';

@Component({
  selector: 'app-comment-maneg',
  templateUrl: './comment-maneg.component.html',
  styleUrls: ['./comment-maneg.component.scss']
})
export class CommentManegComponent implements OnInit {
  comments$: Comments[];
  currentComments: Comments;
  userid: number;

  constructor(private auth: AuthenticationService, private commentService: CommentService) { }

  ngOnInit() {
    this.userid = this.auth.getUserId();
    this.MyComments();
  }
  MyComments() {
    this.commentService.MyComments(this.userid).subscribe(mycomment => {
        this.comments$ = mycomment;
      },
      err => console.log(err),
      () => console.log('list comments ...')
    );
  }

}
