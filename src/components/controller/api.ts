// import AppLoader from './appLoader';
// import { RawSourceData } from '../../types/index';
// import { Level } from '../../types/index';
import { TrackData } from '../../types/index';
import { WinnerData } from '../../types/index';
import { engineStart } from '../../types/index';
import { driveMode } from '../../types/index';

// import { RawSourceNews } from '../../types/index';

// type GetSourcesCallback = (data: RawSourceData) => void;
// type GetNewsCallback = (data: RawSourceNews) => void;

class AppAPI {
  baseUrl?: string = '';
  carsCount: number;
  winnersCount: number;
  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl;
    this.carsCount = 0;
    this.winnersCount = 0;
  }

  async getCars(_page?: number, _limit?: number): Promise<Array<TrackData>> {
    const page: string = _page ? _page.toString() : '';
    const limit: string = _limit ? _limit.toString() : '';
    let params = '';
    if (page.length > 0 && limit.length > 0) params = `?_page=${page}&_limit=${limit}`;
    if (page.length > 0 && limit.length === 0) params = `?_page=${page}`;
    if (page.length === 0 && limit.length > 0) params = `?_limit=${limit}`;
    // console.log('request = ', `${this.baseUrl}/garage/${params}`);
    const response = await fetch(`${this.baseUrl}/garage/${params}`);
    // console.log('response', response);
    if (_limit) this.carsCount = Number(response.headers.get('X-Total-Count'));
    // console.log('Number(response.headers.get(X-Total-Count)) = ', Number(response.headers.get('X-Total-Count')));
    const data = await response.json();
    // console.log('data', data);
    return data;
  }

  updateCar = (id: number, name: string, color: string) => {
    let apiUrl = '';
    if (this.baseUrl) {
      apiUrl = `${this.baseUrl}/garage/${id}`;
    }
    const data = {
      name: name,
      color: color,
    };
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      // .then((result) => {
      //     console.log(result); // Обрабатывайте результат обновления, если это необходимо
      // })
      .catch((error) => {
        console.error('Ошибка при обновлении машины: ', error);
      });
  };

  createCar = (name: string, color: string) => {
    let apiUrl = '';
    if (this.baseUrl) {
      apiUrl = `${this.baseUrl}/garage/`;
    }
    const data = {
      name: name,
      color: color,
    };
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      // .then((result) => {
      //     console.log(result); // Обрабатывайте результат обновления, если это необходимо
      // })
      .catch((error) => {
        console.error('Ошибка при добавлении машины: ', error);
      });
  };

  deleteCar = (id: number): Promise<void> => {
    let apiUrl = '';
    if (this.baseUrl) {
      apiUrl = `${this.baseUrl}/garage/${id}`;
    }
    return fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Ошибка при удалени машины: ', error);
      });
  };

  startEngine = (id: number): Promise<engineStart> => {
    let apiUrl = '';
    if (this.baseUrl) {
      apiUrl = `${this.baseUrl}/engine?id=${Number(id)}&status=started`;
    }
    return fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result: engineStart) => {
        console.log(result); // Обрабатывайте результат обновления, если это необходимо
        return result;
      })
      .catch((error) => {
        console.error('Ошибка при удалени машины: ', error);
        throw error; // Выбрасывайте ошибку, чтобы сохранить тип "engineStart"
      });
  };

  driveMode = (id: number): Promise<driveMode> => {
    let apiUrl = '';
    if (this.baseUrl) {
      apiUrl = `${this.baseUrl}/engine?id=${Number(id)}&status=drive`;
    }
    return fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 500) {
          //throw new Error('Internal Server Error');
          return { success: false };
        }
        if (response.status === 429) {
          //throw new Error('Internal Server Error');
          return { success: false };
        }
        return response.json();
      })
      .then((result: driveMode) => {
        console.log(result); // Обрабатывайте результат обновления, если это необходимо
        return result;
      })
      .catch((error: driveMode) => {
        console.error('Ошибка при запуске машины: ', error);
        throw error; // Выбрасывайте ошибку, чтобы сохранить тип "engineStart"
      });
  };

  stopEngine = (id: number): Promise<engineStart> => {
    let apiUrl = '';
    if (this.baseUrl) {
      apiUrl = `${this.baseUrl}/engine?id=${Number(id)}&status=stopped`;
    }
    return fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result: engineStart) => {
        console.log(result); // Обрабатывайте результат обновления, если это необходимо
        return result;
      })
      .catch((error) => {
        console.error('Ошибка при удалени машины: ', error);
        throw error; // Выбрасывайте ошибку, чтобы сохранить тип "engineStart"
      });
  };

  async getWinners(_page?: number, _limit?: number, _sort?: string, _order?: string): Promise<Array<WinnerData>> {
    const page: string = _page ? _page.toString() : '';
    const limit: string = _limit ? _limit.toString() : '';
    const sort: string = _sort ? _sort.toString() : '';
    const order: string = _order ? _order.toString() : '';
    let params = '';
    params = `?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    const response = await fetch(`${this.baseUrl}/winners/${params}`);
    // console.log('response', response);
    this.winnersCount = Number(response.headers.get('X-Total-Count'));
    // console.log('Number(response.headers.get(X-Total-Count)) = ', Number(response.headers.get('X-Total-Count')));
    const data = await response.json();
    // console.log('data', data);
    return data;
  }

  async getAllWinner(): Promise<Array<WinnerData>> {
    const response = await fetch(`${this.baseUrl}/winners`);
    const data = await response.json();
    console.log('data', data);
    return data;
  }

  addWinner = (id: number, wins: number, time: number) => {
    let apiUrl = '';
    if (this.baseUrl) {
      apiUrl = `${this.baseUrl}/winners/`;
    }
    const data = {
      id: id,
      wins: wins,
      time: time,
    };
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      // .then((result) => {
      //     console.log(result); // Обрабатывайте результат обновления, если это необходимо
      // })
      .catch((error) => {
        console.error('Ошибка при добавлении винера: ', error);
      });
  };

  updateWinner = (id: number, wins: number, time: number) => {
    let apiUrl = '';
    if (this.baseUrl) {
      apiUrl = `${this.baseUrl}/winners/${id}`;
    }
    const data = {
      wins: wins,
      time: time,
    };
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      // .then((result) => {
      //     console.log(result); // Обрабатывайте результат обновления, если это необходимо
      // })
      .catch((error) => {
        console.error('Ошибка при добавлении винера: ', error);
      });
  };

  deleteWinner = (id: number): Promise<void> => {
    let apiUrl = '';
    if (this.baseUrl) {
      apiUrl = `${this.baseUrl}/winners/${id}`;
    }
    return (
      fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        // .then((result) => {
        //     console.log(result); // Обрабатывайте результат обновления, если это необходимо
        // })
        .catch((error) => {
          console.error('Ошибка при удалении винера: ', error);
        })
    );
  };
}

export default AppAPI;
