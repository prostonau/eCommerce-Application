import './style.scss';
import Page from '../core/templates/page';

class AboutUsPage extends Page {
  static TextObject = {
    MainTitle: 'About Us',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(AboutUsPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default AboutUsPage;
