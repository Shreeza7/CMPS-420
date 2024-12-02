import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { toast } from 'react-toastify';

const LoginPage = ({ setAuthStatus }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handles saving any pending blog content after successful login
  const handlePendingBlog = () => {
    try {
      const pendingBlog = sessionStorage.getItem('pendingBlog');
      if (pendingBlog) {
        const blogData = JSON.parse(pendingBlog);
        const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        
        // Create new post with unique ID
        const newPost = {
          ...blogData,
          id: Date.now().toString()
        };
        
        localStorage.setItem("blogPosts", JSON.stringify([...existingPosts, newPost]));
        sessionStorage.removeItem('pendingBlog');
        toast.success('Your blog post has been saved!');
        navigate('/myblogs');
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error handling pending blog:", error);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setAuthStatus(true);
        toast.success('Login successful!');
        
        // Check for pending blog and handle accordingly
        const hasPendingBlog = handlePendingBlog();
        if (!hasPendingBlog) {
          navigate('/');
        }
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Login</h2>
          <form onSubmit={handleLogin} style={styles.formFields}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input 
                id="email"
                type="email" 
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Mail style={styles.inputIcon} size={20} />
            </div>
            
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input 
                id="password"
                type="password" 
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.button,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            
            <div style={styles.links}>
              <p style={styles.linkText}>
                Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
              </p>
              <p style={styles.linkText}>
                <Link to="/forgot-password" style={styles.link}>Forgot your password?</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

// Styles object
const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  formContainer: {
    backgroundColor: '#D9D2C5',
    borderRadius: '0.5rem',
    padding: '2rem',
    width: '100%',
    maxWidth: '350px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    gap: '0.25rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4B5563',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: '1px solid #D1D5DB',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inputIcon: {
    position: 'absolute',
    right: '0.75rem',
    top: '65%',
    transform: 'translateY(-50%)',
    color: '#8b7355',
    pointerEvents: 'none',
  },
  button: {
    width: '100%',
    backgroundColor: '#F28A2E',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '1rem',
  },
  links: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  linkText: {
    fontSize: '0.875rem',
    color: '#4B5563',
    margin: 0,
  },
  link: {
    color: '#F28A2E',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
};

export default LoginPage;
