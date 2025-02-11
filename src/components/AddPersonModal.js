import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddPersonModal({ show, onClose, onSave }) {
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(false);

  const handleSave = () => {
    if (fullName.trim() === '') {
      setError(true);
      return;
    }
    onSave(fullName);
    setFullName('');
    setError(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Kişi Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFullName">
            <Form.Label>Ad Soyad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ad Soyad giriniz"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              isInvalid={error}
            />
            <Form.Control.Feedback type="invalid">
              Ad Soyad alanı zorunludur.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          İptal
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddPersonModal;
