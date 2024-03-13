import React, { useState, useEffect } from 'react';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10'
      );
      const data = await response.json();
      setJokes(data.jokes);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy validation, replace with actual validation logic
    if (username === 'dummy' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const renderLogin = () => (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );

  const renderJokes = () => (
    <>
      <button onClick={handleLogout}>Logout</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Joke</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{joke}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div className="container">
      <h1>Jokes App</h1>
      {loggedIn ? renderJokes() : renderLogin()}
    </div>
  );
};

export default App;
