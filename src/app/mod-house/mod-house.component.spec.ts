import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModHouseComponent } from './mod-house.component';

describe('ModHouseComponent', () => {
  let component: ModHouseComponent;
  let fixture: ComponentFixture<ModHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
