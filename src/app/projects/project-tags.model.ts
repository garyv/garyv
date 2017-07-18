import { Input, OnInit } from '@angular/core';

import { Project } from './project/project.model';
import { StateService } from '../state/state.service';

const defaultTags:string[] = ['JavaScript', 'Ruby on Rails'];
const storageKey:string = 'tags';

export class ProjectTags {
  tags: string[] = [];
  activeTags: string[] = [];
  activeProjects: Project[] = [];
  @Input() highlightTag: string;

  constructor() { 
    this.activeTags = JSON.parse(StateService.get(storageKey));
    if (!this.activeTags || !this.activeTags.length) {
      this.activeTags = defaultTags; 
    }
  }

  isActive(tag:string):boolean {
    return this.activeTags.indexOf(tag) != -1;
  }

  populateTags(projects:Project[]):void {
    this.activeProjects = [];
    for (let project of projects) {
      project.active = false;
      for (let tag of project.tags) {
        if (this.tags.indexOf(tag) == -1) {
          this.tags.push(tag);
        }
        if (!project.active && this.activeTags.indexOf(tag) != -1) {
          project.active = true;
        }
      }
      if (project.active) {
        this.activeProjects.push(project);
      }
    }
    this.tags = this.tags.sort();
    StateService.set(storageKey, JSON.stringify(this.activeTags));
  }

  toggleTag(tag:string, projects:Project[]):void {
    let index = this.activeTags.indexOf(tag);

    if (index == -1) {
      this.highlightTag = tag;
      this.activeTags.push(tag);
    } else {
      this.highlightTag = null;
      this.activeTags.splice(index, 1);
    }

    this.populateTags(projects);
  }

  activeProjectTags(project:Project):string {
    let tags:string[] = [];
    for (let tag of project.tags) {
      if (this.isActive(tag)) {
        if (tag == this.highlightTag) {
          tags.push(`<span class='highlight'>${tag}</span>`);
        } else {
          tags.push(`<span>${tag}</span>`);
        }
      }
    }
    return tags.join(', ');
  }
}
