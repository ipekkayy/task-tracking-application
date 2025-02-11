import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function TaskModal({ isOpen, onClose, onSave, defaultStatus, people }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState(defaultStatus);
  const [assignedTo, setAssignedTo] = useState('');

  const [errors, setErrors] = useState({
    title: false,
    description: false
  });

  useEffect(() => {
    setTaskStatus(defaultStatus);
  }, [defaultStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const titleError = taskTitle.trim() === '';
    const descriptionError = taskDescription.trim() === '';

    if (titleError || descriptionError) {
      setErrors({
        title: titleError,
        description: descriptionError
      });
      return; 
    }

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      assignedTo: assignedTo,
    };
    onSave(newTask);
    resetForm();
  };

  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setAssignedTo('');
    setErrors({ title: false, description: false }); 
  };

  return (
    <Modal
      size="lg"
      show={isOpen}
      onHide={onClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Görev Ekle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="taskTitle">
            <Form.Label><b>Başlık</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Görev başlığı girin"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              isInvalid={errors.title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskDescription">
            <Form.Label><b>Açıklama</b></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Görev açıklaması girin"
              value={taskDescription}
              required
              onChange={(e) => setTaskDescription(e.target.value)}
              isInvalid={errors.description}
            />
          </Form.Group>
          <div className="row">
            <div className="col-6">
              <Form.Group className="mb-3" controlId="taskStatus">
                <Form.Label><b>Durum</b></Form.Label>
                <Form.Select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <option>Yeni</option>
                  <option>Devam Eden</option>
                  <option>Tamamlanan</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-6">
            <Form.Group className="mb-3" controlId="assignedTo">
            <Form.Label>Görevi Ata</Form.Label>
            <Form.Select
              value={assignedTo?.name || ''}
              onChange={(e) => {
                const selectedPerson = people.find(person => person.name === e.target.value);
                setAssignedTo(selectedPerson);
              }}
            >
              <option value="">Kişi Seçin</option>
              {people.map((person, index) => (
                <option key={index} value={person.name}>
                  {person.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
            </div>
          </div>
          <div className="text-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              İptal
            </Button>
            <Button variant="primary" type="submit">
              Kaydet
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TaskModal;
