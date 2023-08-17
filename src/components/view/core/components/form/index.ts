import AppAPI from '../../../../controller/api';
import { PageIds } from '../../../../controller/controller';
import Component from '../../templates/components';
import InputBox from './input';
import Label from './label';

class Form extends Component {
  inputLogin: InputBox;
  inputPassword: InputBox;
  submitBtn: HTMLButtonElement;
  valid: boolean;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.inputLogin = new InputBox('input', 'form__input', 'email', 'login__input', 'Login', true);
    this.inputPassword = new InputBox('input', 'form__input', 'password', 'password__input', 'Password', true);
    this.submitBtn = document.createElement('button');
    this.valid = true;
  }

  generateLoginForm() {
    const form = this.container;
    form.classList.add('login__form');

    const loginField = document.createElement('div');
    loginField.classList.add('form__field');

    this.inputLogin = new InputBox('input', 'form__input', 'email', 'login__input', 'Login', true);
    const inputLoginLabel = new Label('label', 'form__label', 'login__input', '', 'E-mail');

    this.inputLogin.render().addEventListener('change', () => {
      this.checkValidyInput(this.inputLogin.render(), inputLoginLabel.render());
    });

    loginField.append(this.inputLogin.render(), inputLoginLabel.render());

    const passwordField = document.createElement('div');
    passwordField.classList.add('form__field');

    const inputPasswordLabel = new Label('label', 'form__label', 'password__input', '', 'Password');

    this.inputPassword.render().addEventListener('change', () => {
      this.checkValidyInput(this.inputPassword.render(), inputPasswordLabel.render());
    });

    passwordField.append(this.inputPassword.render(), inputPasswordLabel.render());

    this.submitBtn.classList.add('form__button');
    this.submitBtn.id = 'login';
    this.submitBtn.type = 'submit';
    this.submitBtn.innerHTML = 'Log in';

    form.append(loginField, passwordField, this.submitBtn);

    this.submitBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      if (this.inputLogin.render() instanceof HTMLInputElement) {
        if (
          this.checkValidyInput(this.inputLogin.render(), inputLoginLabel.render()) &&
          this.checkValidyInput(this.inputPassword.render(), inputPasswordLabel.render())
        ) {
          this.requestApiLogin(this.inputLogin.getValue(), this.inputPassword.getValue());
        }
      }
    });

    form.append(loginField, passwordField, this.submitBtn);
  }

  generateRegistrationForm() {
    const form = this.container;
    form.classList.add('reg__form');

    const nameField = document.createElement('div');
    nameField.classList.add('form__field');

    const lastNameField = document.createElement('div');
    lastNameField.classList.add('form__field');

    const mailField = document.createElement('div');
    mailField.classList.add('form__field');

    const birthField = document.createElement('div');
    birthField.classList.add('form__field');

    const adressField = document.createElement('div');
    adressField.classList.add('form__field');

    const nameInput = new InputBox('input', 'form__input', 'text', 'name__input', 'First Name', true);
    const nameLabel = new Label('label', 'form__label', 'name__input', '', 'First Name');

    const lastNameInput = new InputBox('input', 'form__input', 'text', 'last-name__input', 'Last Name', true);
    const lastNameLabel = new Label('label', 'form__label', 'last-name__input', '', 'Last Name');

    const mailInput = new InputBox('input', 'form__input', 'email', 'mail__input', 'E-mail', true);
    const mailLabel = new Label('label', 'form__label', 'mail__input', '', 'Last Name');

    const birthDateInput = new InputBox('input', 'form__input', 'text', 'birth-date__input', 'date', true);
    const birthMonthInput = new InputBox('input', 'form__input', 'text', 'birth-month__input', 'month', true);
    const birthYearInput = new InputBox('input', 'form__input', 'text', 'birth-year__input', 'year', true);

    const regBtn = document.createElement('button');
    regBtn.classList.add('form__button');
    regBtn.id = 'login';
    regBtn.type = 'submit';
    regBtn.textContent = 'Register';

    nameField.append(nameInput.render(), nameLabel.render());
    lastNameField.append(lastNameInput.render(), lastNameLabel.render());
    mailField.append(mailInput.render(), mailLabel.render());
    birthField.append(birthDateInput.render(), birthMonthInput.render(), birthYearInput.render());

    form.append(nameField, lastNameField, mailField, birthField, regBtn);
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

  checkValidyInput(input: HTMLElement, label: HTMLElement): boolean {
    if (input instanceof HTMLInputElement) {
      if (input.value === '') {
        label.innerText = 'Requaired field';
        label.classList.add('wrong__input');
        return false;
      }

      if (input.type == 'email') {
        return checkValidyInputEmail(input, label);
      }

      if (input.type == 'password') {
        return checkValidyInputPassword(input, label);
      }
    }
    label.classList.remove('wrong__input');
    label.innerText = 'E-mail';
    return true;
  }

  private async requestApiLogin(login: string, password: string) {
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

function checkValidyInputEmail(input: HTMLInputElement, label: HTMLElement): boolean {
  const dotIndex = input.value.indexOf('.');
  if (!input.value.includes('@')) {
    label.innerText = 'E-mail must contain "@"';
    label.classList.add('wrong__input');
    return false;
  } else if (input.value.includes(' ')) {
    label.innerText = "E-mail can't contain spaces";
    label.classList.add('wrong__input');
    return false;
  } else if (input.value.indexOf('@') === input.value.length - 1) {
    label.innerText = 'E-mail must have domain';
    label.classList.add('wrong__input');
    return false;
  } else if (dotIndex === -1 || dotIndex < input.value.indexOf('@') || dotIndex === input.value.length - 1) {
    label.innerText = 'E-mail must have domain';
    label.classList.add('wrong__input');
    return false;
  }
  label.classList.remove('wrong__input');
  label.innerText = 'E-mail';
  return true;
}

function checkValidyInputPassword(input: HTMLInputElement, label: HTMLElement): boolean {
  const password = input.value;

  if (password.length < 8) {
    label.innerText = 'Password must be 8+ characters';
    label.classList.add('wrong__input');
    return false;
  } else if (password.includes(' ')) {
    label.innerText = "Password can't contain spaces";
    label.classList.add('wrong__input');
    return false;
  } else if (!/[A-Z]/.test(password)) {
    label.innerText = 'Password must contain at least one uppercase letter (A-Z)';
    label.classList.add('wrong__input');
    return false;
  } else if (!/[a-z]/.test(password)) {
    label.innerText = 'Password must contain at least one lowercase letter (a-z)';
    label.classList.add('wrong__input');
    return false;
  } else if (!/\d/.test(password)) {
    label.innerText = 'Password must contain at least one digit (0-9)';
    label.classList.add('wrong__input');
    return false;
  } else if (!/[!@#$%^&*]/.test(password)) {
    label.innerText = 'Password must contain at least one special character (e.g., !@#$%^&*)';
    label.classList.add('wrong__input');
    return false;
  }
  label.classList.remove('wrong__input');
  label.innerText = 'Password';
  return true;
}

export default Form;
