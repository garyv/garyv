import { TestBed, async, inject } from '@angular/core/testing';
import { 
  HttpModule, 
  Http, 
  Response,
  ResponseOptions, 
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ContactsService } from './contacts.service';

import { Link } from '../link/link.model';

describe('ContactsService', () => {
  let contactsService: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ContactsService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  describe('getContacts()', () => {

    it('should return an Observable<Links[]>', 

      inject([ContactsService, XHRBackend], (contactsService, mockBackend) => {
        
        const mockResponse = {
          contacts: [
            {
              title: 'email',
              address: 'mailto:me@example.com',
              icon: 'paperplane',
              text: 'me@example.com'
            }, {
              title: 'github',
              address: 'https://github.com/angular',
              icon: 'github',
              text: 'git - click here'
            }
          ]
        };

        mockBackend.connections.subscribe( (connection) => {
          let response = new ResponseOptions({body: JSON.stringify(mockResponse)});
          connection.mockRespond(new Response(response));
        });

        contactsService.getContacts().subscribe( (contacts) => {
          expect(contacts.length).toEqual(2);
          expect(contacts[0].title).toEqual('email');
          expect(contacts[0].address).toEqual('mailto:me@example.com');
          expect(contacts[0].icon).toEqual('paperplane');
          expect(contacts[0].text).toEqual('me@example.com');
        });
      })
    );

  });
});
