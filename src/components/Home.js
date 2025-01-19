import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import SearchBar from './SearchBar';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
    
    // Load products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(savedProducts);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('products');
    navigate('/');
  };

  const addProduct = (newProduct) => {
    // Check for duplicates
    const isDuplicate = products.some(
      product => product.name.toLowerCase() === newProduct.name.toLowerCase()
    );

    if (isDuplicate) {
      alert('Product already exists!');
      return;
    }

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (productToDelete) => {
    const updatedProducts = products.filter(product => product.name !== productToDelete.name);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="header">
        <h1>Product Management</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <ProductForm onAddProduct={addProduct} />
      <SearchBar onSearch={setSearchQuery} />
      <ProductList products={filteredProducts} onDelete={deleteProduct} />
    </div>
  );
};

export default Home;
