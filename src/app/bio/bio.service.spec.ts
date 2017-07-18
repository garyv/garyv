import { TestBed, async, inject } from '@angular/core/testing';
import { 
  HttpModule, 
  Http, 
  Response,
  ResponseOptions, 
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { BioService } from './bio.service';

import { Article } from '../article/article.model';

describe('BioService', () => {
  let bioService: BioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BioService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  describe('getBio()', () => {
   
    it('should return an Observable<Article>', 
      // Testing services with http in angular
      // https://blog.thoughtram.io/angular/2016/11/28/testing-services-with-http-in-angular-2.html
     
      inject([BioService, XHRBackend], (bioService, mockBackend) => {
      
        const mockResponse = {
          article: { 
            text: "He's a web developer",
            image: { src: "//fillmurray.com/200/300" },
            asideImage: { src: "//placekitten.com/250/200" },
            buttons: [
              { address: "//garyv.space/garyv_resume.pdf",
                text: "resume"
              }, {
                address: "//www.google.com/search?q=baby+photos",
                text: "baby pics"
              }
            ]
          }
        };

        mockBackend.connections.subscribe((connection) => {
          let response = new ResponseOptions({body: JSON.stringify(mockResponse)});
          connection.mockRespond(new Response(response));
        });

        bioService.getBio()
          .subscribe( (article) => {
            expect(article.text).toEqual("He's a web developer");
            expect(article.image.src).toEqual("//fillmurray.com/200/300");
            expect(article.asideImage.src).toEqual("//placekitten.com/250/200");
            expect(article.buttons.length).toBe(2);
            expect(article.buttons[0].address).toEqual("//garyv.space/garyv_resume.pdf");
            expect(article.buttons[0].text).toEqual("resume");
            expect(article.buttons[1].address).toEqual("//www.google.com/search?q=baby+photos");
            expect(article.buttons[1].text).toEqual("baby pics");
          });
      })
    );

  });
});
