import { TestBed, async, inject } from '@angular/core/testing';
import { 
  HttpModule, 
  Http, 
  Response,
  ResponseOptions, 
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ProjectsService } from './projects.service';

import { Project } from './project/project.model';

describe('ProjectsService', () => {
  let projectsService: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ProjectsService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  describe('getProjects()', () => {

    it('should return an Observable<Project[]>', 

      inject([ProjectsService, XHRBackend], (projectsService, mockBackend) => {
        
        const mockResponse = {
          projects: [
            { 
              //friendlyId: 'example-title',
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
              //friendlyId: 'lorem-ipsum',
              image: {
                src: 'http://lorempixel.com/400/300/',
              },
              link: {
                address: '//lipsum.com',
                text: 'lorem ipsum'
              },
              text: '<p>Lorem ipsum dolor sit amet.</p>',
              title: 'Lorem Ipsum',
              tags: ['Lorem', 'Same']
            }
          ]
        };

        mockBackend.connections.subscribe( (connection) => {
          let response = new ResponseOptions({body: JSON.stringify(mockResponse)});
          connection.mockRespond(new Response(response));
        });

        projectsService.getProjects().subscribe( (projects) => {
          expect(projects.length).toEqual(2);     
          expect(projects[0].title).toEqual('Example Title');
          expect(projects[1].title).toEqual('Lorem Ipsum');
          expect(projects[1].friendlyId).toEqual('lorem-ipsum');
          expect(projects[1].image).toEqual({src: 'http://lorempixel.com/400/300/'});
          expect(projects[1].link).toEqual({address: '//lipsum.com', text: 'lorem ipsum'});
          expect(projects[1].text).toEqual('<p>Lorem ipsum dolor sit amet.</p>');
          expect(projects[1].tags).toEqual(['Lorem', 'Same']);
        });
      })
    );

    describe('getFriendlyId()', () => {
      it('should make titles url friendly', () => {
        let friendlyId = ProjectsService.getFriendlyId(" ¿ HellO  World #👋🌎 !! ");
        expect(friendlyId).toEqual('hello-world');
      });
    });

  });
});
