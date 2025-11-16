import React from 'react';

// SVG Icons from Heroicons/Tailwind (Simplified)
const ShareIcons = {
    X: ({ size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.901 1.153h3.684l-8.73 10.916 10.741 12.595h-2.457l-9.185-10.667L2.833 23.47H1.365l9.261-10.871L0 1.153h2.158l7.667 9.59L18.901 1.153zm-3.181 18.069h3.332L6.822 4.411H3.59z" />
        </svg>
    ),
    Facebook: ({ size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4V8.345c0-.573.166-.957.953-1.042L13 7V3.5h4c.002.046 0 .092 0 .138v3c0 .092-.008.184-.025.275C16.89 6.942 16.593 7 16.082 7H13c-2.31 0-2.348 1.054-2.348 2.217V12h5l.5-4z" />
        </svg>
    ),
    LinkedIn: ({ size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.335-4 0v5.604h-3v-11h3v1.765c1.395-2.43 7-2.404 7 2.724v6.511z" />
        </svg>
    ),
    Mail: ({ size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 6c0-1.104-.896-2-2-2h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12zm-20 0h20l-10 8.5-10-8.5z" />
        </svg>
    ),
    WhatsApp: ({ size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 2.5a9.5 9.5 0 0 0-8.91 13.06l-1.07 3.96 4.04-1.05a9.5 9.5 0 0 0 13.91-8.55 9.5 9.5 0 0 0-7.97-9.42zm4.72 13.78c-.28.4-.73.49-1.07.47a1.6 1.6 0 0 1-1.3-.61c-.51-.62-1.34-2.18-1.58-2.61-.25-.43-.01-.66.19-.85a.7.7 0 0 0 .32-.61c.02-.21-.07-.38-.17-.55l-.4-.68c-.14-.23-.3-.4-.5-.54a1.76 1.76 0 0 0-1.4-.41c-.49.03-.83.18-1.15.5-.32.32-.78.69-1 .85-.23.16-.48.42-.62.58-.2.24-.43.52-.62.77-.32.42-.56.9-.7 1.4-.14.5.02 1.05.5 1.5l.38.35c.16.14.36.26.54.37.18.1.37.2.57.28.2.08.4.15.6.15.55 0 1.08-.2 1.48-.42.4-.22.75-.6.94-.85.19-.25.32-.48.46-.66.13-.18.23-.37.3-.57l.08-.22z"/>
        </svg>
    )
};

function ShareModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // The base URL for the current campaign is the live site's URL
  // NOTE: This will share the *current* page the user is viewing.
  const shareUrl = encodeURIComponent(window.location.href); 
  const shareText = encodeURIComponent("I just read this incredible investigation from GreedPeaceX: "); // Simpler text for subject lines
  const fullShareText = encodeURIComponent("I just read this incredible investigation from GreedPeaceX. It’s time to fight back against corporate greed. #GreedPeaceX #ActionCampaign");

  const shareLinks = {
    X: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${fullShareText}`,
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    LinkedIn: `https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${shareText}&summary=${fullShareText}`, // Added title/summary for LinkedIn clarity
    // FIX: Using a simple subject and moving the full text/URL into the body for Mail
    Mail: `mailto:?subject=${shareText}&body=${fullShareText}%0A%0A${window.location.href}`, // %0A is a line break
    WhatsApp: `https://wa.me/?text=${fullShareText}%20${shareUrl}`, // Using wa.me API endpoint is often more reliable
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
          
          {/* X (Twitter) */}
          <a href={shareLinks.X} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-500 transition-colors duration-200">
            <ShareIcons.X />
          </a>
          
          {/* Facebook */}
          <a href={shareLinks.Facebook} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-600 transition-colors duration-200">
            <ShareIcons.Facebook />
          </a>
          
          {/* LinkedIn */}
          <a href={shareLinks.LinkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-700 transition-colors duration-200">
            <ShareIcons.LinkedIn />
          </a>
          
          {/* Mail */}
          <a href={shareLinks.Mail} className="text-gray-900 hover:text-red-600 transition-colors duration-200">
            <ShareIcons.Mail />
          </a>
          
          {/* WhatsApp */}
          <a href={shareLinks.WhatsApp} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-green-500 transition-colors duration-200">
            <ShareIcons.WhatsApp />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
