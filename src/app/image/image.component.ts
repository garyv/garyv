import { Component, Input } from '@angular/core';

import { Image } from './image.model';
import { ImageTagComponent } from './image-tag.component'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input() image: Image;
}
