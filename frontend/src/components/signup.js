/*import React, { useState } from 'react';
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
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <h1 style={styles.logo}>Blog Writer</h1>
          <div style={styles.navLinks}>
            <a href="#" style={styles.navLink}>Home</a>
            <a href="#" style={styles.navLink}>Blogs</a>
            <a href="#" style={styles.navLink}>My Blogs</a>
            <a href="#" style={styles.navLink}>About</a>
            <a href="#" style={styles.navLink}>Login</a>
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Sign Up</h2>
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputContainer}>
              <input
                type="text"
                placeholder="Full Name"
                style={styles.input}
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div style={styles.inputContainer}>
              <input
                type="email"
                placeholder="Email"
                style={styles.input}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <Mail style={styles.inputIcon} size={20} />
            </div>

            <div style={styles.inputContainer}>
              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <Lock style={styles.inputIcon} size={20} />
            </div>

            <button style={styles.button}>Sign Up</button>
          </form>

          <div style={styles.formFooter}>
            <p style={styles.formFooterText}>Already have an account? 
              <a href="#" style={styles.footerLink}> Sign in</a>
            </p>
            <p style={styles.formFooterText}>
              <a href="#" style={styles.footerLink}>Forgot your password?</a>
            </p>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2024 Blog Writer. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f7f3e3',
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
  },
  nav: {
    backgroundColor: '#8b7355', 
    padding: '1rem',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  formCard: {
    backgroundColor: '#e6e1d3', 
    padding: '2.5rem',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#4a4a4a',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '0.875rem',
    paddingRight: '2.5rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: 'white',
    boxSizing: 'border-box',
  },
  inputIcon: {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#8b7355', 
  },
  button: {
    width: '100%',
    padding: '0.875rem',
    backgroundColor: '#e67e22', 
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '0.5rem',
  },
  formFooter: {
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  formFooterText: {
    color: '#666',
    margin: '0.5rem 0',
  },
  footerLink: {
    color: '#8b7355', 
    textDecoration: 'none',
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#8b7355', 
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
  },
};

export default SignUpPage;*/