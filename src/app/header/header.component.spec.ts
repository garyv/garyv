import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('.logo', () => {
    let logo: DebugElement;

    beforeEach(() => {
      logo = debugElement.query(By.css('.logo'));
    });

    it('should be included', () => {  
      expect(logo).toBeTruthy();
    });

    it('should include site name', () => {
      let textContent = logo.nativeElement.textContent;
      expect(textContent).toContain('Gary Von Schilling');
    });

    it('should link to root path', () => {  
      expect(logo.attributes['routerLink']).toBe('/');
    });
  });

  describe('nav', () => {
    let nav: DebugElement;

    beforeEach(() => {
      nav = debugElement.query(By.css('nav'));
    });

    it('should be included', () => {
      expect(nav).toBeTruthy();
    });
 
    ['about', 'contact', 'work'].forEach((linkName:string) => {

      it(`should include ${linkName} link`, () => {
        let link = nav.query(By.css(`a[routerLink='/${linkName}']`));
        expect(link).toBeTruthy();
      });

      it(`should include ${linkName} link text`, () => {
        let link = nav.query(By.css(`a[routerLink='/${linkName}']`))
                      .nativeElement.textContent;
        expect(link.toLowerCase()).toContain(linkName);
      });
    });
  });
});
