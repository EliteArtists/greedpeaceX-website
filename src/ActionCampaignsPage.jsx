import React, { useState } from 'react';
import Modal from './Modal';
import ShareModal from './ShareModal';

function ActionCampaignsPage() {
  const [isPetitionModalOpen, setIsPetitionModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openPetitionModal = (campaignName) => {
    setModalType(campaignName);
    setIsPetitionModalOpen(true);
  };

  const closePetitionModal = () => {
    setIsPetitionModalOpen(false);
    setModalType('');
  };

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <div className="bg-black text-white p-8 font-sans min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
          IT'S TIME TO FIGHT<br/>BACK. HERE'S HOW
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Every campaign targets corporate greed. Every action counts.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-3xl font-bold mb-8">CURRENT CAMPAIGNS</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          
          {/* Box 1 (Red): The Real Cost Of Green campaign. */}
          <div className="p-6 bg-gray-900 border-2 border-red-600 flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">THE REAL COST<br/>OF GREEN</h3>
              <p className="text-gray-400 mt-4 text-sm md:text-base">
                Demand transparency from M&S on packaging profits.
              </p>
            </div>
            <div className="flex flex-col space-y-4 mt-6">
              <button
                onClick={() => openPetitionModal('realcost')}
                className="w-full bg-white text-black py-4 px-6 font-bold text-lg hover:bg-gray-200 transition-colors duration-200"
              >
                SIGN THE PETITION
              </button>
              <button
                onClick={openShareModal}
                className="w-full bg-black text-white border-2 border-white py-4 px-6 font-bold text-lg hover:bg-gray-800 transition-colors duration-200"
              >
                SHARE THE CAMPAIGN
              </button>
            </div>
          </div>

          {/* Box 2 (Yellow): THE INVISIBLE HAND */}
          <div className="p-6 bg-gray-900 border-2 border-yellow-400 flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">THE INVISIBLE<br/>HAND</h3>
              <p className="text-gray-400 mt-4 text-sm md:text-base">
                Expose the monopolies controlling food, energy, and rent.
              </p>
            </div>
            <div className="flex flex-col space-y-4 mt-6">
              <button
                onClick={() => openPetitionModal('invisiblehand')}
                className="w-full bg-white text-black py-4 px-6 font-bold text-lg hover:bg-gray-200 transition-colors duration-200"
              >
                SIGN THE PETITION
              </button>
              <button
                onClick={openShareModal}
                className="w-full bg-black text-white border-2 border-white py-4 px-6 font-bold text-lg hover:bg-gray-800 transition-colors duration-200"
              >
                SHARE THE CAMPAIGN
              </button>
            </div>
          </div>

          {/* Box 3 (Blue): Corporate PR Firms */}
          <div className="p-6 bg-gray-900 border-2 border-blue-600 flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">WEAPONIZING THE<br/>TRUTH</h3>
              <p className="text-gray-400 mt-4 text-sm md:text-base">
                Investigate how corporate PR firms distort public information.
              </p>
            </div>
            <div className="flex flex-col space-y-4 mt-6">
              <button
                onClick={() => openPetitionModal('weaponizingtruth')}
                className="w-full bg-white text-black py-4 px-6 font-bold text-lg hover:bg-gray-200 transition-colors duration-200"
              >
                SIGN THE PETITION
              </button>
              <button
                onClick={openShareModal}
                className="w-full bg-black text-white border-2 border-white py-4 px-6 font-bold text-lg hover:bg-gray-800 transition-colors duration-200"
              >
                SHARE THE CAMPAIGN
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white text-center p-4 mt-12">
        <h2 className="text-2xl font-bold">GREED ONLY WINS IF WE STAY SILENT. TAKE ACTION TODAY.</h2>
      </div>

      <Modal isOpen={isPetitionModalOpen} onClose={closePetitionModal} type={modalType} isPetition={true} />
      <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
    </div>
  );
}

export default ActionCampaignsPage;