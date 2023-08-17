// import { WinnerData } from '../../../types/index';
import './style.css';

import './style.css';
import Page from '../core/templates/page';
import Form from '../core/components/form';
import AppAPI from '../../controller/api';
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
    form.submitBtn.addEventListener('click', (ev) => {
      if (form.inputLogin.render() instanceof HTMLInputElement) {
        if (form.checkValidy()) {
          ev.preventDefault();
          this.requestApi(form.inputLogin.getValue(), form.inputPassword.getValue());
        }
      }
    });

    this.container.append(title);
    this.container.append(form.render());
    return this.container;
  }

  private async requestApi(login: string, password: string) {
    const api = new AppAPI();
    // await console.log(api.passwordFlow('johndo13e@example.com', 'secret123'));
    try {
      const data = await api.passwordFlow(login, password);
      console.log(login, password, 'datalog==', data);

      if (typeof data === 'object' && data !== null && 'statusCode' in data) {
        const status = data.statusCode;
        console.log('Неверный логин или пароль', status);
      }

      if (typeof data === 'object' && data !== null && 'access_token' in data) {
        const token: string = typeof data.access_token === 'string' ? data.access_token : '';
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(data));

        console.log('sucsess');
        window.location.hash = PageIds.MainPage;
      }
    } catch (error) {
      console.error('Произошла ошибка, попробуйте еще раз', error);
    }
  }
}

export default LoginPage;
