import { Component, Input, OnInit } from '@angular/core';

import { Project } from './project/project.model';
import { ProjectTags } from './project-tags.model';
import { ProjectsService } from './projects.service';
import { StateService } from '../state/state.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  projectTags: ProjectTags;
  @Input() skipFade: boolean;
  
  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectTags = new ProjectTags();

    this.projectsService.getProjects()
      .subscribe( (projects) => {
        this.projects = projects;
        this.projectTags.populateTags(projects);
      });
  }

  toggleTag(tag) {
    this.projectTags.toggleTag(tag, this.projects);
  }
}
