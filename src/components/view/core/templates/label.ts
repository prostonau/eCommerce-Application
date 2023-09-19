import Component from './components';

class Label extends Component {
  constructor(tagName: string, className: string, typeFor: string = '', id: string = '', value: string = '') {
    super(tagName, className);
    this.container.id = id;
    this.container.setAttribute('for', typeFor);
    this.container.innerHTML = value;
  }

  render() {
    return this.container;
  }
}

export default Label;
