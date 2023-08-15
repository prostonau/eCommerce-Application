// import { WinnerData } from '../../../types/index';
import './style.css';
import Page from '../core/templates/page';

class RegistrationPage extends Page {
  static TextObject = {
    MainTitle: 'Registration',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(RegistrationPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default RegistrationPage;
