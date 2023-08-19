// import { WinnerData } from '../../../types/index';
import './style.css';

import './style.css';
import Page from '../core/templates/page';
import Form from '../core/components/form';
import { PageIds } from '../../controller/controller';

class LoginPage extends Page {
  static TextObject = {
    MainTitle: 'Login form',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(LoginPage.TextObject.MainTitle);
    // TODO генерация формы

    const form = new Form('form', 'form__container');
    form.generateLoginForm();

    // TODO функции валидации

    // TODO запрос на сервер

    const link = document.createElement('a');
    link.classList.add('go-to-registration--link');
    link.href = `#${PageIds.RegistrationPage}`;
    link.innerText = `Not registered? let's do it now!`;

    this.container.append(title);
    this.container.append(form.render());
    this.container.append(link);

    return this.container;
  }
}

export default LoginPage;
