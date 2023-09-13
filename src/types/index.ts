export interface ClientCredentialsFlowResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  expires_in_date?: Date;
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

export interface ProductInCart {
  id: string;
  productId: string;
  productKey: string;
  name: Record<string, string>;
  productType: {
    id: string;
    typeId: string;
  };
  productSlug: Record<string, string>;
  variants: Variant[];

  quantity: number;

  // далее не проверенные поля
  price: {
    id: string;
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    validFrom: string;
    validUntil: string;
    discounted?: {
      value: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
      };
      discount: {
        typeId: string;
        id: string;
      };
    };
  };
  discountedPricePerQuantity: [];
  perMethodTaxRate: [];
  addedAt: string;
  lastModifiedAt: string;
  state: {
    quantity: number;
    state: {
      typeId: string;
      id: string;
    };
  }[];
  priceMode: string;
  lineItemMode: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  taxedPricePortions: [];
}

export interface CartResponce {
  statusCode?: number;
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: false;
    customer: {
      typeId: string;
      id: string;
    };
  };
  createdBy: {
    clientId: string;
    isPlatformClient: false;
    customer: {
      typeId: string;
      id: string;
    };
  };
  customerId: string;
  lineItems: ProductInCart[];
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  shipping: [];
  customLineItems: [];
  discountCodes: [];
  directDiscounts: [];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  refusedGifts: [];
  origin: string;
  itemShippingAddresses: [];
}
