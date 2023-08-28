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

export interface Price {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  country: string;
}

export interface Attribute {
  name: string;
  value:
    | boolean
    | string
    | {
        key: string;
        label: string;
      };
}

export interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface Variant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets?: unknown[];
}

export interface statusesOfProduct {
  name: Record<string, string>;
  categories: {
    typeId: string;
    id: string;
  }[];
  masterVariant: Variant; // Основной вариант продукта
  variants: Variant[];
}

export interface Product {
  id: string;
  version: number;
  masterData: {
    current?: statusesOfProduct;
    staged?: statusesOfProduct;
    published: boolean; // Флаг опубликованности продукта
    hasStagedChanges: boolean;
  };

  key: string;
  taxCategory: {
    typeId: string;
    id: string;
  };
  lastVariantId: number;
}

export interface ProductResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
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
