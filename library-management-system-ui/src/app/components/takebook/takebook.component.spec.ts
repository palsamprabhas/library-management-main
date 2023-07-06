import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakebookComponent } from './takebook.component';

describe('TakebookComponent', () => {
  let component: TakebookComponent;
  let fixture: ComponentFixture<TakebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakebookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
