import AppController from '../controller/controller';
import AppAPI from '../controller/api';
import { AppView } from '../view/appView';
// import { engineStart } from '../../types/index';
// import { intervalsData } from '../../types/index';
// import { carsReadyToRace } from '../../types/index';

//import data from './../../data/data.json';

class App {
  controller: AppController;
  API: AppAPI;
  view: AppView;
  constructor() {
    this.controller = new AppController();
    this.API = new AppAPI();
    this.view = new AppView();
  }

  // public initHTML() {
  //     this.view.drawBody();
  // }

  testCustomer = {
    email: 'joh2ndo13e@example.com',
    firstName: 'John',
    lastName: 'Doe2',
    password: 'secret123',
  };

  public start(): void {
    console.log('Start eCommerce-Application...');
    console.log('Test API...');
    this.API.clientCredentialsFlow().then((response) => {
      console.log('response = ', response);
      this.API.getCustomer('39fd2612-1d14-4484-b6ac-1f4631a22f91', response.access_token);
      this.API.getAllCustomers(response.access_token);
      this.API.createCustomer(response.access_token, this.testCustomer);
    });

    this.API.passwordFlow('johndo13e@example.com', 'secret123');

    // this.API.passwordFlow('samplecustomer.germany@example.com', 'Qweasd%4');

    // this.controller.data = this.API.getCars(this.controller.page, this.controller.limit).then((e) => {
    //     // console.log('e', e);
    //     this.view.tracks.drawTracks(e);
    //     // const track4 = document.getElementById('4');
    //     // console.log('track4 = ', track4);
    //     this.updateCarsCount();
    //     this.deleteCarListener();
    //     this.startEngine();
    //     this.stopEngine();
    //     this.startRace();
    //     this.resetRace();
    //     this.addEventListenertoGenerateCars();
    //     if (!this.controller.flagLoadOneTime) {
    //         this.addListenerFormLinksPrevNextButtons();
    //         this.updateSelectedCar();
    //         this.addNewCar();
    //         this.mainButtonListener();
    //         this.addListenerFordWinnersLinksPrevNextButtons();
    //     }

    //     return e;
    // });

    // this.loadWinners();
  }

  // public updateCarsCount(): void {
  //     const numberOfCars = document.querySelector('.garage-header h2');
  //     if (numberOfCars) {
  //         numberOfCars.textContent = `Garage (${this.API.carsCount})`;
  //     }
  // }

  // private addListenerFormLinksPrevNextButtons(): void {
  //     this.controller.flagLoadOneTime = true;
  //     const next = document.querySelector('.next');
  //     if (next) {
  //         next.addEventListener('click', () => {
  //             // console.log('next!!!');
  //             // console.log('this.controller.page = ', this.controller.page);
  //             this.controller.page += 1;
  //             this.clearDefaultRaceVariabels();
  //             this.start();
  //             this.updatePageNumber();
  //         });
  //     }

  //     const prev = document.querySelector('.prev');
  //     if (prev) {
  //         prev.addEventListener('click', () => {
  //             // console.log('this.controller.page = ', this.controller.page);
  //             // console.log('prev!!!');
  //             if (this.controller.page > 1) {
  //                 this.controller.page = this.controller.page - 1;
  //                 this.clearDefaultRaceVariabels();
  //                 this.start();
  //                 this.updatePageNumber();
  //             }
  //         });
  //     }
  // }

  // clearDefaultRaceVariabels() {
  //     this.controller.countOfCarsReadyToRace = 0;
  //     this.controller.countOfCarsFinishedRace = 0;
  //     this.controller.carsReadyToRace = [];
  //     this.controller.isRace = false;
  //     this.controller.isWinner = false;
  //     this.controller.intervals.map((e) => clearInterval(Number(e)));
  //     this.controller.intervals = [];
  //     const raceButton = document.querySelector('.race');
  //     const resetBtn = document.querySelector('.reset');
  //     if (raceButton && resetBtn) {
  //         if (raceButton) (raceButton as HTMLButtonElement).disabled = false;
  //         if (resetBtn) (resetBtn as HTMLButtonElement).disabled = true;
  //     }
  // }

  // private updatePageNumber(): void {
  //     const pageNumber = document.querySelector('.garage-page-top h3');
  //     if (pageNumber) {
  //         pageNumber.textContent = `Page # ${this.controller.page}`;
  //     }
  // }

