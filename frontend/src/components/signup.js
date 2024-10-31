import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Sign Up</h2>
          
          <form onSubmit={handleSubmit} style={styles.formFields}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                style={styles.input}
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                style={styles.input}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <Mail style={styles.inputIcon} size={20} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                style={styles.input}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <Lock style={styles.inputIcon} size={20} />
            </div>

            <button style={styles.button}>Sign Up</button>
          </form>

          <div style={styles.links}>
            <p style={styles.linkText}>Already have an account? 
              <Link to="/login" style={styles.link}> Sign in</Link>
            </p>
            <p style={styles.linkText}>
              <Link to="/forgot-password" style={styles.link}>Forgot your password?</Link>
            </p>
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
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
  },
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
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
    ':hover': {
      textDecoration: 'underline',
    },
  },
};

export default SignUpPage;
