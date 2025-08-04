import React, { useState } from 'react';

interface OtpVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  if (!isOpen) return null;

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(number)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
      return false;
    }
    setPhoneNumberError('');
    return true;
  };

  const handleSendOtp = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }
    try {
      setError('');
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setOtpSent(true);
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('An unexpected error occurred.');
    }
  };

  const handleVerifyAndDownload = async () => {
    try {
      setError('');
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        console.log('OTP verified. Initiating download...');
        // Simulate PDF download
        const samplePdfUrl = '/sample.pdf'; // This should be a path to a sample PDF in your public folder
        const link = document.createElement('a');
        link.href = samplePdfUrl;
        link.setAttribute('download', 'e-certificate.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
      } else {
        setError(data.message || 'Failed to verify OTP.');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('An unexpected error occurred.');
    }
  };

  const isSendOtpButtonEnabled = phoneNumber.length === 10 && termsAccepted && recaptchaVerified && !phoneNumberError;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Verify Phone Number</h2>
        {!otpSent ? (
          <>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., 1234567890"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  validatePhoneNumber(e.target.value);
                }}
              />
              {phoneNumberError && <p className="text-red-500 text-xs italic mt-1">{phoneNumberError}</p>}
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 leading-tight"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm">
                I accept the <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a>
              </label>
            </div>
            {/* Google reCAPTCHA v2 Placeholder */}
            <div className="mb-6">
              <div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={() => setRecaptchaVerified(true)}></div>
              <p className="text-sm text-gray-500 mt-2">
                (reCAPTCHA will be integrated here)
              </p>
            </div>
            <button
              onClick={handleSendOtp}
              disabled={!isSendOtpButtonEnabled}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !isSendOtpButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
                Enter OTP:
              </label>
              <input
                type="text"
                id="otp"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., 123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <button
              onClick={handleVerifyAndDownload}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify & Download
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
