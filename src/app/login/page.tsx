"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",

  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-b from-gray-800 to-slate-900 text-white font-sans transition-all duration-500 ease-in-out">
      <h1 className={`text-4xl font-bold mb-8 ${loading ? 'animate-pulse' : ''}`}>
        {loading ? "Processing..." : "Login"}
      </h1>

      <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-lg space-y-6 transform transition-transform duration-300 hover:scale-105">
        <hr className="border-gray-500" />

        {/* Email Label and Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-semibold tracking-wide">Email</label>
          <input
            className="w-full p-3 bg-gray-700 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out transform hover:scale-105"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>

        {/* Password Label and Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm font-semibold tracking-wide">Password</label>
          <input
            className="w-full p-3 bg-gray-700 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out transform hover:scale-105"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={onLogin}
          className={`w-full py-3 bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500`}>
          Login here
        </button>

        <Link href="/signup" className="block text-center text-blue-400 mt-4 hover:text-blue-500 transition-all duration-300 ease-in-out">
          Visit Signup Page
        </Link>
      </div>
    </div>
  );

}