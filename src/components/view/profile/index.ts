import './style.scss';
import Page from '../core/templates/page';

class ProfilePage extends Page {
  static TextObject = {
    ProfileTitle: 'Profile page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(ProfilePage.TextObject.ProfileTitle);
    this.container.append(title);
    return this.container;
  }
}

export default ProfilePage;
