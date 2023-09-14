import './style.scss';
import Page from '../core/templates/page';
// import artur from './images/aarrttuurr.png';
// import george from './images/Ge1orge.png';
// import andrey from './images/prostonau.png';

class AboutUsPage extends Page {
  static TextObject = {
    MainTitle: 'About Us',
  };

  constructor(id: string) {
    super(id);
  }

  createProjectInfo() {
    const section = document.createElement('section');
    section.classList.add('about-us__section');

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

    section.append(header, par1, par2);
    return section;
  }

  createTeamMemberCard(imgSrc: string, membName: string, membRole: string, gitName: string, membInfo: string) {
    const container = document.createElement('div');
    container.classList.add('member__card');

    const img = document.createElement('img');
    img.classList.add('member__image');
    img.alt = 'team member photo';
    img.src = imgSrc;

    const name = document.createElement('h2');
    name.classList.add('member__name');
    name.textContent = membName;

    const role = document.createElement('h3');
    role.classList.add('member__role');
    role.textContent = membRole;

    const info = document.createElement('p');
    info.classList.add('member__info');
    info.textContent = membInfo;

    const github = document.createElement('a');
    github.classList.add('member__github');
    github.textContent = gitName;
    github.href = `https://github.com/${gitName}`;

    container.append(img, name, role, info, github);
    return container;
  }

  render() {
    const title = this.createHeaderTitle(AboutUsPage.TextObject.MainTitle);

    const memberSection = document.createElement('section');
    memberSection.classList.add('about-us__section');

    const georg = this.createTeamMemberCard(
      './images/Ge1orge.png',
      'Georgii Khvastunov',
      'Frontend developer',
      'Ge1o1Ge',
      `Georgii is a...`
    );

    const andrey = this.createTeamMemberCard(
      './images/prostonau.png',
      'Andrey Kamenshchikov',
      'Lead, Frontend developer',
      'prostonau',
      `Andrey is a...`
    );

    const artur = this.createTeamMemberCard(
      './images/aarrttuurr.png',
      'Artur Kandaurau',
      'Frontend developer',
      'aarrttuurr',
      `Artur is a...`
    );
    memberSection.append(georg, andrey, artur);
    this.container.append(title, this.createProjectInfo(), memberSection);
    return this.container;
  }
}

export default AboutUsPage;
