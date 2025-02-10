import React, { useState, useEffect, useRef } from 'react';
import TaskModal from './TaskModal';

function HomePage() {

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="homepage-container">
      <header className="bg-dark py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 text-start">
              <a href="javascript:;" className="text-white font-size-lg">
                <b>LOGO</b>
              </a>
            </div>
            <div className="col-6 text-end position-relative" ref={dropdownRef}>
              <a href="#" className="me-4" onClick={() => setIsOpen(!isOpen)}>
                <i className="fa-solid fa-circle-user"></i>
              </a>
              {isOpen && (
                <div className="dropdown-menu show" style={{ position: 'absolute', right: '10px', top: '50px' }}>
                  <a className="dropdown-item" href="#">Hesabım</a>
                  <a className="dropdown-item text-danger" href="#">Çıkış Yap</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="container mt-4">
        <div className="text-start ps-3">
          <button className="btn btn-warning">Yeni Görev Ekle</button>
        </div>
        <div>
          <div className="row mt-4 text-start mx-0 w-100">
            {['Yeni', 'Devam Eden', 'Tamamlanan', 'Silinen'].map((status, index) => (
              <div className="col-md-3 new-card" key={index}>
                <div className="bg-dark p-3 radius-5">
                  <div>
                    <div>{status}</div>
                  </div>
                  {status !== 'Silinen' && (
                    <div className="position-relative add-card mt-2" onClick={openModal}>
                      <i class="fa-solid fa-plus position-absolute"></i>
                      <button className="py-2 bg-dark text-white btn w-100 text-start">
                        Kart Ekle
                      </button>
                    </div>
                  )}
                </div>
                <div className="task-card p-3 mt-3 position-relative cursor-pointer">
                  <div className="task-title">
                    Başlık  Başlık  Başlık  Başlık Başlık Başlık Başlık
                  </div>
                  <i class="fa-solid fa-pen position-absolute"></i>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
      <TaskModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default HomePage;
