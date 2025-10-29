import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

function SupportMissionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  // Define the live Stripe URLs
  const STRIPE_URLS = {
    '1': "https://buy.stripe.com/eVqeVf3Fr6nH0I5gY56Na07",
    '3': "https://donate.stripe.com/6oUbJ36RDeUdduRcHP6Na08",
    '5': "https://donate.stripe.com/00wcN7a3P4fzfCZazH6Na09",
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };

  return (
    <div className="bg-black text-white p-8 font-sans">
      <div className="text-center text-4xl md:text-6xl font-extrabold leading-tight mb-8">
        <span className="text-yellow-400">CORPORATE GREED</span> WON'T STOP ITSELF
        <div className="text-white mt-2">WE NEED YOU</div>
      </div>
      <p className="text-center text-lg md:text-xl max-w-2xl mx-auto mb-12">
        YOUR SUPPORT FUNDS INVESTIGATIONS, LEGAL BATTLES, AND FRONTLINE RESISTANCE
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
        {/* Join the Movement Column */}
        <div className="p-6 bg-gray-900 border-2 border-green-700 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">JOIN THE<br/>MOVEMENT</h3>
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              Receive updates and calls to action
            </p>
          </div>
          <button
            onClick={() => openModal('signup')}
            className="w-full bg-white text-black py-4 px-6 font-bold text-lg md:text-xl mt-4 hover:bg-gray-200 transition-colors duration-200"
          >
            SIGN UP FOR FREE
          </button>
        </div>

        {/* Fund Investigations Column - Uses LIVE Stripe URLs */}
        <div className="p-6 bg-gray-900 border-2 border-yellow-400 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">FUND<br/>INVESTIGATIONS</h3>
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              Power the work with a monthly donation
            </p>
          </div>
          <div className="flex flex-col space-y-4 mt-6">
            {/* Donation Buttons converted to Links, using Stripe URLs */}
            <Link to={STRIPE_URLS['1']} target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black py-4 px-6 font-bold text-lg hover:bg-gray-200 transition-colors duration-200 no-underline">
              £1/mo
            </Link>
            <Link to={STRIPE_URLS['3']} target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black py-4 px-6 font-bold text-lg hover:bg-gray-200 transition-colors duration-200 no-underline">
              £3/mo
            </Link>
            <Link to={STRIPE_URLS['5']} target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black py-4 px-6 font-bold text-lg hover:bg-gray-200 transition-colors duration-200 no-underline">
              £5/mo
            </Link>
          </div>
        </div>

        {/* Be a Patron Column */}
        <div className="p-6 bg-gray-900 border-2 border-blue-600 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">BE A<br/>PATRON OF<br/>JUSTICE</h3>
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              Help amplify our mission as an influencer
            </p>
          </div>
          <button
            onClick={() => openModal('patron')}
            className="w-full bg-white text-black py-4 px-6 font-bold text-lg md:text-xl mt-4 hover:bg-gray-200 transition-colors duration-200"
          >
            FORMALISE<br/>YOUR SUPPORT
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} type={modalType} />
    </div>
  );
}

export default SupportMissionPage;
