import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login API
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email: formData.email,
          password: formData.password
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Login successful!');
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        // Register API
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Account created successfully!');
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] pt-24 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="border p-8 rounded-xl shadow bg-white min-w-[340px] w-full max-w-md">
        <p className="text-2xl font-semibold mb-2">
          {isLogin ? 'Login' : 'Create Account'}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: '', email: '', password: '' });
            }}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>

        {!isLogin && (
          <input
            className="border p-2 mt-3 w-full rounded"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        )}
        <input
          className="border p-2 mt-3 w-full rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          className="border p-2 mt-3 w-full rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          minLength={8}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white w-full py-2 mt-4 rounded transition-colors"
        >
          {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
        </button>
      </form>
    </div>
  );
};

export default Login;

