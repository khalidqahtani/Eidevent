import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManegComponent } from './event-maneg.component';

describe('EventManegComponent', () => {
  let component: EventManegComponent;
  let fixture: ComponentFixture<EventManegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventManegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventManegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
