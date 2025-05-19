import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SignInForm = () => {
const [load, setload] = useState(false);
 const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    setload(true);
     fetch("https://chat-app-whatsapp-backend.vercel.app/signin",{
  method:"POST",
   headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  email,
  password
  })
 }).then(res=>res.json()).then(data=>{
  if(data.token)
  {
     setload(false);
toast.success("signin successfully")
localStorage.setItem("token",data.token);
localStorage.setItem("id",data.id)
navigate("/");
  }
  else{
     setload(false);
    toast.success(data.message);
  }
 }).catch(err=>{
   setload(false);
  toast.error("signup failed");
  console.log(err)});
    console.log(email, password);
    (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value = "";
    (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value = "";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-80">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
           {load ? "Signing In..." : "Sign In"} 
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline">
           <a href="/signup">Sign Up</a> 
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;

