import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SignUpForm = () => {
  const [loading, setloading] = useState(false);
const navigate = useNavigate();
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
     const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
  setloading(true)
   fetch("https://chatting-app-whatsapp-backend.vercel.app/signup",{
  method:"POST",
   headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  username:name,
  email,
  password
  })
 }).then(res=>res.json()).then(data=>{
  if(data.message)
  {
    setloading(false);
toast.success("signup successfully")
navigate("/signin");
  }
 }).catch(err=>{
      setloading(false);
  toast.error(err.error);
  console.log(err)});
     (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value = "";
    (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value = "";
    (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value = "";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-80">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
          {loading ? "Signing up..." : "Sign Up"}  
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline">
          <a href="/signin">Sign In</a>  
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

