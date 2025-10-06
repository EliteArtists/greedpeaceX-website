import React, { useState } from 'react';

function Modal({ isOpen, onClose, type, isPetition }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [interest, setInterest] = useState('');
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if ((!email && type !== 'whistleblow') ||
        (type === 'general' && !message) ||
        (type === 'media' && !affiliation) ||
        (type === 'media' && !message) ||
        (type === 'volunteer' && !phone) ||
        (type === 'volunteer' && !interest)
    ) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Log data for now. We will implement Supabase integration later.
    console.log(`Submitting form for: ${type}`);
    console.log('Email:', email);
    console.log('Phone:', phone);
    if (type === 'general' || type === 'whistleblow' || type === 'media') console.log('Message:', message);
    if (type === 'media') console.log('Affiliation:', affiliation);
    if (type === 'volunteer') console.log('Area of Interest:', interest);
    if (type === 'whistleblow' && file) console.log('File:', file.name);

    // Reset form fields
    setEmail('');
    setPhone('');
    setMessage('');
    setAffiliation('');
    setInterest('');
    setFile(null);
    
    // Close modal
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'signup': return 'Join the Movement';
      case 'patron': return 'Formalise Your Support';
      case 'greenwashing': return 'Sign the Petition: Greenwashing';
      case 'tesco': return 'Sign the Petition: Tesco Bags';
      case 'thames': return 'Sign the Petition: Thames Water';
      case 'general': return 'Get In Touch';
      case 'whistleblow': return 'Submit a Tip';
      case 'media': return 'Contact PR Team';
      case 'volunteer': return 'Join Us as a Volunteer';
      default: return '';
    }
  };

  const renderFields = () => {
    switch (type) {
      case 'general':
        return (
          <>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (required)" className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-700" required />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (optional)" className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-700" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message (required)" className="w-full p-3 h-32 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-700" required />
          </>
        );
      case 'whistleblow':
        return (
          <>
            <p className="text-sm text-gray-600 mb-4">Your personal details are optional for this form.</p>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your evidence or tip here (required)" className="w-full p-3 h-32 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-red-600" required />
            <label htmlFor="file-upload" className="block text-gray-700 font-bold mb-2">Upload a file (optional)</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-red-600" />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (optional)" className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-red-600" />
          </>
        );
      case 'media':
        return (
          <>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (required)" className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-yellow-400" required />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (optional)" className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-yellow-400" />
            <input type="text" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} placeholder="Affiliation / Publication (required)" className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-yellow-400" required />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message (required)" className="w-full p-3 h-32 border-2 border-gray-300 rounded-md focus:outline-none focus:border-yellow-400" required />
          </>
        );
      case 'volunteer':
        return (
          <>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (required)" className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600" required />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (required)" className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600" required />
            <textarea value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="Area of interest (required)" className="w-full p-3 h-32 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600" required />
          </>
        );
      default:
        // Default case for signup/patron/petition forms
        return (
          <>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email (required)</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-700"
              required
            />
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2 mt-4">Phone Number (optional)</label>
            <input 
              type="tel" 
              id="phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-700"
            />
          </>
        );
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'general': return 'bg-green-700 hover:bg-green-800';
      case 'whistleblow': return 'bg-red-600 hover:bg-red-700';
      case 'media': return 'bg-yellow-400 hover:bg-yellow-500';
      case 'volunteer': return 'bg-blue-600 hover:bg-blue-700';
      default: return 'bg-green-700 hover:bg-green-800';
    }
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
        <h2 className="text-3xl font-bold mb-6 text-center">{getTitle()}</h2>
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <div className="text-center mt-6">
            <button 
              type="submit" 
              className={`text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 ${getButtonColor()}`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;