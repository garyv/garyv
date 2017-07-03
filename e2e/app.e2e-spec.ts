import { GaryvPage } from './app.po';

describe('garyv App', () => {
  let page: GaryvPage;

  beforeEach(() => {
    page = new GaryvPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
