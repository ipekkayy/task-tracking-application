import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmDeleteModal({ show, onConfirm, onCancel }) {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Görevi Sil</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bu görevi silmek istediğinize emin misiniz?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          İptal
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Sil
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDeleteModal;
