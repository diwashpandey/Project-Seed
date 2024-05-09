import { useState } from "react";

import Header from "../components/Header/Header"

function Login() {

  let [formData, setFormData] = useState({
    "email":"",
    "password":""
  })

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async(e) => {
    
  }

  return (
    <>
    <Header />
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 login-container">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input type="email" id="email" name="email" value = {formData.email} onChange={handleChange}
              className="border-gray-300 border text-black rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-400"
              placeholder="Enter your email address" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" name="password" value = {formData.password} onChange={handleChange}
              className="border-gray-300 border text-black rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-400"
              placeholder="Enter your password" required />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">Login</button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">Don't have an account? <a href="#"
          className="text-blue-500 hover:underline">Sign up</a></p>
      </div>
    </div>
          </>
  );
}

export default Login;
