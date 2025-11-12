import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { fakeLoggedIn, setFakeLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setFakeLoggedIn(true);
    localStorage.setItem("fakeLoggedIn", "true");

    navigate("/");
  };

  useEffect(() => {
    if (fakeLoggedIn) navigate("/");
  }, [fakeLoggedIn]);

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] pt-24 flex items-center justify-center">
      <div className="border p-8 rounded-xl shadow bg-white min-w-[340px]">
        <p className="text-2xl font-semibold">Create Account</p>

        <input className="border p-2 mt-3 w-full" type="text" placeholder="Full Name" required />
        <input className="border p-2 mt-3 w-full" type="email" placeholder="Email" required />
        <input className="border p-2 mt-3 w-full" type="password" placeholder="Password" required />

        <button className="bg-primary text-white w-full py-2 mt-4 rounded">
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Login;

