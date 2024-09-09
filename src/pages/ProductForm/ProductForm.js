import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, title, description };

    try {
      await axios.post('https://hotel.aotrek.net/api/auth/create', product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/manage');  // Redirect to the manage products page after submission
    } catch (error) {
      alert('Error creating product!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-4xl font-bold text-center mb-6">Create Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full py-2"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
