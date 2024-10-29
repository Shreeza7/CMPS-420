import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import MainSection from './components/main';
import BlogPage from './components/blogs';
import LoginPage from './components/login';
import Footer from './components/footer';
import SignUpPage from './components/signup';

const App = () => {
  return (
    <div style={styles.container}> {/* Flex container to keep footer at the bottom */}
      <Router>
        <Header />
        <div style={styles.content}> {/* Content area that expands to fill space */}
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
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
    minHeight: '100vh', // Ensures the container takes up the full viewport height
  },
  content: {
    flex: 1, // Expands to fill remaining space to keep footer at the bottom
  },
};

export default App;
