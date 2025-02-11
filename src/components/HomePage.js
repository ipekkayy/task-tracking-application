import React, { useState, useEffect, useRef } from 'react';
import TaskModal from './TaskModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import TaskDetailModal from './TaskDetailModal';
import AddPersonModal from './AddPersonModal';
import EditPersonModal from './EditPersonModal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function HomePage({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [tasks, setTasks] = useState({
    'Yeni': [],
    'Devam Eden': [],
    'Tamamlanan': [],
    'Silinen': []
  });
  const [currentStatus, setCurrentStatus] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const dropdownRef = useRef(null);
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    const savedPeople = JSON.parse(localStorage.getItem('people')) || [];
    if (savedPeople) {
      try {
        const parsedPeople = JSON.parse(savedPeople);
        if (Array.isArray(parsedPeople)) {
          setPeople(parsedPeople);
        }
      } catch (error) {
        console.error('Kişi verileri yüklenirken hata oluştu:', error);
      }
    }
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.fullName) {
      const newUser = {
        name: savedUser.fullName,
        color: getRandomSoftColor()
      };
      const userExists = savedPeople.some(person => person.name === savedUser.fullName);
      if (!userExists) {
        const updatedPeople = [...savedPeople, newUser];
        setPeople(updatedPeople);
        localStorage.setItem('people', JSON.stringify(updatedPeople));
      } else {
        setPeople(savedPeople);
      }
    } else {
      setPeople(savedPeople);
    }
  }, []);

  const savePeopleToLocalStorage = (updatedPeople) => {
    localStorage.setItem('people', JSON.stringify(updatedPeople));
  };

  const saveTasksToLocalStorage = (tasksToSave) => {
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  };

  const openPersonModal = () => {
    setIsPersonModalOpen(true);
  };

  const closePersonModal = () => {
    setIsPersonModalOpen(false);
  };
  const openEditModal = (person) => {
    setSelectedPerson(person);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPerson(null);
  };

  const openModal = (status) => {
    setCurrentStatus(status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const addPerson = (fullName) => {
    const color = getRandomSoftColor();
    const newPerson = { name: fullName, color };

    const updatedPeople = [...people, newPerson];
    setPeople(updatedPeople);
    savePeopleToLocalStorage(updatedPeople);
  };

  const updatePerson = (updatedPerson) => {
    const updatedPeople = people.map(person =>
      person.name === selectedPerson.name ? updatedPerson : person
    );
    setPeople(updatedPeople);
    savePeopleToLocalStorage(updatedPeople);
    closeEditModal();
  };

  const deletePerson = (personToDelete) => {
    const updatedPeople = people.filter(person => person.name !== personToDelete.name);
    setPeople(updatedPeople);
    savePeopleToLocalStorage(updatedPeople);
    closeEditModal();
  };


  const addTask = (newTask) => {
    const updatedTasks = {
      ...tasks,
      [newTask.status]: [...tasks[newTask.status], newTask]
    };
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setIsModalOpen(false);
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);

  };

  const updateTask = (updatedTask) => {
    const oldStatus = selectedTask.status;
    const newStatus = updatedTask.status;

    let updatedTasks = { ...tasks };

    if (oldStatus !== newStatus) {
      updatedTasks[oldStatus] = updatedTasks[oldStatus].filter(task => task !== selectedTask);
      updatedTasks[newStatus] = [...updatedTasks[newStatus], updatedTask];
    } else {
      updatedTasks[oldStatus] = updatedTasks[oldStatus].map(task =>
        task === selectedTask ? updatedTask : task
      );
    }

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteClick = (status, index) => {
    setTaskToDelete({ status, index });
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      const { status, index } = taskToDelete;

      const taskToMove = tasks[status][index];
      taskToMove.status = 'Silinen';

      const updatedTasks = {
        ...tasks,
        [status]: tasks[status].filter((_, taskIndex) => taskIndex !== index),
        'Silinen': [...tasks['Silinen'], taskToMove]
      };

      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const getRandomSoftColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70;
    const lightness = 80;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div className="homepage-container">
      <header className="bg-dark py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 text-start">
              <a href="#" className="text-white font-size-lg">
                <b>LOGO</b>
              </a>
            </div>
            <div className="col-6 text-end position-relative" ref={dropdownRef}>
              <a href="#" className="me-4" onClick={() => setIsOpen(!isOpen)}>
                <i className="fa-solid fa-circle-user"></i>
              </a>
              {isOpen && (
                <div className="dropdown-menu show" style={{ position: 'absolute', right: '10px', top: '50px' }}>
                  <a className="dropdown-item text-danger cursor-pointer" onClick={onLogout}>Çıkış Yap</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-4">
        <div>
          <div className="d-flex align-items-center">
            <button className="btn btn-sm btn-success d-flex align-items-center ms-3" onClick={openPersonModal}>Kişi Ekle
              <i class="fa-solid fa-circle-plus ms-3 font-size-ml"></i>
            </button>
            <div className="d-flex align-items-center ms-5">
              {people.map((person, index) => (
                <OverlayTrigger
                  key={index}
                  placement="top"
                  overlay={<Tooltip id={`tooltip-person-${index}`}>{person?.name || 'Bilinmeyen'}</Tooltip>}>
                  <div className="user-div" style={{ backgroundColor: person?.color || '#ccc' }}
                    onClick={() => openEditModal(person)}>
                    {person?.name ? person.name.charAt(0).toUpperCase() : '?'}
                  </div>
                </OverlayTrigger>
              ))}
            </div>
          </div>
          <div className="row mt-4 text-start mx-0 w-100">
            {['Yeni', 'Devam Eden', 'Tamamlanan', 'Silinen'].map((status, index) => (
              <div className="col-lg-3 new-card mb-3" key={index}>
                <div className="new-card-element">
                <div className="bg-dark p-3 radius-5">
                  <div>{status}</div>
                  {status !== 'Silinen' && (
                    <div className="position-relative add-card mt-2" onClick={() => openModal(status)}>
                      <i className="fa-solid fa-plus position-absolute"></i>
                      <button className="py-2 bg-dark text-white btn w-100 text-start">
                        Kart Ekle
                      </button>
                    </div>
                  )}
                </div>

                {tasks[status].map((task, taskIndex) => (
                  <OverlayTrigger
                    key={taskIndex}
                    placement="top"
                    overlay={<Tooltip id={`tooltip-edit-${taskIndex}`}>Görevi Düzenle</Tooltip>}
                  >
                    <div
                      className={`task-card p-3 mt-3 position-relative cursor-pointer ${task.status === 'Silinen' ? 'bg-secondary text-white' : ''}`}
                      onClick={() => handleCardClick(task)}
                    >
                      <div className="task-title">{task.title}</div>

                      {task.status !== 'Silinen' && (
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id={`tooltip-delete-${taskIndex}`}>Görevi Sil</Tooltip>}
                        >
                          <i
                            className="fa-solid fa-circle-minus position-absolute text-danger"
                            style={{ right: '10px', top: '10px', cursor: 'pointer' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(status, taskIndex);
                            }}
                          ></i>
                        </OverlayTrigger>
                      )}
                    </div>
                  </OverlayTrigger>
                ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={addTask}
        defaultStatus={currentStatus}
        people={people}
      />

      <EditPersonModal
        show={isEditModalOpen}
        onClose={closeEditModal}
        person={selectedPerson}
        onSave={updatePerson}
        onDelete={deletePerson}
      />

      {selectedTask && (
        <TaskDetailModal
          show={selectedTask !== null}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
          onSave={updateTask}
          people={people}
          isReadOnly={selectedTask.status === 'Silinen'}
        />
      )}

      <ConfirmDeleteModal
        show={taskToDelete !== null}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <AddPersonModal
        show={isPersonModalOpen}
        onClose={closePersonModal}
        onSave={addPerson}
      />
    </div>
  );
}

export default HomePage;
