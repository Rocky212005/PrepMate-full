import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar'
import SummaryCard from '../Cards/SummaryCard'

const DeshboradLayout = ({children}) => {

    const {user}= useContext(UserContext)

  return (
       <div className='bg-indigo-100'>
        <Navbar/>
        
        {user && <div>{children}</div>}
       </div>
  )
}

export default DeshboradLayout
