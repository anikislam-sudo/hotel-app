import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Update = () => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', title: '', description: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://hotel.aotrek.net/api/auth/manage', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success && Array.isArray(response.data.categories)) {
          const parsedId = parseInt(id);
          const selectedProduct = response.data.categories.find((item) => item.id === parsedId);
          if (selectedProduct) {
            setProduct(selectedProduct);
          } else {
            Swal.fire('Error', 'Product not found', 'error');
          }
        } else {
          Swal.fire('Error', 'Unexpected response structure', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch product details', 'error');
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `https://hotel.aotrek.net/api/auth/update/${id}`, // Correct URL for updating product
        { ...product },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire('Success', 'Product updated successfully', 'success');
      navigate('/manage');
    } catch (error) {
      Swal.fire('Error', 'Failed to update product', 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-center mb-6">Update Product</h2>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Name"
          className="input input-bordered w-full mb-4"
        />
        <input
          type="text"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          placeholder="Title"
          className="input input-bordered w-full mb-4"
        />
        <textarea
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          placeholder="Description"
          className="textarea textarea-bordered w-full mb-4"
        ></textarea>
        <button onClick={handleUpdate} className="btn btn-primary w-full">
          Update Product
        </button>
      </div>
    </div>
  );
};

export default Update;
