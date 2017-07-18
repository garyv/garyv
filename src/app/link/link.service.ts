export class LinkService {

  static newTabExternalLinks(document:any = window.document) {
    // make external links open in new tab
    let links = document.querySelectorAll('a:not([target])');
    
    for (let i = 0; i < links.length; i += 1) {  
      if (!links[i].target) {
        if (links[i]['hostname'] && links[i]['hostname'] !== location.hostname) {
          links[i]['target'] = '_blank';
          links[i]['rel'] = 'external';
        } else {
          links[i]['target'] = '_self';
        }
      }   
    }
    return links;
  }
}
