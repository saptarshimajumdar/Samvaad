import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error,setError] = useState(false);
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://backend.saptarshimajumder12345.workers.dev/api/v1/user/signup',formData)
      const {token} = response.data;
      console.log(token)
      localStorage.setItem('token', token);
      
      // Redirect to dashboard or any other protected route
      navigate('/')
    }catch(e){
      setError(true);
      console.log("Try again");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <form onSubmit={handleSubmit}>

          <div className="flex justify-between mb-4">
            <div className="mb-4 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
          {error && <p className=' text-red-600 text-sm flex justify-center mb-2'> Signup failed. Try Again.</p>}
          <div className="flex items-center justify-center mb-2">
            <button
              className="bg-gray-800 w-full hover:bg-black transition-colors duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        
        <div className="flex justify-center">
          <div className="flex text-sm justify-center pr-1">Already have an account?</div>
          <div className="flex text-sm justify-center">
            <Link to="/signin" className="text-blue-500 hover:text-blue-700">
              Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;