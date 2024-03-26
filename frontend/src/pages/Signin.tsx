import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import axios from 'axios';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const[error,setError] = useState(false);
  const { email, password } = formData;
  const navigate= useNavigate();

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Perform form submission logic here, e.g., sending data to backend
    try {
      const response = await axios.post('https://backend.saptarshimajumder12345.workers.dev/api/v1/user/signin', formData);
      console.log(response.data.token);
      const {token} = response.data;
      localStorage.setItem('token', token);

      // Redirect to dashboard or any other protected route
      navigate('/')
    } catch (error) {
      setError(true);
      console.log("Try again");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {error && <p className=' text-red-600 text-sm flex justify-center mb-2'> Signin failed. Try Again.</p>}
          <div className="flex items-center justify-center mb-2">
            <button
              className="bg-gray-800 w-full hover:bg-black transition-colors duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="flex justify-center">
          <div className="flex text-sm justify-center pr-1">Don't have an account?</div>
          <div className="flex text-sm justify-center">
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