  // public updateSelectedCar() {
  //     const form = document.querySelector('.update-car__form');

  //     if (form) {
  //         const inputField = form.querySelector('.car-name') as HTMLInputElement;
  //         const colorPicker = form.querySelector('#colorPickerUpd') as HTMLInputElement;
  //         const ourId = document.querySelector('.ourID') as HTMLElement; //this.view.tracks.activeCar;
  //         form.addEventListener('submit', (event) => {
  //             event.preventDefault();

  //             const carName = inputField?.value;
  //             const carColor = colorPicker?.value;
  //             const id = ourId.innerHTML;
  //             //console.log('id: ', id, ' | carName: ', carName, ' | carColor: ', carColor);

  //             this.API.updateCar(Number(id), carName, carColor);
  //             this.start();
  //         });
  //     }
  // }

  // public deleteCarListener() {
  //     const trackes = document.querySelectorAll('.remove-car');
  //     // console.log('trackes = ', trackes);

  //     trackes.forEach((item) => {
  //         //console.log('item = ', item);
  //         item.addEventListener('click', () => {
  //             //console.log('item', item, item.getAttribute('secretid'));
  //             item.getAttribute('secretid');
  //             const id = item.getAttribute('secretid');
  //             if (id) {
  //                 this.API.deleteCar(Number(id))
  //                     .then(() => {
  //                         this.API.deleteWinner(Number(id));
  //                     })
  //                     .then(() => {
  //                         this.start();
  //                     });
  //             }
  //         });
  //     });
  // }

  // public addNewCar() {
  //     const form = document.querySelector('.new-car__form');

  //     if (form) {
  //         const inputField = form.querySelector('.car-name') as HTMLInputElement;
  //         const colorPicker = form.querySelector('#colorPickerCre') as HTMLInputElement;
  //         form.addEventListener('submit', (event) => {
  //             event.preventDefault();

  //             const carName = inputField?.value;
  //             const carColor = colorPicker?.value;
  //             // console.log('carName: ', carName, ' | carColor: ', carColor);

  //             this.API.createCar(carName, carColor);
  //             this.start();
  //         });
  //     }
  // }

  // public generateAlotOfCars() {
  //     const carBrands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Mercedes', 'Nissan', 'BMW', 'Tesla', 'Audi'];
  //     const carModels = [
  //         'Camry',
  //         'Civic',
  //         'Mustang',
  //         'Corvette',
  //         'Accord',
  //         'F-150',
  //         'Camaro',
  //         'Challenger',
  //         'S-Class',
  //     ];

  //     for (let i = 0; i < 100; i++) {
  //         const randomBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
  //         const randomModel = carModels[Math.floor(Math.random() * carModels.length)];
  //         const randomColor = this.generateRandomColor();

  //         this.API.createCar(`${randomBrand} ${randomModel}`, randomColor);
  //     }
  // }

  // private generateRandomColor() {
  //     const red = Math.floor(Math.random() * 256).toString(16);
  //     const green = Math.floor(Math.random() * 256).toString(16);
  //     const blue = Math.floor(Math.random() * 256).toString(16);
  //     return `#${red}${green}${blue}`;
  // }

  // public addEventListenertoGenerateCars() {
  //     const button = document.querySelector('.generate');

  //     if (button) {
  //         button.addEventListener('click', () => {
  //             this.generateAlotOfCars();
  //             this.start();
  //         });
  //     }
  // }

  // public animateCar(id: number, distance: number, velocity: number) {
  //     // console.log(distance, velocity);

  //     const car = document.querySelector(`.car-icon[secretid="${id}"]`);
  //     // console.log('car = ', car);
  //     let currentX = (car as HTMLElement).offsetLeft;
  //     // console.log('currentX offsetLeft = ', currentX);
  //     const endX = window.innerWidth - 80;
  //     const duration = distance / velocity;
  //     const framesCount = (duration / 1000) * 60;
  //     const dX = (endX - currentX) / framesCount;
  //     const startTime = performance.now();
  //     if (car) {
  //         const ourInterval = setInterval(() => {
  //             currentX += dX;
  //             // console.log('currentX = ', currentX);
  //             if (currentX > endX) {
  //                 clearInterval(ourInterval);
  //             }
  //             (car as HTMLElement).style.transform = `translateX(${currentX}px)`;
  //         }, 16);
  //         const obj: intervalsData = { id: id, intervalId: ourInterval };
  //         this.controller.intervals.push(obj);
  //         // console.log('ourInterval', ourInterval);

