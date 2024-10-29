import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import MainSection from './components/main';
import BlogPage from './components/blogs';
import Footer from './components/footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/blogs" element={<BlogPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
