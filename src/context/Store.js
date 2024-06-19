import React from 'react';
import { ProductProvider } from './ProductContext';

const StoreProvider = ({ children }) => {
  return (
    <ProductProvider>
      {children}
    </ProductProvider>
  );
};

export default StoreProvider;
