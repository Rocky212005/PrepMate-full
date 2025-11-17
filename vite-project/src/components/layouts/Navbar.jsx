import React from 'react';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-[#ffbc79]  border-b border-gray-200 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="text-black text-lg md:text-xl font-semibold">
          Interview Prep AI
        </Link>
        <ProfileInfoCard />
      </div>
    </header>
  );
};

export default Navbar;
