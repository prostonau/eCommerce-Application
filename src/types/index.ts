export interface ClientCredentialsFlowResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export interface Customer {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  id?: string;
  version?: number;
}

export interface Action {
  [key: string]: string;
}

export interface Actions {
  action: string;
  adress?: Action;
}

// export interface WinnerData {
//   id: number;
//   wins: number;
//   time: number;
// }

// export interface settingsInterface {
//   selectedCarID: number;
// }

// export interface engineStart {
//   distance: number;
//   velocity: number;
// }

// export interface carsReadyToRace {
//   id: number;
//   distance: number;
//   velocity: number;
// }

// export interface driveMode {
//   success: boolean;
// }

// export interface intervalsData {
//   id: number;
//   intervalId: NodeJS.Timeout;
// }
