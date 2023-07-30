import { useState } from 'react';
import Login from './components/Login';
import Trans from './components/Trans';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Trans />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
