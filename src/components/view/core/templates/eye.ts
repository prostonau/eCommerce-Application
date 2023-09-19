import Component from './components';
import InputBox from './input';

class Eye extends Component {
  constructor(className: string, hidInput: InputBox) {
    super('button', className);
    if (this.container instanceof HTMLButtonElement) {
      const openEye = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="15px" height="15px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
      <g id="Eye">
      <g>
        <path d="M16,8C7.028,8,0,11.515,0,16c0,4.486,7.028,8,16,8c8.973,0,16-3.514,16-8C32,11.515,24.973,8,16,8z M2,16
          c0-2.099,3.151-4.372,8.129-5.415C8.812,12.012,8,13.91,8,16s0.812,3.988,2.129,5.415C5.151,20.372,2,18.1,2,16z M16,22
          c-3.309,0-6-2.691-6-6c0-3.309,2.691-6,6-6c3.309,0,6,2.691,6,6C22,19.309,19.309,22,16,22z M21.871,21.415
          C23.188,19.988,24,18.09,24,16s-0.812-3.988-2.129-5.415C26.85,11.628,30,13.901,30,16C30,18.1,26.85,20.372,21.871,21.415z
            M16,13c-1.654,0-3,1.346-3,3c0,1.654,1.346,3,3,3c1.654,0,3-1.346,3-3C19,14.346,17.654,13,16,13z M16,17c-0.552,0-1-0.448-1-1
          c0-0.551,0.448-1,1-1s1,0.449,1,1C17,16.552,16.552,17,16,17z"/>
      </g>
      </g>
      </svg>`;
      const closeEye = `<svg width="15px" height="15px" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 32 32" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M5.992,18.611l-2.679,2.682c-0.39,0.391 -0.39,1.024 0,1.414c0.391,0.391 1.025,0.39 1.415,-0l3.027,-3.031c2.098,1.149 4.577,2.094 7.249,2.288l0.016,4.04c0.002,0.552 0.452,0.998 1.004,0.996c0.552,-0.002 0.998,-0.452 0.996,-1.004l-0.016,-4.033c2.281,-0.166 4.421,-0.88 6.302,-1.8c0.002,0.002 0.004,0.004 0.007,0.006l3.533,3.538c0.391,0.39 1.024,0.391 1.415,0c0.39,-0.39 0.39,-1.023 0,-1.414l-3.126,-3.13c3.415,-2.063 5.61,-4.496 5.61,-4.496c0.368,-0.411 0.333,-1.043 -0.078,-1.412c-0.411,-0.368 -1.043,-0.333 -1.412,0.078c0,-0 -5.93,6.667 -13.255,6.667c-7.325,0 -13.255,-6.667 -13.255,-6.667c-0.369,-0.411 -1.001,-0.446 -1.412,-0.078c-0.411,0.369 -0.446,1.001 -0.078,1.412c0,0 1.826,2.024 4.737,3.944Z"/></svg>`;

      this.container.type = 'button';
      this.container.innerHTML = openEye;

      this.container.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (hidInput.getType() === 'password') {
          hidInput.setType('text');
          this.container.innerHTML = closeEye;
        } else {
          hidInput.setType('password');
          this.container.innerHTML = openEye;
        }
      });
    }
  }

  render() {
    return this.container;
  }
}

export default Eye;
