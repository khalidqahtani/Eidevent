import {User} from '../../users/user.model';

export class Events {
  constructor(
    public eventid: number,
    public nameevent: string,
    public tybeevent: string,
    public genderevent: string,
    public eventstreet: string,
    public eventcity: string,
    public eventdate: number,
    public eventtime: string,
    public capacity: number,
    public counter: number,
    public edelete: boolean,
    public approval: boolean,
    public OrgnizerID: User,
    public comments: string) {}
}