  //         this.API.driveMode(Number(id)).then((t) => {
  //             this.controller.countOfCarsFinishedRace += 1;
  //             // console.log('driveMode', t);
  //             // console.log(' this.controller.isWinner = ', this.controller.isWinner);
  //             if (t.success === false) clearInterval(ourInterval);
  //             if (t.success && !this.controller.isWinner && this.controller.isRace) {
  //                 this.controller.isWinner = true;
  //                 const endTime = performance.now();
  //                 const executionTime = endTime - startTime;
  //                 // console.log(`Результат гонки для машинки с id = ${id} из: ${executionTime} миллисекунд`);
  //                 this.view.showMessage(
  //                     `Победитель машинки с id = ${id} и лучшим временем: ${executionTime} миллисекунд. Нажмите конопку Reset, после окончания гонки, пожалуйста, если нужно запустить новую гонку.`
  //                 );
  //                 this.checkWinner(id, executionTime);
  //             }
  //             const resetBtn = document.querySelector('.reset');
  //             // console.log(this.controller.countOfCarsFinishedRace, document.querySelectorAll('.track').length);
  //             if (
  //                 resetBtn &&
  //                 this.controller.countOfCarsFinishedRace === document.querySelectorAll('.track').length
  //             ) {
  //                 (resetBtn as HTMLButtonElement).disabled = false;
  //             }
  //         });
  //     }
  // }

  // public startEngine() {
  //     const starts = document.querySelectorAll('.start');
  //     // console.log('starts = ', starts);

  //     starts.forEach((item) => {
  //         //console.log('item = ', item);
  //         item.addEventListener('click', () => {
  //             item.getAttribute('secretid');
  //             const id = item.getAttribute('secretid');
  //             const stopButton = document.querySelector(`button.menu-button.stop[secretid="${id}"][disabled]`);
  //             if (id && stopButton) {
  //                 (item as HTMLButtonElement).disabled = true;
  //                 (stopButton as HTMLButtonElement).disabled = false;
  //                 this.API.startEngine(Number(id)).then((e: engineStart) => {
  //                     // console.log('engineStart = ', e, this.controller.isRace);
  //                     if (this.controller.isRace) {
  //                         this.controller.countOfCarsReadyToRace += 1;
  //                         // console.log('startEngine if', this.controller.countOfCarsReadyToRace);
  //                         const obj: carsReadyToRace = {
  //                             id: Number(id),
  //                             distance: e.distance,
  //                             velocity: e.velocity,
  //                         };
  //                         this.controller.carsReadyToRace.push(obj);
  //                     } else {
  //                         // console.log('startEngine else');
  //                         this.animateCar(Number(id), e.distance, e.velocity);
  //                     }
  //                 });
  //             }
  //         });
  //     });
  // }

  // public stopEngine() {
  //     const stops = document.querySelectorAll('.stop');

  //     stops.forEach((item) => {
  //         //console.log('stop item = ', item);
  //         item.addEventListener('click', () => {
  //             this.clearRace();
  //             item.getAttribute('secretid');
  //             const id = item.getAttribute('secretid');
  //             const startButton = document.querySelector(`button.menu-button.start[secretid="${id}"][disabled]`);
  //             const car = document.querySelector(`.car-icon[secretid="${id}"]`);
  //             if (id && startButton) {
  //                 this.API.stopEngine(Number(id)).then(() => {
  //                     (item as HTMLButtonElement).disabled = true;
  //                     (startButton as HTMLButtonElement).disabled = false;
  //                     //this.animateCar(Number(id), e.distance, e.velocity);
  //                     clearInterval(this.controller?.intervals.filter((e) => e.id === Number(id))[0].intervalId);
  //                     this.controller.intervals = this.controller.intervals.filter((e) => e.id !== Number(id));
  //                     (car as HTMLElement).style.transform = 'none';
  //                 });
  //                 // (car as HTMLElement).style.backgroundColor = 'red';
  //             }
  //         });
  //     });
  // }

