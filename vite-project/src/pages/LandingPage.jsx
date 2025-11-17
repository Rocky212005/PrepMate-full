import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HERO_IMG from "../assets/hero.png";
import { ADD_FEATURES } from "../utils/data";
import Modal from '../components/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import Footer from './Footer';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [OpenAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className='w-full min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col items-center px-4 sm:px-6 py-10 relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-300/30 blur-[180px] rounded-full -z-10' />

        <div className='w-full max-w-7xl'>
          <header className='w-full flex items-center justify-between mb-14'>
            <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight'>
              <span className="text-indigo-600">Interview</span> Prep AI
            </h1>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md transition text-sm sm:text-base'
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          <div className='w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10 mb-20'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center lg:text-left space-y-6 max-w-xl'
            >
              <span className='inline-block px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium'>AI Powered</span>
              <h2 className='text-4xl sm:text-5xl font-bold text-gray-900 leading-snug'>
                Ace Your Interview <br /> with <span className='text-indigo-600'>Smart AI Learning</span>
              </h2>
              <p className='text-gray-700 text-base sm:text-lg'>
                Personalized practice, smart feedback, and intuitive learning flow to help you land your dream role.
              </p>
              <button
                className='bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg shadow-md transition'
                onClick={handleCTA}
              >
                Get Started
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='flex justify-center items-center'
            >
              <img src={HERO_IMG} alt="Hero" className='w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-2xl shadow-xl' />
            </motion.div>
          </div>
        </div>
      </div>

      <section className='bg-gradient-to-t from-white to-purple-50 py-16 px-4'>
        <div className='max-w-7xl mx-auto'>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-3xl font-bold text-center text-gray-800 mb-12'
          >
            Features That Make You Shine
          </motion.h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {ADD_FEATURES.map((feature, index) => (
              <motion.div
                key={feature.Id}
                className='bg-white p-6 rounded-2xl border border-indigo-100 hover:shadow-2xl transition shadow-md'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h4 className='text-lg font-semibold text-indigo-700 mb-2'>{feature.title}</h4>
                <p className='text-gray-600 text-sm'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className='text-center mt-10 mb-6 text-sm text-gray-500'>
        Powered by innovation and dedication
      </div>

      <Footer />

      <Modal
        isOpen={OpenAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;