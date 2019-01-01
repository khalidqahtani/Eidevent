export class Ticketmodel {
  ticketid: number;
  date: string;
  ticketcancel: boolean;
  userpresent: boolean;
  ticketbook: boolean;
  eventname: string;
  dateevent: string;
  ticketrate: number;
  eid: Eid;
  uid: Uid;
}
export class Eid {
    eventid: number;
    nameevent: string;
  }

  export class Uid {
    userid: number;
    username: string;
  }

