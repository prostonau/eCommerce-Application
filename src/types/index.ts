export interface TrackData {
  color: string;
  id: number;
  name: string;
}

export interface WinnerData {
  id: number;
  wins: number;
  time: number;
}

export interface settingsInterface {
  selectedCarID: number;
}

export interface engineStart {
  distance: number;
  velocity: number;
}

export interface carsReadyToRace {
  id: number;
  distance: number;
  velocity: number;
}

export interface driveMode {
  success: boolean;
}

export interface intervalsData {
  id: number;
  intervalId: NodeJS.Timeout;
}
