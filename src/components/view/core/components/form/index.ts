import AppAPI from '../../../../controller/api';
import { PageIds } from '../../../../controller/controller';
import Component from '../../templates/components';
import InputBox from '../../templates/input';
import Label from '../../templates/label';
import SelectBox from '../../templates/select';
import CheckBox from './checkbox';
import { Customer, CustomerAddress } from '../../../../../types/index';
import Eye from '../../templates/eye';
import APICartNau from '../../../../controller/apiCartNau';

class Form extends Component {
  api: AppAPI;
  inputLogin: InputBox;
  inputPassword: InputBox;
  inputOldPassword: InputBox;
  inputNewPassword: InputBox;
  nameInput: InputBox;
  lastNameInput: InputBox;
  birthInput: InputBox;
  streetInput: InputBox;
  cityInput: InputBox;
  postalInput: InputBox;
  countrySelect: SelectBox;
  billStreetInput: InputBox;
  billCityInput: InputBox;
  billPostalInput: InputBox;
  shipToggle: CheckBox;
  billToggle: CheckBox;
  sameToggle: CheckBox;
  submitBtn: HTMLButtonElement;
  regBtn: HTMLButtonElement;
  saveBtn: HTMLButtonElement;
  cancelBtn: HTMLButtonElement;
  editBtn: HTMLButtonElement;
  valid: boolean;
  switchVisibilityPassword: Eye;
  switchVisibilityPasswordCurrent: Eye;
  switchVisibilityPasswordNew: Eye;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.api = new AppAPI();
    this.inputLogin = new InputBox('input', 'form__input', 'text', 'login__input', '', true);
    this.inputPassword = new InputBox('input', 'form__input', 'password', 'password__input', '', true);
    this.inputOldPassword = new InputBox('input', 'form__input', 'password', 'old-password__input', '', true);
    this.inputNewPassword = new InputBox('input', 'form__input', 'password', 'new-password__input', '', true);
    this.nameInput = new InputBox('input', 'form__input', 'text', 'name__input', '', true);
    this.lastNameInput = new InputBox('input', 'form__input', 'text', 'last-name__input', '', true);
    this.birthInput = new InputBox('input', 'form__input', 'date', 'birth-date__input', '', true);
    this.streetInput = new InputBox('input', 'form__input', 'text', 'street__input', '', true);
    this.cityInput = new InputBox('input', 'form__input', 'text', 'city__input', '', true);
    this.postalInput = new InputBox('input', 'form__input', 'text', 'postal__input', '', true);
    this.countrySelect = new SelectBox('select', 'form__input', 'country__select', true);
    this.billStreetInput = new InputBox('input', 'form__input', 'text', 'bill-street__input', '', true);
    this.billCityInput = new InputBox('input', 'form__input', 'text', 'bill-city__input', '', true);
    this.billPostalInput = new InputBox('input', 'form__input', 'text', 'bill-postal__input', '', true);
    this.shipToggle = new CheckBox('input', 'form__toggle', 'ship__toggle', true);
    this.billToggle = new CheckBox('input', 'form__toggle', 'bill__toggle', true);
    this.sameToggle = new CheckBox('input', 'form__toggle', 'same__toggle', true);
    this.switchVisibilityPassword = new Eye('switch-visibility__btn', this.inputPassword);
    this.switchVisibilityPasswordCurrent = new Eye('switch-visibility__btn', this.inputOldPassword);
    this.switchVisibilityPasswordNew = new Eye('switch-visibility__btn', this.inputNewPassword);

    this.submitBtn = document.createElement('button');
    this.submitBtn.classList.add('form__button');
    this.submitBtn.id = 'login';
    this.submitBtn.type = 'submit';
    this.submitBtn.innerHTML = 'Log in';

    this.regBtn = document.createElement('button');
    this.regBtn.classList.add('form__button');
    this.regBtn.id = 'register';
    this.regBtn.type = 'submit';
    this.regBtn.innerHTML = 'Register';

    this.saveBtn = document.createElement('button');
    this.saveBtn.classList.add('form__button', 'save__button');
    this.saveBtn.type = 'submit';
    this.saveBtn.innerHTML = 'Save';

    this.cancelBtn = document.createElement('button');
    this.cancelBtn.classList.add('form__button', 'cancel__button');
    this.cancelBtn.type = 'submit';
    this.cancelBtn.innerHTML = 'Cancel';

    this.editBtn = document.createElement('button');
    this.editBtn.classList.add('form__button', 'edit__button');
    this.editBtn.innerHTML = 'Edit';

