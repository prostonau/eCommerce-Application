import './style.scss';
import Page from '../core/templates/page';
import AppAPI from '../../controller/api';

class ProfilePage extends Page {
  static TextObject = {
    ProfileTitle: 'Profile page',
  };

  userId: string;
  API: AppAPI;
  firstName: string;
  lastName: string;
  birthDate: string;
  shipAddress: string;
  billAddress: string;

  constructor(id: string, userId: string) {
    super(id);
    this.userId = userId;
    this.API = new AppAPI();
    this.firstName = '';
    this.lastName = '';
    this.birthDate = '';
    this.shipAddress = '';
    this.billAddress = '';
  }

  async getUserData(userId: string) {
    await this.API.clientCredentialsFlow().then(async (response) => {
      await this.API.getCustomer(userId, response.access_token).then((response) => {
        console.log('Content response = ', response);
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.birthDate = response.dateOfBirth;
        this.shipAddress = response.shippingAddressIds.toString();
        this.billAddress = response.billingAddressIds.toString();
      });
    });
  }

  createUserInfoContainer() {
    const userInfoContainer = document.createElement('div');
    userInfoContainer.classList.add('profile');
    return userInfoContainer;
  }

  createProfileTitle() {
    const profileTitle = document.createElement('h2');
    profileTitle.classList.add('profile-title');
    profileTitle.textContent = 'About you';
    return profileTitle;
  }

  createUserFirstName() {
    const firstName = document.createElement('p');
    firstName.classList.add('profile__first-name');
    firstName.textContent = this.firstName;
    return firstName;
  }

  createUserLastName() {
    const lastName = document.createElement('p');
    lastName.classList.add('profile__last-name');
    lastName.textContent = this.lastName;
    return lastName;
  }

  createUserBirthDate() {
    const birthDate = document.createElement('p');
    birthDate.classList.add('proile__birthdate');
    birthDate.textContent = this.birthDate;
    return birthDate;
  }

  createShipAddress() {
    const shipAddress = document.createElement('p');
    shipAddress.classList.add('profile__ship-address');
    shipAddress.textContent = this.shipAddress;
    return shipAddress;
  }

  createBillAddress() {
    const billAddress = document.createElement('p');
    billAddress.classList.add('profile__ship-address');
    billAddress.textContent = this.billAddress;
    return billAddress;
  }

  render(): HTMLElement {
    this.getUserData(this.userId)
      .then(() => {
        const title = this.createHeaderTitle(ProfilePage.TextObject.ProfileTitle);
        const wrapper = this.createUserInfoContainer();
        wrapper.append(
          this.createUserFirstName(),
          this.createUserLastName(),
          this.createUserBirthDate(),
          this.createShipAddress(),
          this.createBillAddress()
        );
        this.container.append(title, wrapper);
      })
      .catch((error) => {
        console.error(error);
      });
    return this.container;
  }
}

export default ProfilePage;
