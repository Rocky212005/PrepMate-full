import React from 'react'

import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import {Toaster} from "react-hot-toast";

import UserProvider from './context/userContext';
import LandingPage from './pages/LandingPage';
import Deshborad from './pages/Home/Deshborad';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';

const App = () => {
  return (
    <UserProvider>
       <div >
          <Router>
            <Routes>
              {/* default route */}
              <Route path="/" element={<LandingPage/>}/>
             
              <Route path="/dashboard" element={<Deshborad/>}/>
                <Route path="/interview-prep/:sessionId" element={<InterviewPrep/>}/>
              </Routes>
          </Router>
    </div>
    </UserProvider>
  )
}

export default App
