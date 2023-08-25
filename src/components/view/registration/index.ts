// import { WinnerData } from '../../../types/index';
import './style.scss';
import Page from '../core/templates/page';
import Form from '../core/components/form';
import { PageIds } from '../../controller/controller';

class RegistrationPage extends Page {
  static TextObject = {
    MainTitle: 'Registration',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(RegistrationPage.TextObject.MainTitle);

    const form = new Form('form', 'form__container');
    form.generateRegistrationForm();

    const link = document.createElement('a');
    link.classList.add('go-to-login-link');
    link.href = `#${PageIds.LoginPage}`;
    link.innerText = `Do you have account? let's login now!`;

    this.container.append(title);
    this.container.append(form.render());
    this.container.append(link);
    return this.container;
  }
}

export default RegistrationPage;