  // waitForVariableEqualsNumberOfCars = (): Promise<void> => {
  //     return new Promise((resolve, reject) => {
  //         let iteration = 0;
  //         const interval = setInterval(() => {
  //             //console.log(`attempt ${iteration}`);
  //             if (this.controller.countOfCarsReadyToRace === document.querySelectorAll('.track').length) {
  //                 clearInterval(interval);
  //                 resolve();
  //             } else if (iteration === 100) {
  //                 clearInterval(interval);
  //                 reject(
  //                     new Error(
  //                         `Variable was not equal to ${
  //                             document.querySelectorAll('.track').length
  //                         } after 100 iterations.`
  //                     )
  //                 );
  //             }
  //             iteration++;
  //         }, 100);
  //     });
  // };

  // public startRace() {
  //     this.view.reDrawRaceREsetButtons();
  //     //setTimeout(() => {
  //     // console.log('startRace');
  //     const raceButton = document.querySelector('.race');
  //     const resetBtn = document.querySelector('.reset');

  //     // console.log('starts.length = ', starts.length);
  //     // console.log('document.querySelectorAll(.start) = ', document.querySelectorAll('.start'));

  //     if (raceButton) {
  //         (raceButton as HTMLButtonElement).addEventListener('click', () => {
  //             const starts = document.querySelectorAll('.start');
  //             this.controller.isWinner = false;
  //             if (raceButton) (raceButton as HTMLButtonElement).disabled = true;
  //             if (resetBtn) (resetBtn as HTMLButtonElement).disabled = true;
  //             this.controller.isRace = true;
  //             starts.forEach((item) => {
  //                 // console.log('auto clik on item', item);
  //                 (item as HTMLButtonElement).click();
  //             });
  //             // console.log('before while...');
  //             this.waitForVariableEqualsNumberOfCars().then(() => {
  //                 // console.log(`Переменная стала равной ${this.controller.limit}`);
  //                 this.controller.carsReadyToRace.map((car) => {
  //                     this.animateCar(car.id, car.distance, car.velocity);
  //                 });
  //             });
  //         });
  //     }
  //     //}, 1);
  // }

  // clearRace() {
  //     // console.log('clearRace');
  //     this.controller.isRace = false;
  //     //this.controller.isWinner = false;
  //     this.activateRaceButton();
  //     this.controller.countOfCarsReadyToRace = 0;
  //     this.controller.countOfCarsFinishedRace = 0;
  //     this.controller.carsReadyToRace = [];
  //     const popup = document.getElementById('popup');
  //     //if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
  //     if (popup) popup.remove();
  // }

  // activateRaceButton() {
  //     const resetBtn = document.querySelector('.reset');
  //     if (resetBtn) (resetBtn as HTMLButtonElement).disabled = true;
  //     const raceBtn = document.querySelector('.race');
  //     if (raceBtn) (raceBtn as HTMLButtonElement).disabled = false;
  // }

  // public resetRace() {
  //     const resetButton = document.querySelector('.reset');
  //     const stops = document.querySelectorAll('.stop');
  //     if (resetButton) {
  //         (resetButton as HTMLButtonElement).addEventListener('click', () => {
  //             this.clearRace();
  //             // console.log('aaa this.countOfCarsFinishedRace = ', this.controller.countOfCarsFinishedRace);
  //             stops.forEach((item) => {
  //                 (item as HTMLButtonElement).click();
  //             });
  //         });
  //     }
  // }

  // checkWinner(id: number, executionTime: number) {
  //     this.API.getAllWinner().then((e) => {
  //         // console.log('e =', e);
  //         if (e.filter((x) => x.id === id).length > 0) {
  //             // console.log('we have this winner in DB');
  //             // console.log(e.filter((x) => x.id === id)[0].time, executionTime / 1000);
  //             if (e.filter((x) => x.id === id)[0].time > executionTime / 1000) {
  //                 //console.log('we need to update record to DB');
  //                 const newWins = e.filter((x) => x.id === id)[0].wins + 1;
  //                 this.API.updateWinner(id, newWins, executionTime / 1000);
  //             } else {
  //                 const currentWins = e.filter((x) => x.id === id)[0].wins + 1;
  //                 const currentTime = e.filter((x) => x.id === id)[0].time;
  //                 this.API.updateWinner(id, currentWins, currentTime);
  //             }
  //         } else {
  //             //console.log('we add this first time winner to DB');
  //             this.API.addWinner(id, 1, executionTime / 1000);
  //         }
  //     });
  // }

