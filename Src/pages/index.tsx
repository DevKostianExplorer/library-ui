import type { NextPage } from 'next'
import React from 'react'
import { Provider } from 'react-redux'
import { EBooksPage, Navbar } from '../Components/Export'
import { setupStore } from '../store/store'
import '../styles/Home.module.css'



const Home: NextPage = () => {
  return (
    <>
      <Navbar></Navbar>
    </>
  )
}

export default Home
