import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Comments} from './comments.model';
import {Events} from '../events/events.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  Stream: Subject<Events>;

  constructor(private http: HttpClient) {
    this.Stream = new Subject<Events>();
  }

  MyComments(uid: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`api/comment/byuser/` + `${uid}`);
  }
  getCommentEvent(eid: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`api/comment/buevents/` + `${eid}`);
  }

  getComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(`api/allcomment`);
  }
}
