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

    loginField.append(this.inputLogin.render(), inputLoginLabel.render());

    const passwordField = document.createElement('div');
    passwordField.classList.add('form__field');

    const inputPasswordLabel = new Label('label', 'form__label', 'password__input', '', 'Your password');

    passwordField.append(this.inputPassword.render(), inputPasswordLabel.render());

    this.submitBtn.classList.add('form__button');
    this.submitBtn.id = 'login';
    this.submitBtn.type = 'submit';
    this.submitBtn.innerHTML = 'Log in';

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
}

export default Form;
