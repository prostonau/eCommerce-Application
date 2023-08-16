import Component from '../../templates/components';

class InputBox extends Component {
  constructor(
    tagName: string,
    className: string,
    type: string = 'text',
    id: string = '',
    placeholder: string = '',
    isRequired: boolean = false
  ) {
    super(tagName, className);
    this.container.id = id;
    if (this.container instanceof HTMLInputElement) {
      this.container.placeholder = placeholder;
      this.container.type = type;
      this.container.required = isRequired;
    }
  }

  render() {
    return this.container;
  }

  getValue() {
    if (this.container instanceof HTMLInputElement) {
      return this.container.value;
    }
    return '';
  }
}

export default InputBox;
