import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import MainSection from './components/main';
import BlogPage from './components/blogs';
import LoginPage from './components/login';
import Footer from './components/footer';
import SignUpPage from './components/signup';
import AboutPage from './components/about';

const App = () => {
  return (
    <div style={styles.container}> 
      <Router>
        <Header />
        <div style={styles.content}> 
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', 
    },
  content: {
    flex: 1,
  },
};

export default App;
