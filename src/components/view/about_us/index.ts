import './style.scss';
import Page from '../core/templates/page';

class AboutUsPage extends Page {
  static TextObject = {
    MainTitle: 'About Us',
  };

  constructor(id: string) {
    super(id);
  }

  createProjectInfo() {
    const header = document.createElement('h2');
    header.classList.add('about-us__header');
    header.textContent = 'E-commerce application';

    const par1 = document.createElement('p');
    par1.classList.add('about-us__paragraph');
    par1.textContent = `Welcome to our eCommerce application! This platform replicates real-world shopping experiences in a digital environment 🏪.
    It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the
    application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.`;

    const par2 = document.createElement('p');
    par2.classList.add('about-us__paragraph');
    par2.textContent = `Users can browse through a vast range of products 📚👗👟, view detailed descriptions, add their favorite items to the basket 🛒,
    and proceed to checkout 💳. It includes features such as user registration and login 📝🔐, product search 🔍, product categorization, and sorting
    to make the shopping experience more streamlined and convenient.`;
  }

  render() {
    const title = this.createHeaderTitle(AboutUsPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default AboutUsPage;
