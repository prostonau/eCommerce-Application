import './style.css';
import Page from '../core/templates/page';

export enum errorTypes {
  Error_404 = 404,
}

class ErrorPage extends Page {
  private errorType: errorTypes | string;

  static TextObject: { [prop: string]: string } = {
    '404': 'Error! We can not find this page',
  };

  constructor(id: string, errorType: errorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    const title = this.createHeaderTitle(ErrorPage.TextObject[this.errorType]);
    this.container.append(title);
    const comeBackContainer = document.createElement('div');
    comeBackContainer.className = 'comeBackContainer';
    const comeBackLink = document.createElement('a');
    comeBackLink.href = '/#main-page';
    comeBackLink.innerText = 'Lets start from the main page!';
    comeBackContainer.append(comeBackLink);
    this.container.append(comeBackContainer);

    return this.container;
  }
}

export default ErrorPage;
