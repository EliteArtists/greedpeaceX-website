import React, { useState, useEffect } from 'react';

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

  // FIX: Reset all state when the modal opens (isOpen becomes true)
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPhone('');
      setMessage('');
      setAffiliation('');
      setInterest('');
      setFile(null);
      setSubmissionStatus('idle'); // Crucial: Resets success/error status
    }
  }, [isOpen]); 

  if (!isOpen) return null;
  // ... (rest of the component logic for handleSubmit and renderFields remains the same)
  // ... (The rest of the component is long, so I'll provide the entire block with the necessary imports and exports)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    // 1. FRONT-END VALIDATION
    const isEmailRequired = type !== 'whistleblow'; 
    const isAffiliationRequired = type === 'media';
    const isPhoneRequired = type === 'volunteer';
    const isInterestRequired = type === 'volunteer';
    
    // Check if required fields have content
    if (
        (isEmailRequired && !email) ||
        (type === 'general' && !message) ||
        (isAffiliationRequired && !affiliation) ||
        (isAffiliationRequired && !message) || // Media requires affiliation AND message
        (isPhoneRequired && !phone) ||
        (isInterestRequired && !interest) ||
        (type === 'whistleblow' && !message) // Whistleblow requires message/tip
    ) {
      alert('Please fill out all required fields.');
      setSubmissionStatus('error');
      return;
    }
    
    // 2. CONSTRUCT DATA PAYLOAD
    const payload = {
      type: type,
      email: email,
      phone: phone || null,
      message: message || null,
      campaign_slug: isPetition ? type : null, 
      affiliation: affiliation || null,
    };

    // 3. SEND DATA TO SUPABASE EDGE FUNCTION
    try {
      const functionUrl = `${SUPABASE_URL}/functions/v1/submitForm`;
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Note: CORS fix is handled by the live Edge Function deployment and not needed here
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setTimeout(onClose, 2000); // Auto-close modal after a delay for user to see success message

      } else {
        setSubmissionStatus('error');
        console.error('Submission failed on server:', await response.json());
      }
    } catch (error) {
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
    const inputClasses = "w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none";
    
    const getBorderColor = () => {
        switch (type) {
            case 'general': return 'focus:border-green-700';
            case 'whistleblow': return 'focus:border-red-600';
            case 'media': return 'focus:border-yellow-400';
            case 'volunteer': return 'focus:border-blue-600';
            default: return 'focus:border-green-700'; // signup/patron/petition
        }
    };
    const inputStyle = (required) => `${inputClasses} ${getBorderColor()}`;

    // Determine required status for specific inputs
    const isAffiliationRequired = type === 'media';
    const isPhoneRequired = type === 'volunteer';
    const isInterestRequired = type === 'volunteer';
    const isEmailRequired = type !== 'whistleblow'; 
    const isWhistleblow = type === 'whistleblow';

    switch (type) {
      case 'general':
      case 'media':
      case 'volunteer':
        return (
          <>
            {(type === 'whistleblow') && <p className="text-sm text-gray-600 mb-4">Your personal details are optional for this form.</p>}

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`Email (${isEmailRequired ? 'required' : 'optional'})`} className={inputStyle(isEmailRequired)} required={isEmailRequired} />
            
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={`Phone Number (${isPhoneRequired ? 'required' : 'optional'})`} className={inputStyle(isPhoneRequired)} required={isPhoneRequired} />
            
            {isAffiliationRequired && (
              <input type="text" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} placeholder="Affiliation / Publication (required)" className={inputStyle(true)} required />
            )}
            
            {(type === 'general' || type === 'media') && (
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Message (required)`} className={`${inputStyle(true)} h-24`} required />
            )}

            {isInterestRequired && (
              <textarea value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="Area of interest (required)" className={`${inputStyle(true)} h-24`} required />
            )}

            {type === 'whistleblow' && (
              <>
                <label htmlFor="file-upload" className="block text-gray-700 font-bold mb-2">Upload a file (optional)</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className={`${inputClasses}`} />
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your evidence or tip here (required)" className={`${inputStyle(true)} h-24`} required={true} />
              </>
            )}
          </>
        );

      default:
        // Default case for signup/patron/petition forms
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
