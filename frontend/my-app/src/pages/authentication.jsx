import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Authentication() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState(0); // 0 for login, 1 for register

  const { handleRegister, handleLogin } = useContext(AuthContext);

  const handleAuth = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      if (formState === 0) {
        // Handle login
        await handleLogin(username, password);
        // Optionally redirect or show success message
      } else if (formState === 1) {
        // Handle registration
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setError('');
        setUsername('');
        setPassword('');
        setName('');
        // Optionally redirect or show success message
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{formState === 0 ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={handleAuth}>
          {formState === 1 && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{formState === 0 ? 'Sign In' : 'Sign Up'}</button>
          <div className="links">
            <a href="#" onClick={() => setFormState(formState === 0 ? 1 : 0)}>
              {formState === 0 ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </a>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Authentication;
