import { WinnerData } from '../../../types/index';
import { TrackData } from '../../../types/index';
import './table.css';

class Table {
    draw(data: Array<WinnerData>, cars: Array<TrackData>) {
        //console.log('cars2 = ', cars);
        const fragment = document.createDocumentFragment();
        const tableItemTemp = document.querySelector('#winnerLineTemp');
        // console.log('22here', data, id);
        let i = 1;
        data.forEach((item) => {
            const tableClone =
                tableItemTemp && tableItemTemp instanceof HTMLTemplateElement
                    ? tableItemTemp.content.cloneNode(true)
                    : null;

            if (tableClone && tableClone instanceof DocumentFragment) {
                (tableClone.querySelector('.winner-number') as HTMLElement).innerHTML = String(i);
                (tableClone.querySelector('.winner-id') as HTMLElement).innerHTML = String(item.id);
                // eslint-disable-next-line prettier/prettier
                (tableClone.querySelector('.winner-color') as HTMLElement).innerHTML = 
                    // eslint-disable-next-line prettier/prettier
              `<div class="car-icon" style='background-color:${String(
                        cars.filter((x) => x.id === item.id)[0].color
                    )}'></div>`;
                (tableClone.querySelector('.winner-car') as HTMLElement).innerHTML = String(
                    cars.filter((x) => x.id === item.id)[0].name
                );
                (tableClone.querySelector('.winner-times') as HTMLElement).innerHTML = String(item.wins);
                (tableClone.querySelector('.winner-best-time') as HTMLElement).innerHTML = String(item.time.toFixed(5));
                fragment.append(tableClone);
                i += 1;
                // console.log('here');
            }
        });

        (document.querySelector('.winner-table') as HTMLElement).innerHTML = `<tr class="winner-table header">
                                                                                <th>Number</th>
                                                                                <th><button class="sort-id">id</id></th>
                                                                                <th>Car</th>
                                                                                <th>Name</th>
                                                                                <th><button class="sort-wins">Wins</button></th>
                                                                                <th><button class="sort-time">Best time (sec)</button></th>
                                                                            </tr>`;
        (document.querySelector('.winner-table') as HTMLElement).append(fragment);
    }
}

export default Table;
