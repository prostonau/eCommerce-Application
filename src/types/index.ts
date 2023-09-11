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

export interface PriceValue {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Discount {
  discount: {
    typeId: string;
    id: string;
  };
  value: PriceValue;
}
export interface Price {
  id: string;
  value: PriceValue;
  discounted?: Discount;
  country: string;
}

export interface ValueResp {
  key: string;
  label: string;
}

export interface Attribute {
  name: string;
  value: boolean | string | ValueResp;
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
  variants?: Variant[];
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

export interface Ancestor {
  typeId: string;
  id: string;
}
export interface Category {
  ancestors: Ancestor[];
  assets: unknown;
  createdAt: string;
  createdBy: {
    isPlatformClient: boolean;
    user: Ancestor;
  };
  description: Record<string, string>;
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: Ancestor;
  };
  name: Record<string, string>;
  orderHint: string;
  slug: Record<string, string>;
  version: number;
  versionModifiedAt: string;
  parent?: Ancestor;
}

export interface CategoryResponce {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Category[];
}

export type ProductProps = {
  category: string;
  filter: {
    type: string;
    size: string;
    color: string;
  };
  sort: string;
  search: string;
  [key: string]: string | Record<string, string>;
};

export interface CustomerAddress {
  city: string;
  country: string;
  id: string;
  postalCode: string;
  streetName: string;
}

export interface lineInCart {
  productId: string;
  id: string;
}
