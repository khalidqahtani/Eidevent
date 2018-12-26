import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ticketmodel} from './tickets.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const API_ARGS = {headers: headers};

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }
  MyTickets(uid: number): Observable<Ticketmodel[]> {
    return this.http.get<Ticketmodel[]>(`api/allticket/foruser/` + `${uid}`);
  }

  getTicket(tid: number): Observable<Ticketmodel> {
    return this.http.get<Ticketmodel>(`api/ticket/by/` + `${tid}`);
  }

  deleteTicket(tid: number): Observable<Ticketmodel> {
    return this.http.delete<Ticketmodel>(`api/ticket/cancel/` + `${tid}`);
  }
}
