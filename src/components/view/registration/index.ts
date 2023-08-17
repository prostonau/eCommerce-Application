// import { WinnerData } from '../../../types/index';
import './style.css';
import Page from '../core/templates/page';
import Form from '../core/components/form';

class RegistrationPage extends Page {
  static TextObject = {
    MainTitle: 'Registration',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(RegistrationPage.TextObject.MainTitle);

    const form = new Form('div', 'form__container');
    form.generateRegistrationForm();

    this.container.append(title);
    this.container.append(form.render());
    return this.container;
  }
}

export default RegistrationPage;