    this.valid = true;
  }

  generateLoginForm() {
    const form = this.container;
    form.classList.add('login__form');

    const loginField = document.createElement('div');
    loginField.classList.add('form__field');

    const passwordField = document.createElement('div');
    passwordField.classList.add('form__field');

    const inputLoginLabel = new Label('label', 'form__label', 'login__input', '', 'E-mail');
    const inputLoginValBox = document.createElement('p');
    inputLoginValBox.classList.add('validity__block');

    const inputPasswordLabel = new Label('label', 'form__label', 'password__input', '', 'Password');
    const inputPasswordValBox = document.createElement('p');
    inputPasswordValBox.classList.add('validity__block');

    loginField.append(inputLoginLabel.render(), this.inputLogin.render(), inputLoginValBox);
    passwordField.append(
      inputPasswordLabel.render(),
      this.inputPassword.render(),
      this.switchVisibilityPassword.render(),
      inputPasswordValBox
    );

    this.inputLogin.render().addEventListener('input', () => {
      this.checkValidyInput(this.inputLogin.render(), inputLoginValBox);
    });

    this.inputPassword.render().addEventListener('input', () => {
      this.checkValidyInput(this.inputPassword.render(), inputPasswordValBox);
    });

    form.append(loginField, passwordField, this.submitBtn);

    this.submitBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      if (this.inputLogin.render() instanceof HTMLInputElement) {
        if (
          this.checkValidyInput(this.inputLogin.render(), inputLoginLabel.render()) &&
          this.checkValidyInput(this.inputPassword.render(), inputPasswordLabel.render())
        ) {
          this.requestApiLogin(this.inputLogin.getValue(), this.inputPassword.getValue(), PageIds.MainPage);
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

    const streetField = document.createElement('div');
    streetField.classList.add('form__field', 'street__field');

    const postalField = document.createElement('div');
    postalField.classList.add('form__field', 'postal__field');

    const cityField = document.createElement('div');
    cityField.classList.add('form__field', 'city__field');

    const countryField = document.createElement('div');
    countryField.classList.add('form__field', 'country__field');

    const billStreetField = document.createElement('div');
    billStreetField.classList.add('form__field', 'bill-street__field', 'hidden');

    const billPostalField = document.createElement('div');
    billPostalField.classList.add('form__field', 'bill-postal__field', 'hidden');

    const billCityField = document.createElement('div');
    billCityField.classList.add('form__field', 'bill-city__field', 'hidden');

    const nameLabel = new Label('label', 'form__label', 'name__input', '', 'First Name');
    const nameValBox = document.createElement('p');
    nameValBox.classList.add('validity__block');

    const lastNameLabel = new Label('label', 'form__label', 'last-name__input', '', 'Last Name');
    const lastNameValBox = document.createElement('p');
    lastNameValBox.classList.add('validity__block');

    const mailLabel = new Label('label', 'form__label', 'mail__input', '', 'E-mail');
    const mailValBox = document.createElement('p');
    mailValBox.classList.add('validity__block');

    const passwordLabel = new Label('label', 'form__label', 'password__input', '', 'Password');
    const passwordValBox = document.createElement('p');
    passwordValBox.classList.add('validity__block');

    const birthLabel = new Label('label', 'form__label', 'birth-date__input', '', 'Birthdate');
    const birthValBox = document.createElement('p');
    birthValBox.classList.add('validity__block');

    const streetLabel = new Label('label', 'form__label', 'street__input', '', 'Street address and number');
    const streetValBox = document.createElement('p');
    streetValBox.classList.add('validity__block');

    const cityLabel = new Label('label', 'form__label', 'city__input', '', 'City');
    const cityValBox = document.createElement('p');
    cityValBox.classList.add('validity__block');

    const postalLabel = new Label('label', 'form__label', 'postal__input', '', 'Postal code');
    const postalValBox = document.createElement('p');
    postalValBox.classList.add('validity__block');

    this.countrySelect.addOptions('Country', 'Poland', 'Belarus', 'Lithuania');
    const countryLabel = new Label('label', 'form__label', 'country__input', '', 'Country');
    const countryValBox = document.createElement('p');
    countryValBox.classList.add('validity__block');

    const billStreetLabel = new Label('label', 'form__label', 'bill-street__input', '', 'Street address and number');
    const billStreetValBox = document.createElement('p');
    billStreetValBox.classList.add('validity__block');

    const billCityLabel = new Label('label', 'form__label', 'bill-city__input', '', 'City');
    const billCityValBox = document.createElement('p');
    billCityValBox.classList.add('validity__block');

    const billPostalLabel = new Label('label', 'form__label', 'bill-postal__input', '', 'Postal code');
    const billPostalValBox = document.createElement('p');
    billPostalValBox.classList.add('validity__block');

    //const shipToggleLabel = new Label('label', 'toggle__label', 'ship__toggle', '', 'Set as a default address');
    //const billToggleLabel = new Label('label', 'toggle__label', 'bill__toggle', '', 'Set as a default address');

    const shipToggleLabel = document.createElement('label');
    shipToggleLabel.classList.add('toggle__label');
    shipToggleLabel.setAttribute('for', 'ship__toggle');
    shipToggleLabel.textContent = 'Set as a default address';

    const billToggleLabel = document.createElement('label');
    billToggleLabel.classList.add('toggle__label', 'hidden');
    billToggleLabel.setAttribute('for', 'bill__toggle');
    billToggleLabel.textContent = 'Set as a default address';

    const sameToggleLabel = document.createElement('label');
    sameToggleLabel.classList.add('toggle__label');
    sameToggleLabel.setAttribute('for', 'same__toggle');
    sameToggleLabel.textContent = 'Use as a billing address';

    const personalHeader = document.createElement('h3');
    personalHeader.classList.add('field-group__header');
    personalHeader.textContent = 'Personal';

    const shipHeader = document.createElement('h3');
    shipHeader.classList.add('field-group__header');
    shipHeader.textContent = 'Shipping address';

    const credentialsHeader = document.createElement('h3');
    credentialsHeader.classList.add('field-group__header');
    credentialsHeader.textContent = 'Credentials';

    const billHeader = document.createElement('h3');
    billHeader.classList.add('field-group__header', 'hidden');
    billHeader.textContent = 'Billing address';

    this.inputLogin.render().addEventListener('input', () => {
      this.checkValidyInput(this.inputLogin.render(), mailValBox);
    });

    this.inputPassword.render().addEventListener('input', () => {
      this.checkValidyInput(this.inputPassword.render(), passwordValBox);
    });

    this.nameInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.nameInput.render(), nameValBox);
    });

    this.lastNameInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.lastNameInput.render(), lastNameValBox);
    });

    this.birthInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.birthInput.render(), birthValBox);
    });

    this.streetInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.streetInput.render(), streetValBox);
    });

    this.cityInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.cityInput.render(), cityValBox);
    });

    this.postalInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.postalInput.render(), postalValBox);
    });

    this.countrySelect.render().addEventListener('change', () => {
      this.checkValidyInput(this.postalInput.render(), postalValBox);
      this.checkValiditySelect(this.countrySelect.render(), countryValBox);
    });

    this.billStreetInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.billStreetInput.render(), billStreetValBox);
    });

    this.billCityInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.billCityInput.render(), billCityValBox);
    });

    this.billPostalInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.billPostalInput.render(), billPostalValBox);
    });

    this.sameToggle.render().addEventListener('input', () => {
      if (this.sameToggle.isChecked()) {
        billHeader.classList.add('hidden');
        billStreetField.classList.add('hidden');
        billCityField.classList.add('hidden');
        billPostalField.classList.add('hidden');
        billToggleLabel.classList.add('hidden');
      } else {
        billHeader.classList.remove('hidden');
        billStreetField.classList.remove('hidden');
        billCityField.classList.remove('hidden');
        billPostalField.classList.remove('hidden');
        billToggleLabel.classList.remove('hidden');
      }
    });

    this.regBtn.addEventListener('click', async (ev) => {
      ev.preventDefault();
      console.log('Click reg Btn... ');

      this.checkValidyInput(this.inputLogin.render(), mailValBox);
      this.checkValidyInput(this.inputPassword.render(), passwordValBox);
      this.checkValidyInput(this.nameInput.render(), nameValBox);
      this.checkValidyInput(this.lastNameInput.render(), lastNameValBox);
      this.checkValidyInput(this.birthInput.render(), birthValBox);
      this.checkValidyInput(this.streetInput.render(), streetValBox);
      this.checkValidyInput(this.cityInput.render(), cityValBox);
      this.checkValidyInput(this.postalInput.render(), postalValBox);
      this.checkValiditySelect(this.countrySelect.render(), countryValBox);
      this.checkValidyInput(this.billStreetInput.render(), billStreetValBox);
      this.checkValidyInput(this.billCityInput.render(), billCityValBox);
      this.checkValidyInput(this.billPostalInput.render(), billPostalValBox);
      if (
        this.checkValidyInput(this.inputLogin.render(), mailValBox) &&
        this.checkValidyInput(this.inputPassword.render(), passwordValBox) &&
        this.checkValidyInput(this.nameInput.render(), nameValBox) &&
        this.checkValidyInput(this.lastNameInput.render(), lastNameValBox) &&
        this.checkValidyInput(this.birthInput.render(), birthValBox) &&
        this.checkValidyInput(this.streetInput.render(), streetValBox) &&
        this.checkValidyInput(this.cityInput.render(), cityValBox) &&
        this.checkValidyInput(this.postalInput.render(), postalValBox) &&
        this.checkValiditySelect(this.countrySelect.render(), countryValBox)
      ) {
        console.log('We can add new user but we need to check on Server');
        console.log('email= ', (this.inputLogin.render() as HTMLInputElement).value);
        const email = (this.inputLogin.render() as HTMLInputElement).value;
        this.api.checkEmailbyAPI(email).then((response) => {
          console.log('email= ', email);
          console.log('response = ', response);
          if (response) {
            const email = (this.inputLogin.render() as HTMLInputElement).value;
            const password = (this.inputPassword.render() as HTMLInputElement).value;

            const customer: Customer = {
              email: email,
              firstName: (this.nameInput.render() as HTMLInputElement).value,
              lastName: (this.lastNameInput.render() as HTMLInputElement).value,
              password: password,
            };

            this.api.clientCredentialsFlow().then((response) => {
              console.log('response = ', response);
              this.api.createCustomer(response.access_token, customer).then(async (userInfo) => {
                const shortCountry = convertCountry((this.countrySelect.render() as HTMLInputElement).value);
                console.log('userInfo = ', userInfo);

                if (userInfo.customer.id) {
                  // 1.add address and get address ID
                  const actions1 = [
                    {
                      action: 'addAddress',
                      address: {
                        streetName: (this.streetInput.render() as HTMLInputElement).value,
                        postalCode: (this.postalInput.render() as HTMLInputElement).value,
                        city: (this.cityInput.render() as HTMLInputElement).value,
                        country: shortCountry,
                      },
                    },
                  ];

                  const answer1 = await this.api.updateCustomer(
                    response.access_token,
                    userInfo.customer.id,
                    userInfo.customer.version,
                    actions1
                  );
                  userInfo.customer.version++;
                  console.log('answer1 = ', answer1);
                  const copy1 = { ...answer1 };
                  const shippingAddressId = copy1.addresses.pop().id;
                  console.log('shippingAddressId= ', shippingAddressId);

                  // 2.DateOfBirth
                  const actions2 = [
                    {
                      action: 'setDateOfBirth',
                      dateOfBirth: (this.birthInput.render() as HTMLInputElement).value,
                    },
                  ];

                  const answer2 = await this.api.updateCustomer(
                    response.access_token,
                    userInfo.customer.id,
                    userInfo.customer.version,
                    actions2
                  );
                  userInfo.customer.version++;
                  console.log('answer2 = ', answer2);

                  // 3. add Shipping address
                  const actions3 = [
                    {
                      action: 'addShippingAddressId',
                      addressId: shippingAddressId,
                    },
                  ];
                  const answer3 = await this.api.updateCustomer(
                    response.access_token,
                    userInfo.customer.id,
                    userInfo.customer.version,
                    actions3
                  );
                  userInfo.customer.version++;
                  console.log('answer3 = ', answer3);

                  //4. setDefaultShippingAddress
                  if (this.shipToggle.isChecked()) {
                    const actions4 = [
                      {
                        action: 'setDefaultShippingAddress',
                        addressId: shippingAddressId,
                      },
                    ];
                    const answer4 = await this.api.updateCustomer(
                      response.access_token,
                      userInfo.customer.id,
                      userInfo.customer.version,
                      actions4
                    );
                    userInfo.customer.version++;
                    console.log('answer4 = ', answer4);
                  }

                  //5. If sameToggle = true
                  if (this.sameToggle.isChecked()) {
                    const actions5_1 = [
                      {
                        action: 'addBillingAddressId',
                        addressId: shippingAddressId,
                      },
                    ];
                    const answer5_1 = await this.api.updateCustomer(
                      response.access_token,
                      userInfo.customer.id,
                      userInfo.customer.version,
                      actions5_1
                    );
                    userInfo.customer.version++;
                    console.log('answer5_1 = ', answer5_1);

                    //5_2. setDefaultBillingAddress
                    if (this.shipToggle.isChecked()) {
                      const actions5_2 = [
                        {
                          action: 'setDefaultBillingAddress',
                          addressId: shippingAddressId,
                        },
                      ];
                      const answer5_2 = await this.api.updateCustomer(
                        response.access_token,
                        userInfo.customer.id,
                        userInfo.customer.version,
                        actions5_2
                      );
                      userInfo.customer.version++;
                      console.log('answer5_2 = ', answer5_2);
                    }
                    // 6. Add custom billing address
                  } else {
                    const actions6 = [
                      {
                        action: 'addAddress',
                        address: {
                          streetName: (this.billStreetInput.render() as HTMLInputElement).value,
                          postalCode: (this.billPostalInput.render() as HTMLInputElement).value,
                          city: (this.billCityInput.render() as HTMLInputElement).value,
                          country: shortCountry,
                        },
                      },
                    ];

                    const answer6 = await this.api.updateCustomer(
                      response.access_token,
                      userInfo.customer.id,
                      userInfo.customer.version,
                      actions6
                    );
                    userInfo.customer.version++;
                    console.log('answer6 = ', answer6);
                    const copy6 = { ...answer6 };
                    const billingAddressId = copy6.addresses.pop().id;
                    console.log('billingAddressId = ', billingAddressId);

                    // 7. setBillingAddressId
                    const actions7 = [
                      {
                        action: 'addBillingAddressId',
                        addressId: billingAddressId,
                      },
                    ];

                    const answer7 = await this.api.updateCustomer(
                      response.access_token,
                      userInfo.customer.id,
                      userInfo.customer.version,
                      actions7
                    );
                    userInfo.customer.version++;
                    console.log('answer7 = ', answer7);

                    // 8. setDefaultBillingAddress
                    if (this.billToggle.isChecked()) {
                      const actions8 = [
                        {
                          action: 'setDefaultBillingAddress',
                          addressId: billingAddressId,
                        },
                      ];
                      const answer8 = await this.api.updateCustomer(
                        response.access_token,
                        userInfo.customer.id,
                        userInfo.customer.version,
                        actions8
                      );
                      userInfo.customer.version++;
                      console.log('answer8 = ', answer8);
                    }
                  }
                }
                // в идеале по идеи нужны еще проверки что вернулся только статус 200

                this.showNotification('Вы успешно зарегистрировались и вошли в систему.');
                console.log('sucsess reg');
                console.log('logining ...)');
                this.requestApiLogin(email, password, PageIds.MainPage);
              });
            });
          } else {
            this.showNotification(`We already have user with this login = ${email}`);
          }
        });
      }
    });

    nameField.append(nameLabel.render(), this.nameInput.render(), nameValBox);
    lastNameField.append(lastNameLabel.render(), this.lastNameInput.render(), lastNameValBox);
    birthField.append(birthLabel.render(), this.birthInput.render(), birthValBox);
    streetField.append(streetLabel.render(), this.streetInput.render(), streetValBox);
    countryField.append(countryLabel.render(), this.countrySelect.render(), countryValBox);
    cityField.append(cityLabel.render(), this.cityInput.render(), cityValBox);
    postalField.append(postalLabel.render(), this.postalInput.render(), postalValBox);
    shipToggleLabel.prepend(this.shipToggle.render());
    sameToggleLabel.prepend(this.sameToggle.render());
    billStreetField.append(billStreetLabel.render(), this.billStreetInput.render(), billStreetValBox);
    billCityField.append(billCityLabel.render(), this.billCityInput.render(), billCityValBox);
    billPostalField.append(billPostalLabel.render(), this.billPostalInput.render(), billPostalValBox);
    billToggleLabel.prepend(this.billToggle.render());
    mailField.append(mailLabel.render(), this.inputLogin.render(), mailValBox);
    passwordField.append(
      passwordLabel.render(),
      this.inputPassword.render(),
      this.switchVisibilityPassword.render(),
      passwordValBox
    );

    form.append(
      personalHeader,
      nameField,
      lastNameField,
      birthField,
      shipHeader,
      streetField,
      countryField,
      cityField,
      postalField,
      shipToggleLabel,
      sameToggleLabel,
      billHeader,
      billStreetField,
      billCityField,
      billPostalField,
      billToggleLabel,
      credentialsHeader,
      mailField,
      passwordField,
      this.regBtn
    );
  }

  generateUpdateFormBio(
    userId: string,
    mailValue: string,
    firstNameValue: string,
    lastNameValue: string,
    birthValue: string
  ) {
    const form = this.container;
    form.classList.add('upd__form');

    const mailField = document.createElement('div');
    mailField.classList.add('form__field', 'email__field');

    const firstNameField = document.createElement('div');
    firstNameField.classList.add('form__field', 'first-name__field');

    const lastNameField = document.createElement('div');
    lastNameField.classList.add('form__field', 'last-name__field');

    const birthField = document.createElement('div');
    birthField.classList.add('form__field', 'birth__field');

    const addressField = document.createElement('div');
    addressField.classList.add('form__field', 'address__field');

    const mailLabel = new Label('label', 'form__label', 'mail__input', '', 'E-mail');
    const mailValBox = document.createElement('p');
    mailValBox.classList.add('validity__block');
    this.inputLogin.disabled();
    this.inputLogin.setValue(mailValue);
    this.inputLogin.render().addEventListener('input', () => {
      this.checkValidyInput(this.inputLogin.render(), mailValBox);
    });

    const firstNameLabel = new Label('label', 'form__label', 'name__input', '', 'First Name');
    const firstNameValBox = document.createElement('p');
    firstNameValBox.classList.add('validity__block');
    this.nameInput.disabled();
    this.nameInput.setValue(firstNameValue);
    this.nameInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.nameInput.render(), firstNameValBox);
    });

    const lastNameLabel = new Label('label', 'form__label', 'last-name__input', '', 'Last Name');
    const lastNameValBox = document.createElement('p');
    lastNameValBox.classList.add('validity__block');
    this.lastNameInput.disabled();
    this.lastNameInput.setValue(lastNameValue);
    this.lastNameInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.lastNameInput.render(), lastNameValBox);
    });

    const birthLabel = new Label('label', 'form__label', 'birth-date__input', '', 'Birthdate');
    const birthValBox = document.createElement('p');
    birthValBox.classList.add('validity__block');
    this.birthInput.disabled();
    this.birthInput.setValue(birthValue);
    this.birthInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.birthInput.render(), birthValBox);
    });

    this.saveBtn.classList.add('hidden');
    this.cancelBtn.classList.add('hidden');

    this.editBtn.addEventListener('click', () => {
      this.cancelBtn.classList.remove('hidden');
      this.saveBtn.classList.remove('hidden');
      this.editBtn.classList.add('hidden');
      this.birthInput.enabled();
      this.lastNameInput.enabled();
      this.nameInput.enabled();
      this.inputLogin.enabled();
    });

    this.cancelBtn.addEventListener('click', () => {
      this.cancelBtn.classList.add('hidden');
      this.saveBtn.classList.add('hidden');
      this.editBtn.classList.remove('hidden');
      this.birthInput.disabled();
      this.lastNameInput.disabled();
      this.nameInput.disabled();
      this.inputLogin.disabled();
    });

    this.saveBtn.addEventListener('click', async (ev) => {
      ev.preventDefault();
      this.checkValidyInput(this.inputLogin.render(), mailValBox);
      this.checkValidyInput(this.nameInput.render(), firstNameValBox);
      this.checkValidyInput(this.lastNameInput.render(), lastNameValBox);
      this.checkValidyInput(this.birthInput.render(), birthValBox);
      if (
        this.checkValidyInput(this.inputLogin.render(), mailValBox) &&
        this.checkValidyInput(this.nameInput.render(), firstNameValBox) &&
        this.checkValidyInput(this.lastNameInput.render(), lastNameValBox) &&
        this.checkValidyInput(this.birthInput.render(), birthValBox)
      ) {
        this.api.clientCredentialsFlow().then((response) => {
          this.api.getCustomer(userId, response.access_token).then(async (userInfo) => {
            if (userInfo.id) {
              const actions = [
                {
                  action: 'changeEmail',
                  email: (this.inputLogin.render() as HTMLInputElement).value,
                },
                {
                  action: 'setFirstName',
                  firstName: (this.nameInput.render() as HTMLInputElement).value,
                },
                {
                  action: 'setLastName',
                  lastName: (this.lastNameInput.render() as HTMLInputElement).value,
                },
                {
                  action: 'setDateOfBirth',
                  dateOfBirth: (this.birthInput.render() as HTMLInputElement).value,
                },
              ];

              await this.api.updateCustomer(response.access_token, userInfo.id, userInfo.version, actions);
              userInfo.version++;
            }
            this.showNotification('User data updated.');
          });
        });
      }
    });

    mailField.append(mailLabel.render(), this.inputLogin.render(), mailValBox);
    firstNameField.append(firstNameLabel.render(), this.nameInput.render(), firstNameValBox);
    lastNameField.append(lastNameLabel.render(), this.lastNameInput.render(), lastNameValBox);
    birthField.append(birthLabel.render(), this.birthInput.render(), birthValBox);

    form.append(mailField, firstNameField, lastNameField, birthField, this.cancelBtn, this.saveBtn, this.editBtn);
  }

  generateUpdateFormPassword(userId: string) {
    const form = this.container;
    form.classList.add('upd__form');

    const oldPasswordField = document.createElement('div');
    oldPasswordField.classList.add('form__field', 'old-password__field');

    const newPasswordField = document.createElement('div');
    newPasswordField.classList.add('form__field', 'new-password__field');

    const oldPasswordLabel = new Label('label', 'form__label', 'old-password__input', '', 'Current Password');
    const oldPasswordValBox = document.createElement('p');
    oldPasswordValBox.classList.add('validity__block');
    this.inputOldPassword.render().addEventListener('input', () => {
      this.checkValidyInput(this.inputOldPassword.render(), oldPasswordValBox);
    });

    const newPasswordLabel = new Label('label', 'form__label', 'new-password__input', '', 'New Password');
    const newPasswordValBox = document.createElement('p');
    newPasswordValBox.classList.add('validity__block');
    this.inputNewPassword.render().addEventListener('input', () => {
      this.checkValidyInput(this.inputNewPassword.render(), newPasswordValBox);
    });

    oldPasswordField.append(
      oldPasswordLabel.render(),
      this.inputOldPassword.render(),
      this.switchVisibilityPasswordCurrent.render(),
      oldPasswordValBox
    );
    newPasswordField.append(
      newPasswordLabel.render(),
      this.inputNewPassword.render(),
      this.switchVisibilityPasswordNew.render(),
      newPasswordValBox
    );

    this.saveBtn.addEventListener('click', async (ev) => {
      ev.preventDefault();
      const currPass = (this.inputOldPassword.render() as HTMLInputElement).value;
      const newPass = (this.inputNewPassword.render() as HTMLInputElement).value;

      this.checkValidyInput(this.inputOldPassword.render(), oldPasswordValBox);
      this.checkValidyInput(this.inputNewPassword.render(), newPasswordValBox);
      if (
        this.checkValidyInput(this.inputOldPassword.render(), oldPasswordValBox) &&
        this.checkValidyInput(this.inputNewPassword.render(), newPasswordValBox)
      ) {
        this.api.clientCredentialsFlow().then((response) => {
          this.api.getCustomer(userId, response.access_token).then(async (userInfo) => {
            this.api.passwordFlow(userInfo.email, currPass).then(async (data) => {
              if (typeof data === 'object' && data !== null && 'statusCode' in data) {
                this.showNotification('Wrong current password. Try again.');
              }
              if (typeof data === 'object' && data !== null && 'access_token' in data) {
                await this.api.changePassword(data.access_token, userInfo.id, userInfo.version, currPass, newPass);
                userInfo.version++;
                this.requestApiLogin(userInfo.email, newPass, PageIds.ProfilePage);
                this.showNotification('Password updated.');
              }
            });
          });
        });
      }
    });

    form.append(oldPasswordField, newPasswordField, this.cancelBtn, this.saveBtn);
  }

  generateUpdateFormAddresses(adresses: CustomerAddress) {
    const form = this.container;
    form.classList.add('upd__form');

    const countryField = document.createElement('div');
    countryField.classList.add('form__field', 'country__field');

    const streetField = document.createElement('div');
    streetField.classList.add('form__field', 'bill-street__field');

    const postalField = document.createElement('div');
    postalField.classList.add('form__field', 'bill-postal__field');

    const cityField = document.createElement('div');
    cityField.classList.add('form__field', 'bill-city__field');

    const streetLabel = new Label('label', 'form__label', 'street__input', '', 'Street address and number');
    const streetValBox = document.createElement('p');
    streetValBox.classList.add('validity__block');
    this.streetInput.disabled();
    this.streetInput.setValue(adresses.streetName);

    const cityLabel = new Label('label', 'form__label', 'city__input', '', 'City');
    const cityValBox = document.createElement('p');
    cityValBox.classList.add('validity__block');
    this.cityInput.disabled();
    this.cityInput.setValue(adresses.city);

    const postalLabel = new Label('label', 'form__label', 'postal__input', '', 'Postal code');
    const postalValBox = document.createElement('p');
    postalValBox.classList.add('validity__block');
    this.postalInput.disabled();
    this.postalInput.setValue(adresses.postalCode);

    this.countrySelect.addOptions('Country', 'Poland', 'Belarus', 'Lithuania');
    const countryLabel = new Label('label', 'form__label', 'country__input', '', 'Country');
    const countryValBox = document.createElement('p');
    countryValBox.classList.add('validity__block');

    this.streetInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.streetInput.render(), streetValBox);
    });

    this.cityInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.cityInput.render(), cityValBox);
    });

    this.postalInput.render().addEventListener('input', () => {
      this.checkValidyInput(this.postalInput.render(), postalValBox);
    });

    this.countrySelect.render().addEventListener('change', () => {
      this.checkValidyInput(this.postalInput.render(), postalValBox);
      this.checkValiditySelect(this.countrySelect.render(), countryValBox);
    });

    countryField.append(countryLabel.render(), this.countrySelect.render(), countryValBox);
    cityField.append(cityLabel.render(), this.cityInput.render(), cityValBox);
    streetField.append(streetLabel.render(), this.streetInput.render(), streetValBox);
    postalField.append(postalLabel.render(), this.postalInput.render(), postalValBox);

    form.append(countryField, cityField, streetField, postalField);
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

  checkValidyInput(input: HTMLElement, box: HTMLElement): boolean {
    if (input instanceof HTMLInputElement) {
      if (input.value === '') {
        box.innerText = 'Required field';
        box.classList.add('wrong__input');
        return false;
      }

      if (input.id === 'login__input') {
        return checkValidyInputEmail(input, box);
      }

      if (input.type === 'password' || input.id === 'password__input') {
        return checkValidyInputPassword(input, box);
      }

      if (
        input.id === 'name__input' ||
        input.id === 'last-name__input' ||
        input.id === 'city__input' ||
        input.id === 'bill-city__input'
      ) {
        return this.checkValidityInputName(input, box);
      }

      if (input.type === 'date' || input.id === 'birth-date__input') {
        return this.checkValidityInputBirthDate(input, box);
      }

      if (input.id === 'street__input' || input.id === 'bill-street__input') {
        return this.checkValidityInputStreet(input, box);
      }

      if (input.id === 'postal__input' || input.id === 'bill-postal__input') {
        return this.checkValidityInputPostalCode(input, box);
      }
    }
    box.classList.remove('wrong__input');
    box.innerText = '';
    return true;
  }

  checkValiditySelect(select: HTMLElement, box: HTMLElement): boolean {
    if (select instanceof HTMLSelectElement) {
      if (select.value === 'Country') {
        box.innerText = 'Required field';
        box.classList.add('wrong__input');
        return false;
      }
    }
    box.classList.remove('wrong__input');
    box.innerText = '';
    return true;
  }

  private checkValidityInputName(input: HTMLInputElement, box: HTMLElement): boolean {
    const name = input.value;
    if (/^\s*$/.test(name)) {
      box.innerText = 'The field must contain at least one character';
      box.classList.add('wrong__input');
      return false;
    } else if (/[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/.test(name)) {
      box.innerText = 'The field must not contain special characters';
      box.classList.add('wrong__input');
      return false;
    } else if (/\d/.test(name)) {
      box.innerText = 'The field must not contain digits (0-9)';
      box.classList.add('wrong__input');
      return false;
    }
    box.classList.remove('wrong__input');
    box.innerText = '';
    return true;
  }

  private checkValidityInputBirthDate(input: HTMLInputElement, box: HTMLElement): boolean {
    const birthDate = new Date(input.value.replace(/(..)\/(..)\/(....)/, '$3-$2-$1'));
    const thirteenYearsAgo = new Date();
    thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
    if (birthDate >= thirteenYearsAgo) {
      box.innerText = 'You should be at least 13 y.o.';
      box.classList.add('wrong__input');
      return false;
    }
    box.classList.remove('wrong__input');
    box.innerText = '';
    return true;
  }

  private checkValidityInputStreet(input: HTMLInputElement, box: HTMLElement): boolean {
    const street = input.value;
    if (/^\s*$/.test(street)) {
      box.innerText = 'The field must contain at least one character';
      box.classList.add('wrong__input');
      return false;
    }
    box.classList.remove('wrong__input');
    box.innerText = '';
    return true;
  }

  private checkValidityInputPostalCode(input: HTMLInputElement, box: HTMLElement): boolean {
    const code = input.value;
    const selectedCountry = this.countrySelect.getValue();
    if (selectedCountry === 'Belarus' && !/^2\d{5}$/.test(code)) {
      box.innerText = 'Invalid postal code format for Belarus';
      box.classList.add('wrong__input');
      return false;
    } else if (selectedCountry === 'Poland' && !/^\d{2}-\d{3}$/.test(code)) {
      box.innerText = 'Invalid postal code format for Poland';
      box.classList.add('wrong__input');
      return false;
    } else if (selectedCountry === 'Lithuania' && !/^(LT-)?\d{5}$/.test(code)) {
      box.innerText = 'Invalid postal code format for Lithuania';
      box.classList.add('wrong__input');
      return false;
    }
    box.classList.remove('wrong__input');
    box.innerText = '';
    return true;
  }

  private async requestApiLogin(login: string, password: string, page: PageIds) {
    // const api = new AppAPI();
    // await console.log(api.passwordFlow('johndo13e@example.com', 'secret123'));
    try {
      const data = await this.api.passwordFlow(login, password);
      console.log(login, password, 'datalog==', data);

      if (typeof data === 'object' && data !== null && 'statusCode' in data) {
        const status = data.statusCode;
        console.log('Неверный логин или пароль', status);
        this.showNotification('Неверный логин или пароль. Просьба проверить данные.');
      }

      if (typeof data === 'object' && data !== null && 'access_token' in data) {
        const token: string = typeof data.access_token === 'string' ? data.access_token : '';
        localStorage.setItem('token', token);
        data.expires_in_date = new Date(+new Date() + data.expires_in * 1000);
        localStorage.setItem('userData', JSON.stringify(data));
        await APICartNau.duplicateCart(token);
        if (page === PageIds.MainPage) {
          this.showNotification('Вы успешно вошли.', true);
        }
        console.log('sucsess');
        window.location.hash = page;
      }
    } catch (error) {
      this.showNotification('Произошла ошибка, попробуйте еще раз.');
      console.error('Произошла ошибка, попробуйте еще раз', error);
    }
  }
}

