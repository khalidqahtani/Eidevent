import { Pipe, PipeTransform } from '@angular/core';
import {Events} from './event-maneg/events/events.model';

@Pipe({
  name: 'filter'
      })
export class FilterPipe implements PipeTransform {

  transform(ev: Events[], term: string, gend: string): Events[] {
    if (!ev || !term) {
      return ev;
    }
      return ev.filter(  e =>
        e.tybeevent.toLowerCase().indexOf(term.toLowerCase()) !== -1);
     if (!ev || !gend) {
       return ev;
     }
    return ev.filter(  ev =>
      ev.genderevent.toLowerCase().indexOf(term.toLowerCase()) !== -1);
      }
}
