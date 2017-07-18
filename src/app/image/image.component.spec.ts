import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { ImageComponent } from './image.component';

import { Image } from './image.model';
import { ImageTagComponent } from './image-tag.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let debugElement: DebugElement;

  let image: Image;
  let imageTag: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageComponent, ImageTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    image = {src: '//lorempixel.com/400/320'};
    component.image = image;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an image', () => {
    imageTag = debugElement.query(By.css("img[src]")); 
    expect(imageTag).toBeTruthy();
  });

  [
    ['alt', 'Alternative'],
    ['sizes', '(min-width: 401px) 800px, 400px'],
    ['srcset', '//lorempixel.com/800/640 800w, //lorempixel.com/400/320 400w'],
  ].forEach((attribute) => {
    it(`should use ${attribute[0]} attribute`, () => {
      image[attribute[0]] = attribute[1];
      fixture.detectChanges();
      imageTag = debugElement.query(By.css(`img[${attribute[0]}="${attribute[1]}"]`));
      expect(imageTag).toBeTruthy();
    });
  });

  it('should use caption', () => {
    image['caption'] = 'My caption';
    fixture.detectChanges();
    let captionTag = debugElement.query(By.css('p')); 
    expect('My caption').toEqual(captionTag.nativeElement.textContent)
  });

  it('should use image link', () => {
    image['link'] = '//example.com';
    fixture.detectChanges();
    imageTag = debugElement.query(By.css(`a[href="//example.com"] img[src]`)); // `a[href="//example.com"] img[src]`
    expect(imageTag).toBeTruthy();
  });

  it('should use width to set style', () => {
    image['width'] = '400px';
    fixture.detectChanges();
    imageTag = debugElement.query(By.css(`img[style]`)); 
    expect('width: 400px;').toEqual(imageTag.nativeElement.attributes.style.value)
  });

});
