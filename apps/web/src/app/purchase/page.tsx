'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

// This component now contains all the client-side logic
const PurchaseFlow = () => {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('imageUrl');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  if (!imageUrl) {
    return null;
  }

  const validateForm = () => {
    let isValid = true;
    const phoneRegex = /^[+]?[0-9]{10,15}$/;

    if (!phoneNumber) {
      setPhoneError('Phone number is required.');
      isValid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Please enter a valid phone number.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!fullAddress.trim()) {
      setAddressError('Full address is required.');
      isValid = false;
    } else {
      setAddressError('');
    }

    return isValid;
  };

  const handleConfirmOrder = () => {
    if (validateForm()) {
      alert(`Order confirmed for ${phoneNumber} at ${fullAddress}`);
      // Implement actual order confirmation logic here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Order Hard Copy</h1>

      <div className="w-full max-w-md space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Your Certificate Preview</h2>
          <Image src={imageUrl} alt="Generated Certificate" width={500} height={300} className="w-full h-auto border rounded-lg shadow-lg" />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
          />
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        </div>

        <div>
          <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">
            Full Address
          </label>
          <Textarea
            id="fullAddress"
            placeholder="Enter your full address"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            className="mt-1"
            rows={4}
          />
          {addressError && <p className="text-red-500 text-sm mt-1">{addressError}</p>}
        </div>

        <Button
          className="w-full"
          onClick={handleConfirmOrder}
          disabled={!phoneNumber || !fullAddress}
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
};


export default function PurchasePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseFlow />
    </Suspense>
  );
}
