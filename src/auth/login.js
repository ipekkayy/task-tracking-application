import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Link bileşenini ekledik

const Login = ({ onLogin }) => {
  const [tckn, setTckn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateTCKN(tckn)) {
      setError('Geçerli bir T.C. Kimlik Numarası giriniz.');
      return;
    }

    if (password.length < 4) {
      setError('Şifre en az 4 karakter olmalıdır.');
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (!savedUser) {
      setError('Kayıtlı kullanıcı bulunamadı.');
      return;
    }

    if (savedUser.tckn === tckn && savedUser.password === password) {
      setError('');
      localStorage.setItem('isAuthenticated', 'true');
      onLogin();
    } else {
      setError('T.C. Kimlik No veya Şifre hatalı.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="p-4 shadow rounded bg-white" style={{ width: '400px' }}>
        <div className="text-center mb-4">
          <a href="javascript:;" className="font-size-lg">
            <b>LOGO</b>
          </a>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formTCKN">
            <Form.Label className="text-dark font-size-sl">
              <b>T.C. Kimlik Numarası</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="11 haneli TCKN girin"
              value={tckn}
              onChange={(e) => setTckn(e.target.value)}
              maxLength="11"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="text-dark font-size-sl">
              <b>Şifre</b>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Giriş Yap
          </Button>

          {/* Kayıt Ol linki */}
          <div className="text-center mt-4">
            <Link to="/register" className="text-primary">
              Hesabınız yok mu? Kayıt Ol
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

const validateTCKN = (tckn) => {
  return /^[1-9][0-9]{10}$/.test(tckn);
};

export default Login;
