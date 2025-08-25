// client/src/components/Navbar.js

"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, logout, loading } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <Link href="/home" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-700 text-lg">Wellness Spa</span>
              </Link>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/home" className="py-4 px-2 text-gray-500 font-semibold hover:text-indigo-500 transition duration-300">Home</Link>
              <Link href="/services" className="py-4 px-2 text-gray-500 font-semibold hover:text-indigo-500 transition duration-300">Services</Link>
            </div>
          </div>
          {/* Secondary Navbar items */}
          <div className="hidden md:flex items-center space-x-3">
            {loading ? (
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            ) : isLoggedIn ? (
              <>
                <Link href="/dashboard/my-appointments" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-indigo-500 hover:text-white transition duration-300">My Appointments</Link>
                <button onClick={logout} className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300">Logout</button>
              </>
            ) : (
              <>
                <Link href="/" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-indigo-500 hover:text-white transition duration-300">Log In</Link>
                <Link href="/register" className="py-2 px-2 font-medium text-white bg-indigo-500 rounded hover:bg-indigo-400 transition duration-300">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
