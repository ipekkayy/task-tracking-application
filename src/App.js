import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Login from './auth/login';
import Register from './auth/register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Eğer giriş yapılmışsa HomePage'e yönlendir */}
        {isAuthenticated ? (
          <Route path="/" element={<HomePage onLogout={handleLogout} />} />
        ) : (
          <>
            {/* Giriş yapılmamışsa Login ve Register sayfaları */}
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/register" element={<Register />} />
            {/* Herhangi bir geçersiz URL giriş ekranına yönlendirilir */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Giriş yapılmışsa login veya register sayfasına erişmeye çalışıldığında ana sayfaya yönlendir */}
        {isAuthenticated && (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