export function checkValidyInputEmail(input: HTMLInputElement, box: HTMLElement): boolean {
  const dotIndex = input.value.lastIndexOf('.');
  if (!input.value.includes('@')) {
    box.innerText = 'E-mail must contain "@"';
    box.classList.add('wrong__input');
    return false;
  } else if (input.value.includes(' ')) {
    box.innerText = "E-mail can't contain spaces";
    box.classList.add('wrong__input');
    return false;
  } else if (input.value.indexOf('@') === input.value.length - 1) {
    box.innerText = 'E-mail must have domain';
    box.classList.add('wrong__input');
    return false;
  } else if (dotIndex === -1 || dotIndex < input.value.indexOf('@') || dotIndex === input.value.length - 1) {
    box.innerText = 'E-mail must have domain';
    box.classList.add('wrong__input');
    return false;
  }
  box.classList.remove('wrong__input');
  box.innerText = '';
  return true;
}

export function checkValidyInputPassword(input: HTMLInputElement, box: HTMLElement): boolean {
  const password = input.value;
  if (password.length < 8) {
    box.innerText = 'Password must be 8+ characters';
    box.classList.add('wrong__input');
    return false;
  } else if (password.includes(' ')) {
    box.innerText = "Password can't contain spaces";
    box.classList.add('wrong__input');
    return false;
  } else if (!/[A-Z]/.test(password)) {
    box.innerText = 'Password must contain at least one uppercase letter (A-Z)';
    box.classList.add('wrong__input');
    return false;
  } else if (!/[a-z]/.test(password)) {
    box.innerText = 'Password must contain at least one lowercase letter (a-z)';
    box.classList.add('wrong__input');
    return false;
  } else if (!/\d/.test(password)) {
    box.innerText = 'Password must contain at least one digit (0-9)';
    box.classList.add('wrong__input');
    return false;
  } else if (!/[!@#$%^&*]/.test(password)) {
    box.innerText = 'Password must contain at least one special character (e.g., !@#$%^&*)';
    box.classList.add('wrong__input');
    return false;
  }
  box.classList.remove('wrong__input');
  box.innerText = '';
  return true;
}

export function convertCountry(country: string): string {
  switch (country) {
    case 'Poland':
      return 'PL';
    case 'Belarus':
      return 'BY';
    case 'Lithuania':
      return 'LT';
    default:
      return 'PL';
  }
}

export default Form;
