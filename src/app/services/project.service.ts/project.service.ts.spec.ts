import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectServiceTs } from './project.service.ts';

describe('ProjectServiceTs', () => {
  let component: ProjectServiceTs;
  let fixture: ComponentFixture<ProjectServiceTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectServiceTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectServiceTs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
