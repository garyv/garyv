import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ContactComponent } from './contact.component';
import { ContactsService } from './contacts.service';
import { Link } from '../link/link.model';
import { LinkComponent } from '../link/link.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let debugElement: DebugElement;
  
  let contactsService: ContactsService;
  const fakeContacts: Link[] = [
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
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ContactComponent,
        LinkComponent 
      ],
      imports: [HttpModule],
      providers: [ContactsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    contactsService = fixture.debugElement.injector.get(ContactsService);

    spyOn(contactsService, 'getContacts')
      .and.returnValue(Observable.of(fakeContacts));

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  fakeContacts.forEach((link:Link, i:number) => {
    describe(`${link.title} link`, () => {
      let contactElement: DebugElement;
      let contactText:string;

      beforeEach(() => {
        contactElement = debugElement.query(By.css(`.contact:nth-child(${i+1})`)); 
        contactText = contactElement.nativeElement.textContent;
      });

      it('should contain title', () => {
        expect(contactText).toContain(link.title);
      });

      it('should link to address', () => {
        let linkElement = contactElement.query(By.css(`a[href="${link.address}"]`));
        expect(linkElement).toBeTruthy();
      });

      it('should contain text', () => {
        expect(contactText).toContain(link.text);
      }); 

      it('should contain icon', () => {
        let iconElement = contactElement.query(By.css(`i.fa.fa-${link.icon}`));
        expect(iconElement).toBeTruthy();
      });
    });
  });
});
