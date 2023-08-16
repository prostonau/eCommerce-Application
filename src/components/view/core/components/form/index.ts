import Component from '../../templates/components';
import InputBox from './input';
import Label from './label';

class Form extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  generateLoginForm() {
    const form = document.createElement('form');
    form.classList.add('login__form');

    const loginField = document.createElement('div');
    loginField.classList.add('form__field');

    const inputLogin = new InputBox('input', 'form__input', 'email', 'login__input', 'Login', true);
    const inputLoginLabel = new Label('label', 'form__label', 'login__input', '', 'Your e-mail');

    loginField.append(inputLogin.render());
    loginField.append(inputLoginLabel.render());

    const passwordField = document.createElement('div');
    passwordField.classList.add('form__field');

    const inputPassword = new InputBox('input', 'form__input', 'password', 'password__input', 'Password', true);
    const inputPasswordLabel = new Label('label', 'form__label', 'password__input', '', 'Your password');

    passwordField.append(inputPassword.render());
    passwordField.append(inputPasswordLabel.render());

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('form__butto');
    submitBtn.id = 'login';
    submitBtn.type = 'submit';
    submitBtn.innerHTML = 'Login';

    form.append(loginField);
    form.append(passwordField);
    form.append(submitBtn);

    this.container.append(form);
  }

  render() {
    return this.container;
  }
}

export default Form;
