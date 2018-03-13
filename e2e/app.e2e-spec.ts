import { Kevinnewman2017Page } from './app.po';

describe('kevinnewman2017 App', () => {
  let page: Kevinnewman2017Page;

  beforeEach(() => {
    page = new Kevinnewman2017Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
