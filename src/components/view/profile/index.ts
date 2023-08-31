import './style.scss';
import Page from '../core/templates/page';
import AppAPI from '../../controller/api';
import { CustomerAddress } from '../../../types';

class ProfilePage extends Page {
  static TextObject = {
    ProfileTitle: 'Profile page',
  };

  userId: string;
  API: AppAPI;
  firstName: string;
  lastName: string;
  birthDate: string;
  /* shipCountry: string;
  shipCity: string;
  shipPostCode: string;
  shipStreet: string;
  billCountry: string;
  billCity: string;
  billPostCode: string;
  billStreet: string; */
  addresses: CustomerAddress[];

  constructor(id: string, userId: string) {
    super(id);
    this.userId = userId;
    this.API = new AppAPI();
    this.firstName = '';
    this.lastName = '';
    this.birthDate = '';
    /* this.shipCountry = '';
    this.shipCity = '';
    this.shipPostCode = '';
    this.shipStreet = '';
    this.billCountry = '';
    this.billCity = '';
    this.billPostCode = '';
    this.billStreet = ''; */
    this.addresses = [];
  }

  async getUserData(userId: string) {
    await this.API.clientCredentialsFlow().then(async (response) => {
      await this.API.getCustomer(userId, response.access_token).then((response) => {
        console.log('Content response = ', response);
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.birthDate = response.dateOfBirth;
        this.addresses = response.addresses;
        /* this.shipCountry = response.addresses[0].country;
        this.shipCity = response.addresses[0].city;
        this.shipPostCode = response.addresses[0].postalCode;
        this.shipStreet = response.addresses[0].streetName;
        this.billCountry = response.addresses[1].country;
        this.billCity = response.addresses[1].city;
        this.billPostCode = response.addresses[1].postalCode;
        this.billStreet = response.addresses[1].streetName; */
      });
    });
  }

  createUserInfoContainer() {
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
  }

  render(): HTMLElement {
    this.getUserData(this.userId)
      .then(() => {
        const title = this.createHeaderTitle(ProfilePage.TextObject.ProfileTitle);
        const wrapper = this.createUserInfoContainer();
        wrapper.append(this.createBioData(), this.createAddresses(0));
        if (this.addresses[1]) {
          wrapper.append(this.createAddresses(1));
        }
        this.container.append(title, wrapper);
      })
      .catch((error) => {
        console.error(error);
      });
    return this.container;
  }
}

export default ProfilePage;
