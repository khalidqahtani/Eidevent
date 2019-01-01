import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UsersComponent} from './users/users.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {EventsComponent} from './event-maneg/events/events.component';
import {RegisterOrgnizerComponent} from './register/register-orgnizer/register-orgnizer.component';
import {RegisterAttenderComponent} from './register/register-attender/register-attender.component';
import {EditEventComponent} from './edit-event/edit-event.component';
import {EventManegComponent} from './event-maneg/event-maneg.component';
import {AddEventComponent} from './event-maneg/events/add-event/add-event.component';
import {ActiveEventComponent} from './event-maneg/events/active-event/active-event.component';
import {MyeventComponent} from './event-maneg/events/myevent/myevent.component';
import {UnactiveEventComponent} from './event-maneg/events/unactive-event/unactive-event.component';
import {TicketManegComponent} from './event-maneg/ticket-maneg/ticket-maneg.component';
import {CommentManegComponent} from './event-maneg/comment-maneg/comment-maneg.component';
import {TicketsForEventsComponent} from './event-maneg/events/tickets-for-events/tickets-for-events.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'orgregister', component: RegisterOrgnizerComponent},
  {path: 'attender', component: RegisterAttenderComponent},
  {path: 'users', component: UsersComponent},
  {path: 'homeevent', component: EventManegComponent},
  {path: 'events', component: EventsComponent},
  {path: 'addEvent', component: AddEventComponent},
  {path: 'activeEvent', component: ActiveEventComponent},
  {path: 'unapproved', component: UnactiveEventComponent},
  {path: 'event/:eventid', component: EditEventComponent},
  {path: 'user/:userid', component: EditUserComponent},
  {path: 'myevent', component: MyeventComponent},
  {path: 'myticket', component: TicketManegComponent},
  {path: 'ticketsforevent/:eventid', component: TicketsForEventsComponent},
  {path: 'mycomments', component: CommentManegComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
