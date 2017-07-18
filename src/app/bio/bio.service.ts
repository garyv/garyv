import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Article } from '../article/article.model';

@Injectable()
export class BioService {

  constructor(private http:Http) {}
  getBio() {
    return this.http.get('app/bio/bio.json')
               .map( (response) => {
                 let article = response.json().article;
                 return <Article>article;
               });
  }
}
