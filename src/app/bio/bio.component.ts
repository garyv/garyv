import { Component, OnInit } from '@angular/core';

import { Article } from '../article/article.model';
import { BioService } from './bio.service';
import { ImageComponent } from '../image/image.component';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  bio: Article;

  constructor(private bioService: BioService) { }

  ngOnInit() {
    this.bioService.getBio()
      .subscribe( (bio) => {
        this.bio = bio;
      }); 
  }
}
