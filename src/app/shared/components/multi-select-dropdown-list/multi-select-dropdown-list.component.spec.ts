import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectDropdownListComponent } from './multi-select-dropdown-list.component';

describe('MultiSelectDropdownListComponent', () => {
  let component: MultiSelectDropdownListComponent;
  let fixture: ComponentFixture<MultiSelectDropdownListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectDropdownListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectDropdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
