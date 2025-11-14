import React, { useState } from 'react';

// Get your Supabase project URL from your App.jsx or Supabase dashboard
const SUPABASE_URL = 'https://hokibuzggipohnopetld.supabase.co';

function Modal({ isOpen, onClose, type, isPetition }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [interest, setInterest] = useState('');
  const [file, setFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // idle, submitting, success, error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    // 1. FRONT-END VALIDATION (as discussed)
    if ((!email && type !== 'whistleblow' && !isPetition) ||
        (type === 'general' && !message) ||
        (type === 'media' && !affiliation) ||
        (type === 'media' && !message) ||
        (type === 'volunteer' && !phone) ||
        (type === 'volunteer' && !interest)
    ) {
      alert('Please fill out all required fields.');
      setSubmissionStatus('error');
      return;
    }
    
    // 2. CONSTRUCT DATA PAYLOAD
    const payload = {
      type: type,
      email: email,
      phone: phone || null, // Ensure phone is null if empty
      message: message || null,
      campaign_slug: isPetition ? type : null, // For petitions, use the type as the slug
      affiliation: affiliation || null,
      // NOTE: File upload for whistleblower is complex and left for later development, 
      // but the message/details will be submitted.
    };

    // 3. SEND DATA TO SUPABASE EDGE FUNCTION
    try {
      const functionUrl = `${SUPABASE_URL}/functions/v1/submitForm`;
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        // Clear forms after successful submission
        setEmail('');
        setPhone('');
        setMessage('');
        setAffiliation('');
        setInterest('');
        setFile(null);
        
        // Auto-close modal after a delay for user to see success message
        setTimeout(onClose, 2000); 

      } else {
        // Handle server-side errors from the Edge Function
        setSubmissionStatus('error');
        console.error('Submission failed on server:', await response.json());
      }
    } catch (error) {
      // Handle network or fetch errors
      setSubmissionStatus('error');
      console.error('Network Error:', error);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'signup': return 'Join the Movement';
      case 'patron': return 'Formalise Your Support';
      case 'general': return 'Get In Touch';
      case 'whistleblow': return 'Submit a Tip';
      case 'media': return 'Contact PR Team';
      case 'volunteer': return 'Join Us as a Volunteer';
      case 'realcost': return 'Sign the Petition: M&S Green Cost';
      case 'invisiblehand': return 'Sign the Petition: The Invisible Hand';
      case 'weaponizingtruth': return 'Sign the Petition: Weaponizing Truth';
      default: return '';
    }
  };

  const renderFields = () => {
    // Shared styling for inputs
    const inputClasses = "w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-700";
    
    // Determine required status for specific inputs
    const isMessageRequired = type === 'general' || type === 'media';
    const isAffiliationRequired = type === 'media';
    const isVolunteerRequired = type === 'volunteer';
    const isEmailRequired = type !== 'whistleblow'; // Email is optional for whistleblow

    switch (type) {
      case 'general':
      case 'whistleblow':
      case 'media':
      case 'volunteer':
        return (
          <>
            {(type === 'whistleblow') && <p className="text-sm text-gray-600 mb-4">Your personal details are optional for this form.</p>}

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`Email (${isEmailRequired ? 'required' : 'optional'})`} className={`${inputClasses} ${isEmailRequired && 'required-field'}`} required={isEmailRequired} />
            
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={`Phone Number (${isVolunteerRequired ? 'required' : 'optional'})`} className={inputClasses} required={isVolunteerRequired} />
            
            {isAffiliationRequired && (
              <input type="text" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} placeholder="Affiliation / Publication (required)" className={inputClasses} required />
            )}
            
            {isMessageRequired && (
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Message (${isMessageRequired ? 'required' : 'optional'})`} className={`${inputClasses} h-24`} required />
            )}
            
            {isVolunteerRequired && (
              <textarea value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="Area of interest (required)" className={`${inputClasses} h-24`} required />
            )}

            {type === 'whistleblow' && (
              <>
                <label htmlFor="file-upload" className="block text-gray-700 font-bold mb-2">Upload a file (optional)</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className={`${inputClasses}`} />
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your evidence or tip here (required)" className={`${inputClasses} h-24`} required={true} />
              </>
            )}
          </>
        );
      default:
        // Default case for signup/patron/petition forms
        const isDefaultPetition = isPetition || type === 'signup' || type === 'patron';
        return (
          <>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (required)" className={inputClasses} required />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (optional)" className={inputClasses} />
          </>
        );
    }
  };
  
  const renderStatus = () => {
    switch (submissionStatus) {
      case 'submitting':
        return <p className="text-yellow-500 font-bold mb-4">Submitting...</p>;
      case 'success':
        return <p className="text-green-700 font-bold mb-4">Success! Thank you for taking action.</p>;
      case 'error':
        return <p className="text-red-600 font-bold mb-4">Error submitting form. Please try again.</p>;
      default:
        return null;
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'general': return 'bg-green-700 hover:bg-green-800';
      case 'whistleblow': return 'bg-red-600 hover:bg-red-700';
      case 'media': return 'bg-yellow-400 hover:bg-yellow-500 text-black';
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
          disabled={submissionStatus === 'submitting'}
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">{getTitle()}</h2>
        
        {renderStatus()}

        <form onSubmit={handleSubmit} className="text-left">
          {renderFields()}
          <div className="text-center mt-6">
            <button 
              type="submit" 
              className={`font-bold py-3 px-6 rounded-md transition-colors duration-200 ${getButtonColor()}`}
              disabled={submissionStatus === 'submitting'}
            >
              {submissionStatus === 'submitting' ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
