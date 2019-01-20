import {Events} from '../events/events.model';
import {User} from '../../users/user.model';

export class Ticketmodel {
  ticketid: number;
  date: string;
  ticketcancel: boolean;
  userpresent: boolean;
  ticketbook: boolean;
  eventname: string;
  dateevent: string;
  ticketrate: number;
  eid: Events;
  uid: User;
}
