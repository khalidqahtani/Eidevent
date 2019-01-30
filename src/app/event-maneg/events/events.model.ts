import {User} from '../../users/user.model';

export class Events {
     eventid: number;
     nameevent: string;
     tybeevent: string;
     genderevent: string;
     eventstreet: string;
     eventcity: string;
     eventdate: number;
     eventtime: string;
     description: string;
     capacity: number;
     specialneed: string;
     counter: number;
     edelete: boolean;
     approval: boolean;
     OrgnizerID: User;
     comments: string;
}
