import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import MainSection from './components/main';
import BlogPage from './components/blogs';
import Footer from './components/footer';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route path="/blogs" element={<BlogPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
