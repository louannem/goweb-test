import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/homepage';
import { SideBar } from './components/Sidebar';
import { ProductPage } from './pages/product';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
    <SideBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
