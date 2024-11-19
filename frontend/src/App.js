import React,{useEffect,useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import MainSection from './components/MainSection';
import BlogPage from './components/blogs';
import LoginPage from './components/login';
import Footer from './components/footer';
import SignUpPage from './components/signup';
import AboutPage from './components/about';
import MyBlogs from './components/MyBlogs';
import ProtectedRoute
 from './components/protectedRoute';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    setIsAuthenticated(false); 
    toast.info('Logged out successfully!');
  };

  return (
    <div style={styles.container}> 
      <Router>
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
        <div style={styles.content}> 
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route
              path="/login"
              element={<LoginPage setAuthStatus={setIsAuthenticated} />}
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Protected Routes */}
            <Route
              path="/blogs"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <BlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myblogs"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MyBlogs />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
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
