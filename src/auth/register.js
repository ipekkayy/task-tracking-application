import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 

const Register = () => {
  const [fullName, setFullName] = useState(''); 
  const [tckn, setTckn] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateTCKN(tckn)) {
      setError('Geçerli bir T.C. Kimlik Numarası giriniz.');
      return;
    }

    if (password.length < 4) {
      setError('Şifre en az 4 karakter olmalıdır.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler uyuşmuyor.');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ fullName, tckn, password }));
    setSuccess('Kayıt başarılı! Giriş yapabilirsiniz.');
    setError('');
    
    setTimeout(() => {
      navigate('/login');
    }, 1000);

  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="p-4 shadow rounded bg-white" style={{ width: '400px' }}>
        <div className="text-center mb-4">
          <a href="javascript:;" className="font-size-lg">
            <b>LOGO</b>
          </a>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label className="text-dark font-size-sl">
              <b>Ad Soyad</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ad Soyad giriniz"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
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
              <b>Şifre Oluştur</b>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label className="text-dark font-size-sl">
              <b>Şifreyi Doğrula</b>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Şifrenizi tekrar girin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Kayıt Ol
          </Button>
          <div className="text-center mt-4">
            <Link to="/login" className="text-primary">
              Zaten bir hesabınız var mı? Giriş Yap
            </Link>
          </div>
        </Form>
      </div>
    </div >
  );
};

const validateTCKN = (tckn) => {
  return /^[1-9][0-9]{10}$/.test(tckn);
};

export default Register;
