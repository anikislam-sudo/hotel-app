import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/authSlice/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar bg-gradient-to-r from-cyan-300 to-blue-500">
      <div className="navbar-start">
    <p className="btn btn-ghost text-white normal-case text-xl">Hotel App</p> 
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal p-0">
          {isAuthenticated && (
            <div className='flex items-center justify-end'>
              <li className='font-semibold text-white'>
                <Link to="/create">Create</Link>
              </li>
              <li>
              <Link to="/"><button onClick={handleLogout} className="btn btn-danger ">Logout</button></Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
