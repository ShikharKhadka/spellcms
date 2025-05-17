import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './pages/blog/blog.js'
import Login from './pages/login/login.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/blog' element={<Blog />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
