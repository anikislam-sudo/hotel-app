import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginSuccess } from '../../Redux/authSlice/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hotel.aotrek.net/api/auth/login', { email, password });
      const token = response.data.user.token;
      console.log(token)
      dispatch(loginSuccess(token));  // Dispatch loginSuccess with token

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'You have logged in successfully!',
        icon: 'success',
        confirmButtonText: 'Okay'
      });

      // Redirect to dashboard
      navigate('/manage');
    } catch (error) {
      // Show error message
      Swal.fire({
        title: 'Error!',
        text: 'Login failed. Please check your credentials.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-center text-4xl font-bold mb-8">Login</h2>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
