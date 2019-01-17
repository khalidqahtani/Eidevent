import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import {RegisterOrgnizerComponent} from './register/register-orgnizer/register-orgnizer.component';
import {RegisterAttenderComponent} from './register/register-attender/register-attender.component';
import { UsersComponent } from './users/users.component';
import { EventsComponent } from './event-maneg/events/events.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserDetailComponent} from './users/user-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EventDetailComponent } from './event-maneg/events/event-detail.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventManegComponent } from './event-maneg/event-maneg.component';
import { AddEventComponent } from './event-maneg/events/add-event/add-event.component';
import { ActiveEventComponent } from './event-maneg/events/active-event/active-event.component';
import { NavDetailsComponent } from './nav/nav-details/nav-details.component';
import { MyeventComponent } from './event-maneg/events/myevent/myevent.component';
import { UnactiveEventComponent } from './event-maneg/events/unactive-event/unactive-event.component';
import { TicketManegComponent } from './event-maneg/ticket-maneg/ticket-maneg.component';
import { TicketDetailComponent } from './event-maneg/ticket-maneg/ticket-detail.component';
import { CommentManegComponent } from './event-maneg/comment-maneg/comment-maneg.component';
import {CommentsDetilsComponent} from './event-maneg/events/comments-detils.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule, MatNativeDateModule, MatSelectModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule
} from '@angular/material';
import { RateManegComponent } from './event-maneg/ticket-maneg/rate-maneg/rate-maneg.component';
import { TicketsForEventsComponent } from './event-maneg/events/tickets-for-events/tickets-for-events.component';
import {BasicAuthInterceptor} from './authentication/basic-auth.interceptor';
import {ErrorInterceptor} from './authentication/error.interceptor';
import { HomeComponent } from './home/home.component';
import { TestStylesComponent } from './test-styles/test-styles.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterOrgnizerComponent,
    RegisterAttenderComponent,
    UsersComponent,
    UserDetailComponent,
    EventsComponent,
    EditUserComponent,
    EventDetailComponent,
    EditEventComponent,
    EventManegComponent,
    AddEventComponent,
    ActiveEventComponent,
    NavDetailsComponent,
    MyeventComponent,
    UnactiveEventComponent,
    TicketManegComponent,
    TicketDetailComponent,
    CommentManegComponent,
    CommentsDetilsComponent,
    RateManegComponent,
    TicketsForEventsComponent,
    HomeComponent,
    TestStylesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
