import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPurchasedComponent } from './user-purchased.component';

describe('UserPurchasedComponent', () => {
  let component: UserPurchasedComponent;
  let fixture: ComponentFixture<UserPurchasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPurchasedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPurchasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
