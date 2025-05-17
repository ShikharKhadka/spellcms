import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './pages/blog/blog.js'
import Login from './pages/login/login.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
