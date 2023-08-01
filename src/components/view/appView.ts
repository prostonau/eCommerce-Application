import Tracks from './tracks/tracks';
import Table from './table/table';

export class AppView {
    tracks: Tracks;
    table: Table;
    // html: Html;
    constructor() {
        this.tracks = new Tracks();
        this.table = new Table();
        // this.html = new Html();
    }

    // showMessage(text: string) {
    //     // console.log('showMessage = ', text);
    //     const message = document.createElement('div');
    //     message.setAttribute('id', 'popup');
    //     message.style.position = 'fixed';
    //     message.style.top = '50%';
    //     message.style.left = '50%';
    //     message.style.transform = 'translate(-50%, -50%)';
    //     message.style.padding = '10px';
    //     message.style.color = '#000';
    //     message.style.background = 'white';
    //     message.style.color = 'red';
    //     message.style.border = '2px solid #000';
    //     message.style.borderRadius = '5px';
    //     message.style.zIndex = '9999';
    //     message.textContent = text;
    //     document.body.appendChild(message);
    //     setTimeout(function () {
    //         message.remove();
    //     }, 60000);
    // }

    // reDrawRaceREsetButtons() {
    //     const mainControlPanel = document.querySelector('.main-control-panel');
    //     if (mainControlPanel) {
    //         mainControlPanel.innerHTML = '';
    //         mainControlPanel.innerHTML = `<button class="menu-button race">RACE</button>
    //         <button class="menu-button reset" disabled>RESET</button>
    //         <button class="menu-button generate">GENERATE CARS</button>`;
    //     }
    // }

    // drawBody() {
    //     document.body.innerHTML = ` <header>
    //     <h1>Async-race</h1>
    //     <nav class="navigation">
    //         <button class="menu-button" id="garage">TO GARAGE</button>
    //         <button class="menu-button" id="winners">TO WINNERS</button>
    //     </nav>
    // </header>
    // <main>
    //     <div class="wrapper" id="contentGarage">
    //         <section class="editor">
    //             <div class="new-car">
    //                 <form class="new-car__form">
    //                     <input class='car-name' type="text" id="inputCreateField" name="inputCreateField">
    //                     <input type="color" id="colorPickerCre" name="colorPicker" value="#ffffff">
    //                     <input type="submit" value="CREATE">
    //                 </form>
    //             </div>
    //             <div class="update-car">
    //                 <form class="update-car__form">
    //                     <input class='car-name' type="text" id="inputUpdateField" name="inputUpdateField">
    //                     <input type="color" id="colorPickerUpd" name="colorPicker" value="#ffffff">
    //                     <input type="submit" value="UPDATE">
    //                 </form>
    //             </div>
    //             <div class="main-control-panel">
    //                 <button class="menu-button race">RACE</button>
    //                 <button class="menu-button reset" disabled>RESET</button>
    //                 <button class="menu-button generate">GENERATE CARS</button>
    //             </div>
    //         </section>
    //         <section class="garage">
    //             <div class="garage-header">
    //                 <h2>Garage(109)</h2>
    //             </div>
    //             <div class="garage-page-top">
    //                 <h3>Page #1</h3>
    //             </div>
    //             <div class="garage-content">

    //                 <div class="track" id="1">
    //                     <div class="track-top">
    //                         <button class="menu-button select-car">SELECT</button>
    //                         <button class="menu-button remove-car">REMOVE</button>
    //                         <span class="car-name-show">Mersedes</span>
    //                     </div>
    //                     <div class="track-engine">
    //                         <div class="control-buttons">
    //                             <button class="menu-button start">A</button>
    //                             <button class="menu-button stop">B</button>
    //                         </div>
    //                         <div class="car_and_flag">
    //                             <div class="car-icon"></div>
    //                             <div class="flag"></div>
    //                         </div>
    //                     </div>
    //                     <hr class="road">

    //             </div>
    //         </section>
    //         <div class="garage-page-bottom">
    //             <button class="menu-button prev">PREV</button>
    //             <button class="menu-button next">NEXT</button>
    //         </div>
    //     </div>
    //     <div class="wrapper" id="contentWinners">
    //         <section class="winners">
    //             <div class="winners-header">
    //                 <h2>Winners(6)</h2>
    //             </div>
    //             <div class="winners-page-top">
    //                 <h3>Page #1</h3>
    //             </div>
    //             <div class="winners-content">

    //                 <table class="winner-table">
    //                     <tr class="winner-table header">
    //                       <th>Number</th>
    //                       <th>id</th>
    //                       <th>Car</th>
    //                       <th>Name</th>
    //                       <th class="sort-wins">Wins</th>
    //                       <th class="sort-time">Best time (sec)</th>
    //                     </tr>
    //                     <tr class="winner-table-content">
    //                       <td>1</td>
    //                       <td>1</td>
    //                       <td>red</td>
    //                       <td>Toyota</td>
    //                       <td>4</td>
    //                       <td>10.5</td>
    //                     </tr>
    //                   </table>
    //             </div>
    //         </section>
    //         <div class="winners-page-bottom">
    //             <button class="menu-button winners-prev">PREV</button>
    //             <button class="menu-button winners-next">NEXT</button>
    //         </div>
    //     </div>

    //     </div>
    // </main>

    // <div class="ourID" style="display: none;"></div>

    // <template id="winnerLineTemp">
    //     <tr class="winner-table-content">
    //         <td class="winner-number" >1</td>
    //         <td class="winner-id" >1</td>
    //         <td class="winner-color">red</td>
    //         <td class="winner-car">Toyota</td>
    //         <td class="winner-times">4</td>
    //         <td class="winner-best-time">10.5</td>
    //     </tr>
    // </template>

    // <template id="trackItemTemp">
    //     <div class="track">
    //                     <div class="track-top">
    //                         <button class="menu-button select-car">SELECT</button>
    //                         <button class="menu-button remove-car">REMOVE</button>
    //                         <span class="car-name-show">Mersedes</span>
    //                     </div>
    //                     <div class="track-engine">
    //                         <div class="control-buttons">
    //                             <button class="menu-button start">A</button>
    //                             <button class="menu-button stop">B</button>
    //                         </div>
    //                         <div class="car_and_flag">
    //                             <div class="car-icon"></div>
    //                             <div class="flag"></div>
    //                         </div>
    //                     </div>
    //                     <hr class="road">
    // </template>

    // <template id="tableItemTemp">
    //     <h2 class="tableHeader"></h2>
    //     <div class="table-desk">
    //         <div class="table">
    //         </div>
    //     </div>
    // </template>

    // <template id="htmlItemTemp">
    //     <pre><code class="language-html">
    //     </code></pre>
    // </template>`;
    // }

    // drawNavigation(data: Array<Level>, currentLevel: number) {
    //     // console.log('appView.ts | drawNews = ', data);
    //     const values = data;
    //     this.levels.draw(values, currentLevel);
    // }

    // drawTable(data: Array<Level>, id: number) {
    //     // console.log('appView.ts | drawNews = ', data);
    //     const values = data;
    //     this.table.draw(values, id);
    // }

    // drawHtmlView(data: Array<Level>, id: number) {
    //     // console.log('appView.ts | drawNews = ', data);
    //     const values = data;
    //     this.html.draw(values, id);
    // }
}

export default AppView;
