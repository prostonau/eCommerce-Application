import AppAPI from '../../../../controller/api';
import { PageIds } from '../../../../controller/controller';
import Component from '../../templates/components';
import InputBox from './input';
import Label from './label';

class Form extends Component {
  inputLogin: InputBox;
  inputPassword: InputBox;
  submitBtn: HTMLButtonElement;
  regBtn: HTMLButtonElement;
  valid: boolean;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.inputLogin = new InputBox('input', 'form__input', 'email', 'login__input', 'Login', true);
    this.inputPassword = new InputBox('input', 'form__input', 'password', 'password__input', 'Password', true);
    this.submitBtn = document.createElement('button');
    this.regBtn = document.createElement('button');
    this.valid = true;
  }

  generateLoginForm() {
    const form = this.container;
    form.classList.add('login__form');

    const loginField = document.createElement('div');
    loginField.classList.add('form__field');

    this.inputLogin = new InputBox('input', 'form__input', 'email', 'login__input', 'Login', true);
    const inputLoginLabel = new Label('label', 'form__label', 'login__input', '', 'E-mail');

    this.inputLogin.render().addEventListener('input', () => {
      this.checkValidyInput(this.inputLogin.render(), inputLoginLabel.render());
    });

    loginField.append(this.inputLogin.render(), inputLoginLabel.render());

    const passwordField = document.createElement('div');
    passwordField.classList.add('form__field');

    const inputPasswordLabel = new Label('label', 'form__label', 'password__input', '', 'Password');

    this.inputPassword.render().addEventListener('input', () => {
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
    nameField.classList.add('form__field', 'name__field');

    const lastNameField = document.createElement('div');
    lastNameField.classList.add('form__field', 'last-name__field');

    const mailField = document.createElement('div');
    mailField.classList.add('form__field', 'email__field');

    const passwordField = document.createElement('div');
    passwordField.classList.add('form__field', 'password__field');

    const birthField = document.createElement('div');
    birthField.classList.add('form__field', 'birth__field');

    /* const genderField = document.createElement('div');
    genderField.classList.add('form__field', 'gender__field'); */

    const streetField = document.createElement('div');
    streetField.classList.add('form__field', 'street__field');

    const postalField = document.createElement('div');
    postalField.classList.add('form__field', 'postal__field');

    const cityField = document.createElement('div');
    cityField.classList.add('form__field', 'city__field');

    const countryField = document.createElement('div');
    countryField.classList.add('form__field', 'country__field');

    const nameInput = new InputBox('input', 'form__input', 'text', 'name__input', '', true);
    const nameLabel = new Label('label', 'form__label', 'name__input', '', 'First Name');

    const lastNameInput = new InputBox('input', 'form__input', 'text', 'last-name__input', '', true);
    const lastNameLabel = new Label('label', 'form__label', 'last-name__input', '', 'Last Name');

    const mailInput = new InputBox('input', 'form__input', 'email', 'mail__input', '', true);
    const mailLabel = new Label('label', 'form__label', 'mail__input', '', 'E-mail');

    const passwordInput = new InputBox('input', 'form__input', 'password', 'password__input', '', true);
    const passwordLabel = new Label('label', 'form__label', 'password__input', '', 'Password');

    const birthInput = new InputBox('input', 'form__input', 'date', 'birth-date__input', 'dd/mm/yyyy', true);
    const birthLabel = new Label('label', 'form__label', 'birth-date__input', '', 'Birthdate');

    /* const genderInput = new InputBox('input', 'form__input', 'text', 'gender__input', '', true);
    const genderLabel = new Label('label', 'form__label', 'gender__input', '', 'Gender'); */

    const streetInput = new InputBox('input', 'form__input', 'text', 'street__input', '', true);
    const streetLabel = new Label('label', 'form__label', 'street__input', '', 'Street address and number');

    const cityInput = new InputBox('input', 'form__input', 'text', 'city__input', '', true);
    const cityLabel = new Label('label', 'form__label', 'city__input', '', 'City');

    const postalInput = new InputBox('input', 'form__input', 'text', 'street__input', '', true);
    const postalLabel = new Label('label', 'form__label', 'street__input', '', 'Postal code');

    const countryInput = new InputBox('input', 'form__input', 'text', 'country__input', '', true);
    const countryLabel = new Label('label', 'form__label', 'country__input', '', 'Country');

    this.regBtn.classList.add('form__button');
    this.regBtn.id = 'login';
    this.regBtn.type = 'submit';
    this.regBtn.innerHTML = 'Register';

    const personalHeader = document.createElement('h3');
    personalHeader.classList.add('field-group__header');
    personalHeader.textContent = 'Personal';

    const shipHeader = document.createElement('h3');
    shipHeader.classList.add('field-group__header');
    shipHeader.textContent = 'Shipping address';

    const credentialsHeader = document.createElement('h3');
    credentialsHeader.classList.add('field-group__header');
    credentialsHeader.textContent = 'Credentials';

    nameField.append(nameLabel.render(), nameInput.render());
    lastNameField.append(lastNameLabel.render(), lastNameInput.render());
    birthField.append(birthLabel.render(), birthInput.render());
    // genderField.append(genderLabel.render(), genderInput.render());
    mailField.append(mailLabel.render(), mailInput.render());
    passwordField.append(passwordLabel.render(), passwordInput.render());
    streetField.append(streetLabel.render(), streetInput.render());
    postalField.append(postalLabel.render(), postalInput.render());
    cityField.append(cityLabel.render(), cityInput.render());
    countryField.append(countryLabel.render(), countryInput.render());

    form.append(
      personalHeader,
      nameField,
      lastNameField,
      birthField,
      // genderField,
      shipHeader,
      streetField,
      postalField,
      cityField,
      countryField,
      credentialsHeader,
      mailField,
      passwordField,
      this.regBtn
    );
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
        this.showNotification('Неверный логин или пароль. Просьба проверить данные.');
      }

      if (typeof data === 'object' && data !== null && 'access_token' in data) {
        const token: string = typeof data.access_token === 'string' ? data.access_token : '';
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(data));
        this.showNotification('Вы успешно вошли.');
        console.log('sucsess');
        window.location.hash = PageIds.MainPage;
      }
    } catch (error) {
      this.showNotification('Произошла ошибка, попробуйте еще раз.');
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
