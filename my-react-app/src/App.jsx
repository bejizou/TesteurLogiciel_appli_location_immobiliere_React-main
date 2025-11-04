import { useState } from 'react'
import Header from './component/header';
import Home from './page/accueil';
import About from './page/about'
import Error from './page/erreur404';
import Footer from './component/footer';
import Accomodation from './page/information';
import {
 BrowserRouter,
  Route, Routes
} from "react-router-dom"
function App() {
  return (   
    <div className='mainContainer'>
      <div className='container'>
     <BrowserRouter>
     <Header />
      <Routes>
      <Route path="/" element={<Home />}/> 
      <Route path="/about" element={<About />}/>
      <Route path="*" element={<Error />}/>
       <Route path="/information/:id" element={<Accomodation />}/> 
      </Routes>
    
      </BrowserRouter>
      </div>
<div className='footer-container'>
      <Footer />
      </div>
     
      
     
     
    </div>
  )
}

export default App