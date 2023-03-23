import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Main from './pages/Main';
import Header from './pages/nav/Header';
import Footer from './pages/nav/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
// import UrlRedirect from './pages/UrlRedirect';
import Error from './pages/Error';

// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bg-gray-900">
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="/:slug" element={<UrlRedirect />} /> */}
          <Route path="error" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

