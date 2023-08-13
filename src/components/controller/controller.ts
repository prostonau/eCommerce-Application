// import AppLoader from './appLoader';
// import { RawSourceData } from '../../types/index';
// import { TrackData } from '../../types/index';
// import { intervalsData } from '../../types/index';
// import { carsReadyToRace } from '../../types/index';

// import AppAPI from '../controller/api';

// import { RawSourceNews } from '../../types/index';

// type GetSourcesCallback = (data: RawSourceData) => void;
// type GetNewsCallback = (data: RawSourceNews) => void;

class AppController {
  // API: AppAPI;
  // data: Promise<Array<TrackData>>;
  activeTrackId: number;
  page: number;
  limit: number;
  flagLoadOneTime: boolean;
  // intervals: Array<intervalsData>;
  // isRace: boolean;
  // isWinner: boolean;
  // winnerPage: number;
  // winnerLimit: number;
  // countOfCarsReadyToRace: number;
  // countOfCarsFinishedRace: number;
  // carsReadyToRace: Array<carsReadyToRace>;
  sort: string;
  order: string;
  constructor() {
    // this.API = new AppAPI('http://127.0.0.1:3000');
    // this.data = new Promise<Array<TrackData>>((resolve) => resolve([]));
    this.activeTrackId = 1;
    this.page = 1;
    this.limit = 7;
    this.flagLoadOneTime = false;
    // this.intervals = [];
    // this.isRace = false;
    // this.isWinner = false;
    // this.winnerPage = 1;
    // this.winnerLimit = 10;
    // this.countOfCarsReadyToRace = 0;
    // this.countOfCarsFinishedRace = 0;
    // this.carsReadyToRace = [];
    this.sort = 'id';
    this.order = 'ASC';
  }

  // saveData() {
  //     localStorage.setItem('data', JSON.stringify(this.data));
  // }

  // loadData() {
  //     const data = localStorage.getItem('data');
  //     if (data) {
  //         return JSON.parse(data);
  //     } else {
  //         return [];
  //     }
  // }

  // checkLocalStorage() {
  //     if (this.loadData().length > 0) {
  //         this.data = this.loadData();
  //         return true;
  //     }
  //     return false;
  // }

  // removeDataFromLocalStorage() {
  //     localStorage.removeItem('data');
  // }

  // setCurrentLevelId(): void {
  //     if (this.data.filter((e) => e.flag === 1).length === 0) {
  //         this.currentLevel = 1;
  //     } else if (this.data.filter((e) => e.flag === 0).length === 0) {
  //         this.currentLevel = 1;
  //     } else {
  //         this.currentLevel = this.data.filter((e) => e.flag === 0)[0].id;
  //     }
  // }

  // getCurrentLevelId(): number {
  //     // console.log('getCurrentLevelId | this.currentLevel = ', this.currentLevel);
  //     return this.currentLevel;
  // }

  // clearTable(): void {
  //     const selector: string = this.data.filter((e) => e.id === this.currentLevel)[0].selector;
  //     console.log('selector = ', selector);
  //     document.querySelectorAll(`.table ${selector}`).forEach((e) => {
  //         e.classList.add('remove');
  //     });
  // }

  // findNextLevel(): boolean {
  //     if (this.data.filter((e) => e.flag === 0).length === 0) {
  //         return false;
  //     }

  //     this.currentLevel = this.data.filter((e) => e.flag === 0)[0].id;
  //     console.log(`Next level id = ${this.currentLevel}`);
  //     return true;
  // }
}

export default AppController;
