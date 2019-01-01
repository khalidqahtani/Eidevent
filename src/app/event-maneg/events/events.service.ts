import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Events} from './events.model';
import {Ticketmodel} from '../ticket-maneg/tickets.model';
import {Comments} from '../comment-maneg/comments.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const API_ARGS = {headers: headers};

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {
  }

  addEvent(orgid: number, a): Observable<Events> {
    console.log(JSON.stringify(a.value));
    return this.http.post<Events>(`/api/event/` + `${orgid}`, JSON.stringify(a.value), API_ARGS);
  }

  BookEvent(eid: number, uid: number): Observable<Ticketmodel> {
    return this.http.get<Ticketmodel>(`/api/book/` + `${eid}` + `/` + `${uid}`);
  }

  CommentEvent(a, eid: number, uid: number): Observable<Comments> {
    console.log(JSON.stringify(a.value));
    return this.http.post<Comments>(`/api/comment/` + `${eid}` + `/` + `${uid}`, JSON.stringify(a.value), API_ARGS);
  }

  getEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(`api/events`);
  }
  Myevents(orgid: number): Observable<Events[]> {
    return this.http.get<Events[]>(`api/myevents/` + `${orgid}`);
  }

  getEvent(eventid: number): Observable<Events> {
    return this.http.get<Events>(`api/findbyid/` + `${eventid}`);
  }

  getEventApprove(): Observable<Events[]> {
    return this.http.get<Events[]>(`api/event/avtivete`);
  }
  getEventUnAprove(): Observable<Events[]> {
    return this.http.get<Events[]>(`api/event/notapprove`);
  }

  updateEvent(a, eventid: number): Observable<Events> {
    return this.http.put<Events>(`api/event/` + `${eventid}`, JSON.stringify(a.value), API_ARGS);
  }

  deleteEvent(eventid: number): Observable<Events> {
    return this.http.delete<Events>(`api/event/delete/` + `${eventid}`);
  }
  undeleteEvent(eventid: number): Observable<Events> {
    return this.http.delete<Events>(`api/event/undelete/` + `${eventid}`);
  }

  approvelEvent(eventid: number): Observable<Events> {
    return this.http.get<Events>(`api/event/approve/` + `${eventid}`);
  }
  UnapprovelEvent(eventid: number): Observable<Events> {
    return this.http.get<Events>(`api/event/unapprove/` + `${eventid}`);
  }
  Myeventtickets(eid: number): Observable<Ticketmodel[]> {
    return this.http.get<Ticketmodel[]>(`api/allticket/forevent/` + `${eid}`);
  }
}
