import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Link } from '../link/link.model';

@Injectable()
export class ContactsService {

  constructor(private http:Http) { }

  getContacts() {
    return this.http.get('app/contact/contacts.json')
               .map( (response) => {
                 let contacts = response.json().contacts;
                 return <Link[]>contacts;
               });
  }

}
