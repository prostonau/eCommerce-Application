import Component from '../../templates/components';
import InputBox from './input';
import Label from './label';

class Form extends Component {
  inputLogin: InputBox;
  inputPassword: InputBox;
  submitBtn: HTMLButtonElement;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.inputLogin = new InputBox('input', 'form__input', 'email', 'login__input', 'Login', true);
    this.inputPassword = new InputBox('input', 'form__input', 'password', 'password__input', 'Password', true);
    this.submitBtn = document.createElement('button');
  }

  generateLoginForm() {
    const form = this.container;
    form.classList.add('login__form');

    const loginField = document.createElement('div');
    loginField.classList.add('form__field');

    this.inputLogin = new InputBox('input', 'form__input', 'email', 'login__input', 'Login', true);
    const inputLoginLabel = new Label('label', 'form__label', 'login__input', '', 'Your e-mail');

    loginField.append(this.inputLogin.render());
    loginField.append(inputLoginLabel.render());

    const passwordField = document.createElement('div');
    passwordField.classList.add('form__field');

    const inputPasswordLabel = new Label('label', 'form__label', 'password__input', '', 'Your password');

    passwordField.append(this.inputPassword.render());
    passwordField.append(inputPasswordLabel.render());

    this.submitBtn.classList.add('form__button');
    this.submitBtn.id = 'login';
    this.submitBtn.type = 'submit';
    this.submitBtn.innerHTML = 'Login';

    form.append(loginField);
    form.append(passwordField);
    form.append(this.submitBtn);
  }

  render() {
    return this.container;
  }

  checkValidy(): boolean {
    if (this.container instanceof HTMLFormElement) {
      return this.container.checkValidity();
    }
    return false;
  }
}

export default Form;
