import React, { useState } from 'react';
import Modal from './Modal';

function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };

  return (
    <div className="bg-black text-white p-8 font-sans min-h-screen">
      <div className="text-center text-4xl md:text-6xl font-extrabold leading-tight mb-12">
        CONTACT
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
        {/* Get In Touch */}
        <div className="p-6 bg-gray-900 border-2 border-green-700">
          <h3 className="text-2xl font-bold mb-2">CONTACT</h3>
          <p className="text-gray-400 mt-2 text-sm">
            For all general enquiries—we’re here to help.
          </p>
          <button
            onClick={() => openModal('general')}
            className="w-full bg-white text-black py-4 px-6 font-bold text-lg mt-6 hover:bg-gray-200 transition-colors duration-200"
          >
            GET IN TOUCH
          </button>
        </div>

        {/* Submit a Tip */}
        <div className="p-6 bg-gray-900 border-2 border-red-600">
          <h3 className="text-2xl font-bold mb-2">WHISTLEBLOW?</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Send us your evidence of corporate greed safely and secretly.
          </p>
          <button
            onClick={() => openModal('whistleblow')}
            className="w-full bg-white text-black py-4 px-6 font-bold text-lg mt-6 hover:bg-gray-200 transition-colors duration-200"
          >
            SUBMIT A TIP
          </button>
        </div>

        {/* Media Enquiries */}
        <div className="p-6 bg-gray-900 border-2 border-yellow-400">
          <h3 className="text-2xl font-bold mb-2">MEDIA ENQUIRIES</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Journalists, reach out for press kits and information.
          </p>
          <button
            onClick={() => openModal('media')}
            className="w-full bg-white text-black py-4 px-6 font-bold text-lg mt-6 hover:bg-gray-200 transition-colors duration-200"
          >
            CONTACT PR TEAM
          </button>
        </div>

        {/* Join Us */}
        <div className="p-6 bg-gray-900 border-2 border-blue-600">
          <h3 className="text-2xl font-bold mb-2">VOLUNTEER WITH GPX</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Join the movement and help us fight back.
          </p>
          <button
            onClick={() => openModal('volunteer')}
            className="w-full bg-white text-black py-4 px-6 font-bold text-lg mt-6 hover:bg-gray-200 transition-colors duration-200"
          >
            JOIN US
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} type={modalType} />
    </div>
  );
}

export default ContactPage;