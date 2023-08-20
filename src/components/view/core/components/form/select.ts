import Component from '../../templates/components';

class SelectBox extends Component {
  constructor(tagName: string, className: string, id: string = '', isRequired: boolean = false) {
    super(tagName, className);
    this.container.id = id;
    if (this.container instanceof HTMLSelectElement) {
      this.container.required = isRequired;
      this.container.autocomplete = 'true';
    }
  }

  render() {
    return this.container;
  }

  getValue() {
    if (this.container instanceof HTMLSelectElement) {
      return this.container.value;
    }
    return '';
  }

  addOptions(...options: string[]) {
    for (const val of options) {
      const option = document.createElement('option');
      option.value = val;
      option.textContent = val;
      this.container.append(option);
    }
  }
}

export default SelectBox;
