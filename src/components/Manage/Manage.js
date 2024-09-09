import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Manage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://hotel.aotrek.net/api/auth/manage', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data.categories);
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch products', 'error');
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      // Show confirmation dialog
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won’t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (isConfirmed) {
        // Perform delete request
        const response = await axios.delete(`https://hotel.aotrek.net/api/auth/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200 || response.status === 204) {
          // Show success message
          Swal.fire('Deleted!', 'Product has been deleted.', 'success');

          // Remove deleted product from the local state
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
          );
        } else {
          throw new Error('Failed to delete product');
        }
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete product', 'error');
    }
  };

  return (
    <div className="p-8 mx-auto max-w-4xl">
      <h2 className="text-4xl  font-bold mb-4 text-center">Manage Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border-b border-gray-300 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="md:w-3/4">
                <h3 className="font-bold">{product.name}</h3>
                <p>{product.title}</p>
                <p>{product.description}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to={`/update/${product.id}`} className="btn btn-primary mr-2">
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Manage;
