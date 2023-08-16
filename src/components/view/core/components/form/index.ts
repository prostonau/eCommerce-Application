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

    loginField.append(inputLogin.render(), inputLoginLabel.render());

    const passwordField = document.createElement('div');
    passwordField.classList.add('form__field');

    const inputPassword = new InputBox('input', 'form__input', 'password', 'password__input', 'Password', true);
    const inputPasswordLabel = new Label('label', 'form__label', 'password__input', '', 'Your password');

    passwordField.append(inputPassword.render(), inputPasswordLabel.render());

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('form__button');
    submitBtn.id = 'login';
    submitBtn.type = 'submit';
    submitBtn.innerHTML = 'Log in';

    form.append(loginField);
    form.append(passwordField);
    form.append(submitBtn);

    this.container.append(form);
  }

  generateRegistrationForm() {
    const form = document.createElement('form');
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
    const birthYearInput = new InputBox('input', 'form__input', 'text', 'birth-year__input', 'month', true);

    nameField.append(nameInput.render(), nameLabel.render());
    lastNameField.append(lastNameInput.render(), lastNameLabel.render());
    mailField.append(mailInput.render(), mailLabel.render());
    birthField.append(birthDateInput.render(), birthMonthInput.render(), birthYearInput.render());
  }

  render() {
    return this.container;
  }
}

export default Form;
