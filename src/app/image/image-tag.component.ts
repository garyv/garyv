import { Component, Input, OnInit } from '@angular/core';

import { Image } from './image.model';

@Component({
  selector: 'app-image-tag',
  styleUrls: ['./image.component.css'],
  template: `
    <img [attr.alt]="image.alt" 
         [src]="image.src" 
         [attr.srcset]="image.srcset" 
         [attr.sizes]="image.sizes" 
         [style.width]="image.width" />
  ` 
})
export class ImageTagComponent {
  @Input() image: Image;
}
