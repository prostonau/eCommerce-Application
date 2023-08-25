import MainPage from './main/index';
import RegistrationPage from './registration/index';
import LoginPage from './login/index';
// import Table from './table/table';

export class AppView {
  mainPage: MainPage;
  registrationPage: RegistrationPage;
  loginPage: RegistrationPage;
  constructor() {
    this.mainPage = new MainPage('Main page');
    this.registrationPage = new RegistrationPage('Registration page');
    this.loginPage = new LoginPage('Login page');
  }

  // drawNavigation(data: Array<Level>, currentLevel: number) {
  //     // console.log('appView.ts | drawNews = ', data);
  //     const values = data;
  //     this.levels.draw(values, currentLevel);
  // }

  // drawTable(data: Array<Level>, id: number) {
  //     // console.log('appView.ts | drawNews = ', data);
  //     const values = data;
  //     this.table.draw(values, id);
  // }

  // drawHtmlView(data: Array<Level>, id: number) {
  //     // console.log('appView.ts | drawNews = ', data);
  //     const values = data;
  //     this.html.draw(values, id);
  // }
}

export default AppView;
