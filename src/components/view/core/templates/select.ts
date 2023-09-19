import Component from './components';

class SelectBox extends Component {
  constructor(tagName: string, className: string, id: string = '', isRequired: boolean = false) {
    super(tagName, className);
    this.container.id = id;
    if (this.container instanceof HTMLSelectElement) {
      this.container.required = isRequired;
      this.container.autocomplete = '';
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

  addOptions(text: string, ...options: string[]) {
    const holder = document.createElement('option');
    holder.setAttribute('selected', '');
    holder.setAttribute('disabled', '');
    holder.textContent = text;
    this.container.append(holder);
    for (const val of options) {
      const option = document.createElement('option');
      option.value = val;
      option.textContent = val;
      if (option.value === '' && text !== 'sort') {
        option.textContent = 'Show all';
      } else if (option.value === '' && text === 'sort') {
        option.textContent = 'Unsorted';
      }
      this.container.append(option);
    }
  }
}

export default SelectBox;