  // mainButtonListener() {
  //     const garage = document.getElementById('garage');
  //     const winners = document.getElementById('winners');
  //     const garageContent = document.getElementById('contentGarage');
  //     const winnersContent = document.getElementById('contentWinners');

  //     if (garage && garageContent && winnersContent) {
  //         garage.addEventListener('click', () => {
  //             garageContent.style.display = 'block';
  //             winnersContent.style.display = 'none';
  //         });
  //     }

  //     if (winners && garageContent && winnersContent) {
  //         winners.addEventListener('click', () => {
  //             garageContent.style.display = 'none';
  //             winnersContent.style.display = 'block';
  //             this.loadWinners();
  //         });
  //     }
  // }

  // deleteWinner(id: number) {
  //     this.API.getAllWinner().then((e) => {
  //         //console.log('e =', e);
  //         if (e.filter((x) => x.id === id).length > 0) {
  //             this.API.deleteWinner(id);
  //         }
  //     });
  // }

  // public updatedWinnersCount(): void {
  //     const numberOfWinners = document.querySelector('.winners-header h2');
  //     if (numberOfWinners) {
  //         numberOfWinners.textContent = `Winners (${this.API.winnersCount})`;
  //     }
  // }

  // private addListenerFordWinnersLinksPrevNextButtons(): void {
  //     const next = document.querySelector('.winners-next');
  //     if (next) {
  //         next.addEventListener('click', () => {
  //             // console.log('next!!!');
  //             // console.log('this.controller.winnerPage = ', this.controller.winnerPage);
  //             this.controller.winnerPage += 1;
  //             this.loadWinners();
  //             this.updatedWinnersPageNumber();
  //         });
  //     }

  //     const prev = document.querySelector('.winners-prev');
  //     if (prev) {
  //         prev.addEventListener('click', () => {
  //             // console.log('this.controller.winnerPage = ', this.controller.winnerPage);
  //             // console.log('prev!!!');
  //             if (this.controller.winnerPage > 1) {
  //                 this.controller.winnerPage = this.controller.winnerPage - 1;
  //                 this.loadWinners();
  //                 this.updatedWinnersPageNumber();
  //             }
  //         });
  //     }
  // }

  // public addListenerFordSortWinners(): void {
  //     const sortWins = document.querySelector('.sort-wins');
  //     // console.log('sortWins = ', sortWins);
  //     if (sortWins) {
  //         sortWins.addEventListener('click', () => {
  //             // console.log('sortWins in');
  //             this.controller.sort = 'wins';
  //             if (this.controller.order === 'DESC') {
  //                 this.controller.order = 'ASC';
  //             } else {
  //                 this.controller.order = 'DESC';
  //             }
  //             this.loadWinners();
  //         });
  //     }

  //     const sortTime = document.querySelector('.sort-time');
  //     // console.log('sortTime = ', sortTime);
  //     if (sortTime) {
  //         sortTime.addEventListener('click', () => {
  //             // console.log('sortWins in');
  //             this.controller.sort = 'time';
  //             if (this.controller.order === 'DESC') {
  //                 this.controller.order = 'ASC';
  //             } else {
  //                 this.controller.order = 'DESC';
  //             }
  //             this.loadWinners();
  //         });
  //     }

  //     const sortID = document.querySelector('.sort-id');
  //     // console.log('sortID = ', sortID);
  //     if (sortID) {
  //         sortID.addEventListener('click', () => {
  //             // console.log('sortID in');
  //             this.controller.sort = 'id';
  //             if (this.controller.order === 'DESC') {
  //                 this.controller.order = 'ASC';
  //             } else {
  //                 this.controller.order = 'DESC';
  //             }
  //             this.loadWinners();
  //         });
  //     }
  // }

  // private updatedWinnersPageNumber(): void {
  //     const pageNumber = document.querySelector('.winners-page-top h3');
  //     if (pageNumber) {
  //         pageNumber.textContent = `Page # ${this.controller.winnerPage}`;
  //     }
  // }

  // loadWinners() {
  //     this.API.getCars().then((cars) => {
  //         this.API.getWinners(
  //             this.controller.winnerPage,
  //             this.controller.winnerLimit,
  //             this.controller.sort,
  //             this.controller.order
  //         ).then((e) => {
  //             // console.log('winners = ', e);
  //             this.view.table.draw(e, cars);
  //             this.updatedWinnersCount();
  //             this.addListenerFordSortWinners();
  //         });
  //     });
  // }
}

export default App;
