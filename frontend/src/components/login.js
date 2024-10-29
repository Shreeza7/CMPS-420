import React from 'react';

const LoginPage = () => {
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
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input 
                type="password" 
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>

            <button style={styles.button}>
              Login
            </button>
            
            <div style={styles.links}>
              <p style={styles.linkText}>
                Don't have an account? <a href="#" style={styles.link}>Sign up</a>
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
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F4F1DE',
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
    maxWidth: '400px',
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
