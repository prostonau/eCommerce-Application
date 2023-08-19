import AppAPI from '../../../../controller/api';
import { PageIds } from '../../../../controller/controller';
import Component from '../../templates/components';
import InputBox from './input';
import Label from './label';

const openEye = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="15px" height="15px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g id="Eye">
 <g>
   <path d="M16,8C7.028,8,0,11.515,0,16c0,4.486,7.028,8,16,8c8.973,0,16-3.514,16-8C32,11.515,24.973,8,16,8z M2,16
     c0-2.099,3.151-4.372,8.129-5.415C8.812,12.012,8,13.91,8,16s0.812,3.988,2.129,5.415C5.151,20.372,2,18.1,2,16z M16,22
     c-3.309,0-6-2.691-6-6c0-3.309,2.691-6,6-6c3.309,0,6,2.691,6,6C22,19.309,19.309,22,16,22z M21.871,21.415
     C23.188,19.988,24,18.09,24,16s-0.812-3.988-2.129-5.415C26.85,11.628,30,13.901,30,16C30,18.1,26.85,20.372,21.871,21.415z
      M16,13c-1.654,0-3,1.346-3,3c0,1.654,1.346,3,3,3c1.654,0,3-1.346,3-3C19,14.346,17.654,13,16,13z M16,17c-0.552,0-1-0.448-1-1
     c0-0.551,0.448-1,1-1s1,0.449,1,1C17,16.552,16.552,17,16,17z"/>
 </g>
</g>
</svg>`;
const closeEye = `<svg width="15px" height="15px" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 32 32" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M5.992,18.611l-2.679,2.682c-0.39,0.391 -0.39,1.024 0,1.414c0.391,0.391 1.025,0.39 1.415,-0l3.027,-3.031c2.098,1.149 4.577,2.094 7.249,2.288l0.016,4.04c0.002,0.552 0.452,0.998 1.004,0.996c0.552,-0.002 0.998,-0.452 0.996,-1.004l-0.016,-4.033c2.281,-0.166 4.421,-0.88 6.302,-1.8c0.002,0.002 0.004,0.004 0.007,0.006l3.533,3.538c0.391,0.39 1.024,0.391 1.415,0c0.39,-0.39 0.39,-1.023 0,-1.414l-3.126,-3.13c3.415,-2.063 5.61,-4.496 5.61,-4.496c0.368,-0.411 0.333,-1.043 -0.078,-1.412c-0.411,-0.368 -1.043,-0.333 -1.412,0.078c0,-0 -5.93,6.667 -13.255,6.667c-7.325,0 -13.255,-6.667 -13.255,-6.667c-0.369,-0.411 -1.001,-0.446 -1.412,-0.078c-0.411,0.369 -0.446,1.001 -0.078,1.412c0,0 1.826,2.024 4.737,3.944Z"/></svg>`;

class Form extends Component {
  inputLogin: InputBox;
  inputPassword: InputBox;
  submitBtn: HTMLButtonElement;
  regBtn: HTMLButtonElement;
  valid: boolean;
  private swithVisibilityPassword: HTMLButtonElement;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.inputLogin = new InputBox('input', 'form__input', 'email', 'login__input', 'Login', true);
    this.inputPassword = new InputBox('input', 'form__input', 'password', 'password__input', 'Password', true);

    this.swithVisibilityPassword = document.createElement('button');
    this.swithVisibilityPassword.type = 'button';
    this.swithVisibilityPassword.classList.add('switch-visibility__btn');
    this.swithVisibilityPassword.innerHTML = openEye;

    this.swithVisibilityPassword.addEventListener('click', (ev) => {
      ev.preventDefault();
      if (this.inputPassword.getType() === 'password') {
        this.inputPassword.setType('text');
        this.swithVisibilityPassword.innerHTML = closeEye;
      } else {
        this.inputPassword.setType('password');
        this.swithVisibilityPassword.innerHTML = openEye;
      }
    });

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

    passwordField.append(this.inputPassword.render(), this.swithVisibilityPassword, inputPasswordLabel.render());

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

      if (input.type === 'email') {
        return checkValidyInputEmail(input, label);
      }

      if (input.type === 'password' || input.id === 'password__input') {
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
