'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function signupPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("signUp successful", response.data)
      toast.success("Signup successful")
      router.push("/login")
    } catch (error: any) {
      console.log("signUp failed", error)
      toast.error("Failed to signup")
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    }
    else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-b from-gray-800 to-slate-900 text-white font-sans transition-all duration-500 ease-in-out">
      <h1 className={`text-4xl font-bold mb-8 ${loading ? 'animate-pulse' : ''}`}>
        {loading ? "Processing..." : "Signup"}
      </h1>

      <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-lg space-y-6 transform transition-transform duration-300 hover:scale-105">
        <hr className="border-gray-500" />
  
        {/* Username Label and Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-sm font-semibold tracking-wide">Username</label>
          <input 
            className="w-full p-3 bg-gray-700 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out transform hover:scale-105"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="Enter your username"
          />
        </div>
  
        {/* Email Label and Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-semibold tracking-wide">Email</label>
          <input 
            className="w-full p-3 bg-gray-700 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out transform hover:scale-105"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
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
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Enter your password"
          />
        </div>
  
        {/* Signup Button */}
        <button
          onClick={onSignup}
          className={`w-full py-3 bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 ${
            buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
          {buttonDisabled ? "Signup Disabled" : "Sign Up"}
        </button>
  
        <Link href="/login" className="block text-center text-blue-400 mt-4 hover:text-blue-500 transition-all duration-300 ease-in-out">
          Visit Login Page
        </Link>
      </div>
    </div>
  );
  
}
