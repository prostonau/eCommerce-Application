// import { WinnerData } from '../../../types/index';
import './style.css';
import Page from '../core/templates/page';
import Form from '../core/components/form';

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

    const form = new Form('div', 'form__container');
    form.generateLoginForm();

    // TODO функции валидации

    // TODO запрос на сервер
    this.container.append(title);
    this.container.append(form.render());
    return this.container;
  }
}

export default LoginPage;
