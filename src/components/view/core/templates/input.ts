import Component from './components';

class InputBox extends Component {
  constructor(
    tagName: string,
    className: string,
    type: string = 'text',
    id: string = '',
    value: string = '',
    isRequired: boolean = false
  ) {
    super(tagName, className);
    this.container.id = id;
    if (this.container instanceof HTMLInputElement) {
      this.container.value = value;
      this.container.type = type;
      this.container.required = isRequired;
      this.container.autocomplete = 'true';
    }
  }

  render() {
    return this.container;
  }

  getType() {
    if (this.container instanceof HTMLInputElement) {
      return this.container.type;
    }
    return '';
  }

  getValue() {
    if (this.container instanceof HTMLInputElement) {
      return this.container.value;
    }
    return '';
  }

  setValue(val: string) {
    if (this.container instanceof HTMLInputElement) {
      this.container.value = val;
    }
  }

  setType(typeText: string) {
    if (this.container instanceof HTMLInputElement) {
      this.container.type = typeText;
    }
  }
}

export default InputBox;
