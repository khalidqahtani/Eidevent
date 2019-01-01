export class Rate {
  id: number;
  rated: boolean;
  attenderRate: number;
  rcoment: string;
  entityTicket: TID;
}
export class TID {
  ticketid: number;
  date: string;
  ticketcancel: boolean;
  userpresent: boolean;
  ticketbook: boolean;
  eventname: string;
  dateevent: string;
}
