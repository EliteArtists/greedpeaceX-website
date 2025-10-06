import React from 'react';

function ShareModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // These links will share the current page URL
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${window.location.href}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${window.location.href}`,
    email: `mailto:?subject=Check%20out%20this%20campaign!&body=${window.location.href}`,
    whatsapp: `https://api.whatsapp.com/send?text=${window.location.href}`,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">Share the Campaign</h2>
        <p className="text-center text-gray-600 mb-6">Spread the message and make a difference.</p>

        <div className="flex justify-center space-x-6">
          <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
            <img src="https://www.svgrepo.com/show/365287/twitter.svg" alt="Twitter" className="w-10 h-10" />
          </a>
          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
            <img src="https://www.svgrepo.com/show/365261/facebook.svg" alt="Facebook" className="w-10 h-10" />
          </a>
          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <img src="https://www.svgrepo.com/show/365289/linkedin.svg" alt="LinkedIn" className="w-10 h-10" />
          </a>
          <a href={shareLinks.email}>
            <img src="https://www.svgrepo.com/show/365259/email.svg" alt="Email" className="w-10 h-10" />
          </a>
          <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
            <img src="https://www.svgrepo.com/show/365293/whatsapp.svg" alt="WhatsApp" className="w-10 h-10" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;