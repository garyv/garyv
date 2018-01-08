import { Input, OnInit } from '@angular/core';

import { Project } from './project/project.model';
import { StateService } from '../state/state.service';

const defaultTags:string[] = ['JavaScript', 'Ruby on Rails'];
const storageKey:string = 'tags';

export class ProjectTags {
  tags: string[] = [];
  activeTags: string[] = [];
  activeProjects: Project[] = [];
  tagsInitialized: boolean = false;
  @Input() highlightTag: string;

  isActive(tag:string):boolean {
    return this.activeTags.indexOf(tag) != -1;
  }

  populateTags(projects:Project[]):void {
    if (!projects.length) { return; }
    let tags = [];
    for (let project of projects) {
      project.active = false;
      for (let tag of project.tags) {
        if (tags.indexOf(tag) == -1) {
          tags.push(tag);
        }
      }
    }
    this.tags = tags.sort();
    this.activateProjects(projects);
    StateService.set(storageKey, JSON.stringify(this.activeTags));
  }

  activateProjects(projects:Project[]):void {
    if (!this.tagsInitialized) {
      if (!this.activeTags.length) {
        this.activeTags = this.tagsFromUrl();
      } 
      if (!this.activeTags.length) {
        this.activeTags = JSON.parse(StateService.get(storageKey));
      }
      if (!this.activeTags.length) {
        this.activeTags = defaultTags; 
      }
      this.tagsInitialized = true;
    }
    this.activeProjects = [];
    for (let project of projects) {
      project.active = false;
      for (let tag of project.tags) {
        if (!project.active && this.activeTags.indexOf(tag) != -1) {
          project.active = true;
        }
      }
      if (project.active) {
        this.activeProjects.push(project);
      }
    }
  }

  tagsFromUrl() {
    let urlParts = location.href.split(/\/tags\//);
    if (urlParts.length < 2) { return []; }
    let tagsList = urlParts[1].split(/\//)[0].split(/\W+/).join('|');
    let tagPattern = new RegExp(`^(${ tagsList })`, 'i');
    return this.tags.filter((tag) => tag.match(tagPattern));
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
