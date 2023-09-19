import Component from '../../templates/components';

class CheckBox extends Component {
  constructor(tagName: string, className: string, id: string = '', checked: boolean = true) {
    super(tagName, className);
    this.container.id = id;
    if (this.container instanceof HTMLInputElement) {
      this.container.type = 'checkbox';
      this.container.checked = checked;
      this.container.autocomplete = '';
    }
  }

  render() {
    return this.container;
  }

  isChecked() {
    if (this.container instanceof HTMLInputElement && this.container.checked) {
      return true;
    }
    return '';
  }
}

export default CheckBox;
