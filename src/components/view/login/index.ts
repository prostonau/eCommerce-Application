// import { WinnerData } from '../../../types/index';
import './style.css';
import Page from '../core/templates/page';

class LoginPage extends Page {
  static TextObject = {
    MainTitle: 'Login form',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(LoginPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default LoginPage;
