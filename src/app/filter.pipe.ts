import { Pipe, PipeTransform } from '@angular/core';
import {Events} from './event-maneg/events/events.model';

@Pipe({
  name: 'filter'
      })
export class FilterPipe implements PipeTransform {

//   transform(ev: Events[], term: string, gend: string): Events[] {
//     if (!ev || !term) {
//       return ev;
//     }
//       return ev.filter(  e =>
//         e.nameevent.toLowerCase().indexOf(term.toLowerCase()) !== -1);
//      if (!ev || !gend) {
//        return ev;
//      }
//     return ev.filter(  ev =>
//       ev.genderevent.toLowerCase().indexOf(term.toLowerCase()) !== -1);
//       }
// }
  transform(items: any, filter: any, defaultFilter: boolean): any {
    if (!filter) {
      return items;
    }

    if (!Array.isArray(items)) {
      return items;
    }

    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return items.filter(item =>
          filterKeys.reduce((x, keyName) =>
            (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
      } else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
          });
        });
      }
    }
  }
}
