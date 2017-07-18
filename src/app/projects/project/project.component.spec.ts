import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MockBackend } from '@angular/http/testing';
import 'rxjs/add/observable/of';

import { ProjectComponent } from './project.component';

import { Project } from './project.model';
import { ProjectsComponent } from '../projects.component';
import { ProjectTags } from '../project-tags.model';
import { ProjectsService } from '../projects.service';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
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
    }
  ];

  let project;

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
        ProjectComponent,
        ProjectsComponent
      ], 
      providers: [
        ProjectsService, 
        {
          provide: ActivatedRoute, 
          useValue: {
            params: Observable.of({
              friendlyId: 'example-title'
            }),
            snapshot: {}
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;


    projectsService = fixture.debugElement.injector.get(ProjectsService);

    spyOn(projectsService, 'getProjects')
      .and.returnValue(Observable.of(mockProjects));

    project = mockProjects[0];

    component.project = project;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.project = project;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should include project title', () => {
    let titleElement = debugElement.query(By.css('h1')); 
    let textContent = titleElement.nativeElement.textContent;
    expect(textContent).toEqual('Example Title');   
  });


  it('should include image', () => {
    let image = debugElement.query(By.css('img[src]')); 
    expect(image.nativeElement.src)
      .toEqual("https://www.fillmurray.com/400/300/");
  });

  it('should include description', () => {
    let descriptionElement = debugElement.query(By.css('.description')); 
    let htmlContent = descriptionElement.nativeElement.innerHTML;
    expect(htmlContent).toContain(project.text);
  });

  it('should link back to projects', () => {
    let projectsLink = debugElement.query(By.css("a[href$='/work']")); 
    expect(projectsLink).toBeTruthy();
  });

  it('should link to address', () => {
    let link = debugElement.query(By.css(".project-link a[href]")); 
    expect(link.nativeElement.href).toContain("//example.com");
  });

});
