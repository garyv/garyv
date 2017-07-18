import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from './project.model';
import { ProjectsComponent } from '../projects.component';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  
  projects: Project[]
  @Input() project: Project
  
  constructor(private projectsService: ProjectsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.projectsService.getProjects()
      .subscribe(projects => {
        this.projects = projects;

        this.activatedRoute.params.subscribe(params => {           
          this.project = this.findProject(params['friendly-id']);
        });
      });
  }

  private findProject(friendlyId) {
    for (let project of this.projects) {
      if (friendlyId == project.friendlyId) return project;
    }
  }

}
