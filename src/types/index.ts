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

export interface ImageData {
  url: string;
  label: string;
  dimensions: {
    w: number;
    h: number;
  };
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
  variants: Variant[];
}

export interface Categories {
  id: string;
  typeID: string;
}

export interface Product {
  categories: Categories[];
  categoryOrderHints: unknown;
  createdAt: string;
  hasStagedChanges: boolean;
  id: string;
  key: string;
  lastModifiedAt: string;
  masterVariant: Variant;
  name: Record<string, string>;
  productType: {
    id: string;
    typeId: string;
  };
  published: boolean;
  searchKeywords: Record<string, string>;
  slug: Record<string, string>;
  taxCategory: {
    typeId: string;
    id: string;
  };
  variants: Variant[];
  version: number;
}

export interface ProductResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  facets: unknown;
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
