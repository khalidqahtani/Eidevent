import { Pipe, PipeTransform } from '@angular/core';
import {Events} from './event-maneg/events/events.model';

@Pipe({
  name: 'filter',
      })
export class FilterPipe implements PipeTransform {

  transform(ev: Events[], term: string): Events[] {
    if (!ev || !term) { return ev; }
      return ev.filter(  e =>
        e.nameevent.toLowerCase().indexOf(term.toLowerCase()) !== -1);
      }
}
