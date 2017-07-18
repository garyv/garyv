import { Component, OnInit } from '@angular/core';

import { ContactsService } from './contacts.service';

import { Link } from '../link/link.model';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Link[];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContacts()
                        .subscribe( (contacts) => {
                          this.contacts = contacts;
                        });
  }
}
