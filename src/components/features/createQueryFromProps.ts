import { ProductProps } from '../../types';

export function createQueryFromProps(props: ProductProps) {
  // console.log('props = ', props);
  const queryParams: string[] = [];

  for (const prop in props) {
    if (Object.prototype.hasOwnProperty.call(props, prop)) {
      const value = props[prop];

      if (typeof value === 'string') {
        if (value) {
          queryParams.push(`${value}`);
        }
      } else if (typeof value === 'object' && value !== null) {
        // Handle nested object properties
        for (const filterProp in value) {
          if (Object.prototype.hasOwnProperty.call(value, filterProp)) {
            const filterValue = value[filterProp];

            if (filterValue) {
              queryParams.push(`${filterValue}`);
            }
          }
        }
      }
    }
  }
  // console.log('queryParams.join(&) = ', queryParams.join('&'));
  return queryParams.join('&');
}
