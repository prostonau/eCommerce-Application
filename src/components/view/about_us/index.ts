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
    const section = document.createElement('section');
    section.classList.add('about-us__section');

    const header = document.createElement('h2');
    header.classList.add('about-us__header');
    header.textContent = 'eCommerce application';

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

    const catSvg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';

    const githubIcon = document.createElement('span');
    githubIcon.classList.add('git-hub-icon');
    githubIcon.innerHTML = catSvg;
    githubIcon.style.fill = '#64baba';

    const github = document.createElement('a');
    github.classList.add('member__github');
    github.append(githubIcon, gitName);
    github.href = `https://github.com/${gitName}`;

    container.append(img, name, role, github, info);
    return container;
  }

  createRSLogo() {
    const rsLink = document.createElement('a');
    rsLink.href = 'https://rs.school/js';

    const rsLogo = document.createElement('img');
    rsLogo.classList.add('school-logo');
    rsLogo.alt = 'rs-school';
    rsLogo.src = './images/rs_school_js.svg';

    rsLink.append(rsLogo);
    return rsLink;
  }

  render() {
    const title = this.createHeaderTitle(AboutUsPage.TextObject.MainTitle);

    const memberSection = document.createElement('section');
    memberSection.classList.add('about-us__section');

    const memberContainer = document.createElement('div');
    memberContainer.classList.add('member__container');

    const teamHeader = document.createElement('h2');
    teamHeader.classList.add('about-us__header');
    teamHeader.textContent = 'eCommerce application team';

    const georg = this.createTeamMemberCard(
      './images/Ge1orge.png',
      'Georgii Khvastunov',
      'Frontend developer',
      'Ge1o1Ge',
      `Georgii is valuable member of team who played key role in project.
      He is responsible for developing simple user-friendly product-page 
      interface with image slider and detailed product info. Georgii implemented 
      product search and form validation methods. He was in carge of project test coverage.
      His reasonable and creative approach in solving sprint issues helped team to reduce
      development time.`
    );

    const andrey = this.createTeamMemberCard(
      './images/prostonau.png',
      'Andrey Kamenshchikov',
      'Lead, Frontend developer',
      'prostonau',
      `Andrey is a purposeful developer who aims to implement a well-thought structure and
      correct division of the application into modules. He is team-lead, Jira manager,
      repo creator. Andrey laid the basis of the project by implementing app arcitecture according to the 
      MVC pattern. Also he is responsible for routing, catalog page, user cart. Andrey hold
      meetings in which our team delegated sprint tasks and discussed its implementation approaches.`
    );

    const artur = this.createTeamMemberCard(
      './images/aarrttuurr.png',
      'Artur Kandaurau',
      'Frontend developer',
      'aarrttuurr',
      `Artur is an important part of the team who was engaged in the creation of user-info parts of
      application. He implement user-friendly interface of registration page with form data validation,
      informative Profile page with clear personal data editor. Also Artur developed About us page.`
    );
    memberContainer.append(georg, andrey, artur);
    memberSection.append(teamHeader, memberContainer);
    this.container.append(title, this.createProjectInfo(), memberSection, this.createRSLogo());
    return this.container;
  }
}

export default AboutUsPage;
