import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ticketmodel} from '../tickets.model';
import {Rate} from './rate.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const API_ARGS = {headers: headers};

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http: HttpClient) { }
  MyRates(tid: number): Observable<Rate[]> {
    return this.http.get<Rate[]>(`api/allrate/forticket/` + `${tid}`);
  }
  getByrate(rid: number): Observable<Rate[]> {
    return this.http.get<Rate[]>(`api/rate/by/` + `${rid}`);

  }
}
