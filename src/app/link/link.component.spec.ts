import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { LinkComponent } from './link.component';
import { Link } from './link.model';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let debugElement: DebugElement;

  let link: Link;
  let linkElement: DebugElement;
  const linkAddress:string = 'https://angular.io';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create a link', () => {
    component.link = {address: linkAddress};
    fixture.detectChanges();
    linkElement = debugElement.query(By.css('a'));
    expect(linkElement).toBeTruthy();
  });

  it('should set link href to address', () => {
    component.link = {address: linkAddress};
    fixture.detectChanges();
    linkElement = debugElement.query(By.css(`a[href="${linkAddress}"]`));
    expect(linkElement).toBeTruthy();
  });

  it('should set icon', () => {
    component.link = {icon: 'star', address: linkAddress};
    fixture.detectChanges();
    let iconElement = debugElement.query(By.css('i.fa.fa-star'));
    expect(iconElement).toBeTruthy();
  });

  it('should set link text', () => {
    component.link = {text: 'click here', address: linkAddress};
    fixture.detectChanges();
    linkElement = debugElement.query(By.css('a[href]'));
    expect('click here').toEqual(linkElement.nativeElement.textContent.trim());
  });

  it('should set title', () => {
    component.link = {title: 'Example', address: linkAddress};
    fixture.detectChanges();
    let headingElement = debugElement.query(By.css('h3'));
    expect('Example').toEqual(headingElement.nativeElement.textContent.trim());
  });

  it('should NOT make button if title present', () => {
    component.link = {title: 'Example', address: linkAddress};
    fixture.detectChanges();
    linkElement = debugElement.query(By.css('a.button'));
    expect(linkElement).toBeFalsy();
  });
  
  it('should make button class if title NOT present', () => {
    component.link = {address: linkAddress};
    fixture.detectChanges();
    linkElement = debugElement.query(By.css('a.button'));
    expect(linkElement).toBeTruthy();
  });

});
