import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoticeComponent } from './update-notice.component';

describe('UpdateNoticeComponent', () => {
  let component: UpdateNoticeComponent;
  let fixture: ComponentFixture<UpdateNoticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateNoticeComponent]
    });
    fixture = TestBed.createComponent(UpdateNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
