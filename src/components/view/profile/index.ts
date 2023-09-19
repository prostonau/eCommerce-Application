import './style.scss';
import Page from '../core/templates/page';
import AppAPI from '../../controller/api';
import Form from '../core/components/form';
import { CustomerAddress } from '../../../types';

class ProfilePage extends Page {
  static TextObject = {
    ProfileTitle: 'Profile page',
  };

  userId: string;
  API: AppAPI;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  addresses: CustomerAddress[];

  constructor(id: string, userId: string) {
    super(id);
    this.userId = userId;
    this.API = new AppAPI();
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.birthDate = '';
    this.addresses = [];
  }

  async getUserData(userId: string) {
    await this.API.clientCredentialsFlow().then(async (response) => {
      await this.API.getCustomer(userId, response.access_token).then((response) => {
        console.log('Content response = ', response);
        this.email = response.email;
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.birthDate = response.dateOfBirth;
        this.addresses = response.addresses;
      });
    });
  }

  createFormSwitches() {
    const fragment = document.createDocumentFragment();

    const bioRadio = document.createElement('input');
    bioRadio.classList.add('radio__input');
    bioRadio.id = 'bio-radio';
    bioRadio.type = 'radio';
    bioRadio.name = 'form-switch';
    bioRadio.checked = true;
    // bioRadio.setAttribute('checked', 'checked');
    const bioLabel = document.createElement('label');
    bioLabel.classList.add('radio__label');
    bioLabel.setAttribute('for', 'bio-radio');
    bioLabel.textContent = 'Personal info';

    const passwordRadio = document.createElement('input');
    passwordRadio.classList.add('radio__input');
    passwordRadio.id = 'password-radio';
    passwordRadio.type = 'radio';
    passwordRadio.name = 'form-switch';
    const passwordLabel = document.createElement('label');
    passwordLabel.classList.add('radio__label');
    passwordLabel.setAttribute('for', 'password-radio');
    passwordLabel.textContent = 'Change password';

    const addressRadio = document.createElement('input');
    addressRadio.classList.add('radio__input');
    addressRadio.id = 'address-radio';
    addressRadio.type = 'radio';
    addressRadio.name = 'form-switch';
    const addressLabel = document.createElement('label');
    addressLabel.classList.add('radio__label');
    addressLabel.setAttribute('for', 'address-radio');
    addressLabel.textContent = 'Addresses';

    fragment.append(bioRadio, bioLabel, passwordRadio, passwordLabel, addressRadio, addressLabel);
    return fragment;
  }
  /* createUserInfoContainer() {
    const userInfoContainer = document.createElement('div');
    userInfoContainer.classList.add('profile');
    return userInfoContainer;
  }

  createBioData() {
    const fragment = document.createDocumentFragment();

    const firstName = document.createElement('p');
    firstName.classList.add('profile__first-name');
    firstName.textContent = this.firstName;

    const lastName = document.createElement('p');
    lastName.classList.add('profile__last-name');
    lastName.textContent = this.lastName;

    const birthDate = document.createElement('p');
    birthDate.classList.add('proile__birthdate');
    birthDate.textContent = this.birthDate;

    fragment.append(firstName, lastName, birthDate);
    return fragment;
  }

  createAddresses(i: number) {
    const fragment = document.createDocumentFragment();

    const country = document.createElement('p');
    country.classList.add('profile__country');
    country.textContent = this.addresses[i].country;

    const city = document.createElement('p');
    city.classList.add('profile__city');
    city.textContent = this.addresses[i].city;

    const street = document.createElement('p');
    street.classList.add('profile__street');
    street.textContent = this.addresses[i].streetName;

    const postCode = document.createElement('p');
    postCode.classList.add('profile__post');
    postCode.textContent = this.addresses[i].postalCode;

    fragment.append(country, city, street, postCode);
    return fragment;
  } */

  render(): HTMLElement {
    this.getUserData(this.userId)
      .then(() => {
        const title = this.createHeaderTitle(ProfilePage.TextObject.ProfileTitle);

        const updFormBio = new Form('form', 'bio__form');
        updFormBio.generateUpdateFormBio(this.userId, this.email, this.firstName, this.lastName, this.birthDate);

        const updFormPassword = new Form('form', 'password__form');
        updFormPassword.generateUpdateFormPassword(this.userId);

        this.container.append(title, this.createFormSwitches(), updFormBio.render(), updFormPassword.render());

        this.addresses.forEach((address) => {
          const updFormAddresses = new Form('form', 'addresses__form');
          updFormAddresses.generateUpdateFormAddresses(address);
          this.container.append(updFormAddresses.render());
        });
      })
      .catch((error) => {
        console.error(error);
      });
    return this.container;
  }
}

export default ProfilePage;
