import { ActivityPoolPage } from './app.po';

describe('activity-pool App', () => {
  let page: ActivityPoolPage;

  beforeEach(() => {
    page = new ActivityPoolPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
