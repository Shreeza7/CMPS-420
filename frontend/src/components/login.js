import {useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Mail} from 'lucide-react';
import { toast } from 'react-toastify';

const LoginPage = ({ setAuthStatus }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        localStorage.setItem('authToken', result.token); 
        setAuthStatus(true);
        setEmail(''); 
        setPassword(''); 
        navigate('/'); 
      } else {
        toast.error(result.error || 'Login failed.');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
      console.error('Error:', error);
    }
  };
  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Login</h2>
          <div style={styles.formFields}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input 
                type="email" 
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail style={styles.inputIcon} size={20} /> 
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input 
                type="password" 
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button style={styles.button}onClick={handleLogin}>
              Login
            </button>
            
            <div style={styles.links}>
              <p style={styles.linkText}>
                Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
              </p>
              <p style={styles.linkText}>
                <a href="#" style={styles.link}>Forgot your password?</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

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
  },
  input: {
    width: '100%',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: '1px solid #D1D5DB',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
      borderColor: '#F28A2E',
    },
  },
  inputIcon: {
    position: 'absolute',
    right: '0rem',
    top: '65%',
    transform: 'translateY(-50%)',
    color: '#8b7355', 
    pointerEvents: 'none',
  },
  button: {
    width: '100%',
    backgroundColor: '#F28A2E',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#E07A1E',
    },
  },
  links: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  linkText: {
    fontSize: '0.875rem',
    color: '#4B5563',
    margin: 0,
  },
  link: {
    color: '#F28A2E',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
};

export default LoginPage;
