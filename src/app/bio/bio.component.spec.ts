import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Article } from '../article/article.model';
import { BioComponent } from './bio.component';
import { BioService } from './bio.service';
import { ImageComponent } from '../image/image.component';
import { ImageTagComponent } from '../image/image-tag.component';
import { LinkComponent } from '../link/link.component';

describe('BioComponent', () => {
  let component: BioComponent;
  let fixture: ComponentFixture<BioComponent>;
  let debugElement: DebugElement;

  let bioService: BioService;

  const mockBio: Article = { 
    text: "He's a web developer",
    image: { src: '//fillmurray.com/200/300' },
    asideImage: { src: '//placekitten.com/250/200' }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ 
        BioComponent, 
        ImageComponent, 
        ImageTagComponent,
        LinkComponent 
      ],
      providers: [ BioService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    bioService = fixture.debugElement.injector.get(BioService);

    spyOn(bioService, 'getBio')
      .and.returnValue(Observable.of(mockBio));

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain biography text', () => {
    let textContent = debugElement.nativeElement.textContent;
    expect(textContent).toContain(mockBio.text);
  });

  it('should contain main image', () => {
    let image = debugElement.query(By.css(`img[src="${mockBio.image.src}"]`));
    expect(image).toBeTruthy();
  });

  it('should contain aside image', () => {
    let image = debugElement.query(By.css(`img[src="${mockBio.asideImage.src}"]`));
    expect(image).toBeTruthy();
  });
});
