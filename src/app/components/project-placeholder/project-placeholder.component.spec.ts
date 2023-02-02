import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPlaceholderComponent } from './project-placeholder.component';

describe('ProjectPlaceholderComponent', () => {
  let component: ProjectPlaceholderComponent;
  let fixture: ComponentFixture<ProjectPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
