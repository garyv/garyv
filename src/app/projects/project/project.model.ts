import { Input } from '@angular/core';

import { Image } from '../../image/image.model';
import { Link } from '../../link/link.model';

export class Project {
  @Input() active?: boolean;
  @Input() friendlyId?: string;
  link: Link;
  title: string;
  image?: Image;
  tags: string[];
  text?: string;
}
