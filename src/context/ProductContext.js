import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
    toast.success("Product Added successfully!");
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => (product.id === updatedProduct.id ? updatedProduct : product)));
    toast.success("Product Updated successfully!");
  };

  const deleteProduct = (productId) => {
  
      setProducts(products.filter(product => product.id !== productId));
      toast.success("Product deleted successfully!");
    
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProductContext.Provider value={{
      products: filteredProducts,
      categories,
      addProduct,
      updateProduct,
      deleteProduct,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </ProductContext.Provider>
  );
};
