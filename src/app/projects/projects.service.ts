import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Project } from './project/project.model';

@Injectable()
export class ProjectsService {

  constructor(private http:Http) {}

  getProjects() {
    return this.http.get('app/projects/projects.json')
      .map( (response) => {
        let projects = <Project[]>response.json().projects;
        for (let project of projects) {
          if (project.title && !project.friendlyId) {
            project.friendlyId = ProjectsService.getFriendlyId(project.title);
          }                   
        }
      return projects;
     });
  }

  static getFriendlyId(title: string): string {
    return title.toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
