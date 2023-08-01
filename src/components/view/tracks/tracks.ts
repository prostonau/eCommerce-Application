import { TrackData } from '../../../types/index';
import './tracks.css';

class Tracks {
    activeCar: number;
    constructor() {
        this.activeCar = 1;
    }
    drawTracks(data: Array<TrackData>) {
        const fragment = document.createDocumentFragment();
        const htmlItemTemp = document.querySelector('#trackItemTemp');
        // console.log('33here', data, id);
        data.forEach((item) => {
            // const text = `<div class="table">\n${item.boardMarkup}\n</div>`.replace(/\t/g, '   ');
            const htmlClone =
                htmlItemTemp && htmlItemTemp instanceof HTMLTemplateElement
                    ? htmlItemTemp.content.cloneNode(true)
                    : null;

            if (htmlClone && htmlClone instanceof DocumentFragment) {
                (htmlClone.querySelector('.car-name-show') as HTMLElement).innerText = `${item.id} - ${item.name}`;
                (htmlClone.querySelector('.car-icon') as HTMLElement).style.background = item.color;
                (htmlClone.querySelector('.track') as HTMLElement).setAttribute('id', item.id.toString());
                (htmlClone.querySelector('.select-car') as HTMLElement).setAttribute('secretId', item.id.toString());
                (htmlClone.querySelector('.remove-car') as HTMLElement).setAttribute('secretId', item.id.toString());
                (htmlClone.querySelector('.start') as HTMLElement).setAttribute('secretId', item.id.toString());
                (htmlClone.querySelector('.stop') as HTMLElement).setAttribute('secretId', item.id.toString());
                (htmlClone.querySelector('.stop') as HTMLButtonElement).disabled = true;
                (htmlClone.querySelector('.car-icon') as HTMLElement).setAttribute('secretId', item.id.toString());
                (htmlClone.querySelector('.select-car') as HTMLElement).addEventListener('click', () => {
                    this.activeCar = item.id;
                    console.log('this.activeCar = ', this.activeCar);
                    (document.querySelector('.ourID') as HTMLElement).innerHTML = String(this.activeCar);
                    // settings.selectedCarID = item.name;
                    const ourCar = document.getElementById('inputUpdateField') as HTMLInputElement;
                    if (ourCar) {
                        ourCar.value = item.name;
                    }
                    const ourCarColor = document.getElementById('colorPickerUpd') as HTMLInputElement;
                    if (ourCarColor) {
                        ourCarColor.value = item.color;
                    }
                });
                fragment.append(htmlClone);
                // console.log('here');
            }
        });

        (document.querySelector('.garage-content') as HTMLElement).innerHTML = '';
        (document.querySelector('.garage-content') as HTMLElement).append(fragment);
    }
}

export default Tracks;
