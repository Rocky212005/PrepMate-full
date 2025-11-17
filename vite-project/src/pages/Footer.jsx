import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#FFFCEF] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand / About */}
        <div className="md:col-span-1">
          <h2 className="text-black text-xl font-semibold mb-2">PrepMate</h2>
          <p className="text-sm text-black">Empowering learners with AI-powered interview preparation tools.</p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-black text-md font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-black hover:text-red-400">Home</a></li>
            <li><a href="#" className="text-black hover:text-red-400">Jobs</a></li>
            <li><a href="#" className="text-black hover:text-red-400">Contact</a></li>
            <li><a href="#" className="text-black hover:text-red-400">Privacy Policy</a></li>
            <li><a href="#" className="text-black hover:text-red-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h4 className="text-black text-md font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-black mb-3">
            Stay updated with our latest interview tips, job postings, and insights.
          </p>
          <div className="flex items-center max-w-md">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l-md bg-white text-white border border-black focus:outline-none"
            />
            <button className="bg-primary hover:bg-orange-500 cursor-pointer text-white px-4 py-2  m-3 rounded-r-md ">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-primary my-6"></div>

      {/* Social & Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm text-black mb-3 md:mb-0">
          © 2025 PrepMate. All rights reserved.
        </p>
        <div className="flex space-x-4 text-xl text-blue-400">
          <a href="#" className="hover:text-white"><FaTwitter /></a>
          <a href="#" className="hover:text-white"><FaLinkedin /></a>
          <a href="#" className="hover:text-white"><FaGithub /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
