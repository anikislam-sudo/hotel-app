import React from 'react'
import Navbar from '../shared/Navbar'
import { Outlet } from 'react-router-dom'
import Footers from '../shared/Footers'

const Main = () => {
  return (
    <div className='min-h-screen'>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footers></Footers>
    
</div>
  )
}

export default Main