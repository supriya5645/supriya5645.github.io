import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      onAddProduct({
        name: name.trim(),
        price: parseFloat(price)
      });

      // Reset form
      setName('');
      setPrice('');
      setMessage({ text: 'Product added successfully!', type: 'success' });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      setMessage({ text: 'Failed to add product', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form">
      <h3>Add New Product</h3>
      {message.text && (
  
          <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price in rupees"
            min="0"
            step="1"
            disabled={isSubmitting}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={isSubmitting ? 'loading' : ''}
        >
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;