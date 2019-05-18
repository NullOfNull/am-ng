import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcardlistComponent } from './amcardlist.component';

describe('AmcardlistComponent', () => {
  let component: AmcardlistComponent;
  let fixture: ComponentFixture<AmcardlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcardlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
