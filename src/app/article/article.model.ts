import { Image } from '../image/image.model';
import { Link } from '../link/link.model';

export interface Article {
  text: string;
  image: Image;
  asideImage?: Image;
  links?: Link[];
}
