import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function TaskDetailModal({ show, onClose, task, onSave, people, isReadOnly }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
            setAssignedTo(task.assignedTo);
        }
    }, [task]);

    const handleSave = () => {
        const updatedTask = {
            ...task,
            title,
            description,
            status,
            assignedTo,
        };
        onSave(updatedTask); 
        onClose();  
    };

    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Görev Detayları</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="taskTitle">
                        <Form.Label><b>Başlık</b></Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            readOnly={isReadOnly}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="taskDescription">
                        <Form.Label><b>Açıklama</b></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            readOnly={isReadOnly}
                        />
                    </Form.Group>
                    <div className="row">
                        <div className="col-6">
                            <Form.Group className="mb-3" controlId="taskStatus">
                                <Form.Label><b>Durum</b></Form.Label>
                                <Form.Select className="status-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    disabled={isReadOnly}>
                                    <option>Yeni</option>
                                    <option>Devam Eden</option>
                                    <option>Tamamlanan</option>
                                    <option>Silinen</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="mb-3" controlId="assignedTo">
                                <Form.Label><b>Görevi Ata</b></Form.Label>
                                <Form.Select value={assignedTo?.name || ''}
                                    onChange={(e) => {
                                        const selectedPerson = people.find(person => person.name === e.target.value);
                                        setAssignedTo(selectedPerson);
                                    }}
                                    disabled={isReadOnly}
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Kapat</Button>
                {!isReadOnly && (
                    <Button variant="primary" onClick={handleSave}>Kaydet</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default TaskDetailModal;
