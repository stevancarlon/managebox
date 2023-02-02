import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTasksItemComponent } from './project-tasks-item.component';

describe('ProjectTasksItemComponent', () => {
  let component: ProjectTasksItemComponent;
  let fixture: ComponentFixture<ProjectTasksItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTasksItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTasksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
