import { LinkService } from './link.service';

describe('LinkService', () => {
  
  it('should be created', () => {
    expect(LinkService).toBeTruthy();
  });

  describe('newTabExternalLinks()', () => {
    let links: object[];

    const localDomain = location.hostname;

    const mockDocument = {
      querySelectorAll: (query:string = '') => {
        return [
          {href: '/about', hostname: localDomain}, 
          {href: `//${location.host}/contact`, hostname: localDomain},
          {href: '//example.com/', hostname: 'example.com'},
          {href: '//example.com/', hostname: 'example.com', target: '_self'}, 
          {href: `/about`, hostname: localDomain, target: '_blank'},
        ];  
      }
    };

    beforeEach(() => {
      links = LinkService.newTabExternalLinks(mockDocument);
    });

    it('should make relative links target same tab', () => {     
      expect('_self').toEqual(links[0]['target']);
    });

    it('should make same domain absolute links open in same tab', () => {     
      expect('_self').toEqual(links[1]['target']);
    });

    it('should make external links open in new tab', () => {
      expect('_blank').toEqual(links[2]['target']);
    });

    it('should NOT change link already set to same tab', () => {
      expect('_self').toEqual(links[3]['target']);
    });

    it('should NOT change link already set to new tab', () => {
      expect('_blank').toEqual(links[4]['target']);
    });

  });
});
