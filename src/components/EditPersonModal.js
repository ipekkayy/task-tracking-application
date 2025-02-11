import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditPersonModal = ({ show, onClose, person, onSave, onDelete }) => {
  const [fullName, setFullName] = useState('');
  const [tckn, setTckn] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (person) {
      setFullName(person.name || '');
      setTckn(person.tckn || '');
      setPassword(person.password || '');
    }
  }, [person]);

  const handleSave = () => {
    const updatedPerson = { ...person, name: fullName, tckn, password };
    onSave(updatedPerson);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Kişiyi Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label>Ad Soyad</Form.Label>
            <Form.Control
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ad Soyad"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTCKN">
            <Form.Label>T.C. Kimlik No</Form.Label>
            <Form.Control
              type="text"
              value={tckn}
              onChange={(e) => setTckn(e.target.value)}
              placeholder="11 haneli T.C. Kimlik No"
              maxLength="11"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Şifre</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => onDelete(person)}>
          Kişiyi Sil
        </Button>
        <Button variant="secondary" onClick={onClose}>
          İptal
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPersonModal;
