import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcardComponent } from './amcard.component';

describe('AmcardComponent', () => {
  let component: AmcardComponent;
  let fixture: ComponentFixture<AmcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
