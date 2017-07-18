import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import { ProjectsComponent } from './projects.component';

import { Project } from './project/project.model';
import { ProjectComponent } from './project/project.component';
import { ProjectTags } from './project-tags.model';
import { ProjectsService } from './projects.service';
import { StateService } from '../state/state.service';

import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let debugElement: DebugElement;

  let projectsService: ProjectsService;

  let mockProjects: Project[] = [
    { 
      friendlyId: 'example-title',
      image: {
        src: 'https://www.fillmurray.com/400/300/',
      },
      link: {
        address: '//example.com',
        text: 'example text'
      },
      text: '<p>This is an example project.</p>',
      title: 'Example Title',
      tags: ['Example Tag', 'Same']
    }, 
    { 
      friendlyId: 'lorem-ipsum-title',
      image: {
        src: 'https://www.fillmurray.com/400/300/g',
      },
      link: {
        address: '//lorempixel.com',
        text: 'lorem ipsum'
      },
      text: '<p>Lorem ipsum dolor sit amet.</p>',
      title: 'Lorem Ipsum Title',
      tags: ['Lorem', 'Same']
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule, 
        HttpModule,
        RouterTestingModule.withRoutes(
          [{path: 'work/:friendly-id', component: ProjectComponent}]
        )
      ],
      declarations: [ 
        ProjectsComponent,
        ProjectComponent
      ],  
      providers: [
        ProjectsService,
        StateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    projectsService = fixture.debugElement.injector.get(ProjectsService);

    spyOn(projectsService, 'getProjects')
      .and.returnValue(Observable.of(mockProjects));

    StateService.set('tags', '["Same"]');
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should list tags', () => {
    let tagsElement = debugElement.query(By.css('.tags li'));
    expect(tagsElement.nativeElement.textContent).toContain('Example Tag'); 
  });

  it('should list projects', () => {
    let projectElements = debugElement.query(By.css('.project'));
    expect(projectElements.nativeElement.textContent).toContain('Example Title'); 
  });

  it('should link to individual project page', () => {
    let projectLink = debugElement.query(By.css('a[href$=example-title]')); 
    expect(projectLink).toBeTruthy();   
  });

  it('should hide inactive projects', () => {
    component.projectTags.activeProjects.splice(0, 1);
    fixture.detectChanges();
    let projectElements = debugElement.query(By.css('.project'));
    expect(projectElements.nativeElement.textContent).toContain('Lorem Ipsum'); 
  });
});
