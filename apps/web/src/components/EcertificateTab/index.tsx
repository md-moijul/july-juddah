
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { createUser } from '@/app/actions/user';
import { useUserStore } from '@/stores/useUserStore';

export default function EcertificateTab() {
  const { user, setUserPhone, setUser } = useUserStore();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const { name, town, phone } = user;
  console.log('phone: ', phone);

  const validatePhone = (phoneNumber: string) => {
    return null
    const phoneRegex = /^\d{1,11}$/; // E.164 format
    if (!phoneRegex.test(phoneNumber)) {
      return 'Please enter a valid phone number (e.g., +1234567890).';
    }
    return null;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setUserPhone(newPhone);
    if (newPhone) {
      setPhoneError(validatePhone(newPhone));
    } else {
      setPhoneError(null);
    }
  };

  const handleDownload = async () => {
    setError(null);
    const validationError = validatePhone(phone ?? '');
    if (validationError) {
      setPhoneError(validationError);
      return;
    }

    setIsLoading(true);


    if (!name || !town || !phone || !termsAccepted) {
      setError('Please fill in all required fields and accept the terms.');
      setIsLoading(false);
      return;
    }

    const result = await createUser(name, town, phone);
    setIsLoading(false);
    
    if (result.success) {
      const newUserData = {
        id: result.userId?.toString() || '',
        name: name,
        town: town,
        phone: phone,
      };
      localStorage.setItem('userId', newUserData.id);
      setUser(newUserData);
      
      const response = await fetch(`/api/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName: name, location: town, userId: result.userId }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'e-certificate.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to generate PDF');
      }
    } else {
      setError(result.error ?? '');
    }
  };

  const isButtonDisabled = !phone || !!phoneError || !termsAccepted || isLoading;

  return (
    <div className="space-y-4">
      <div className='gap-2 flex flex-col'>
        <Label htmlFor="phone">Register With Your Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Enter your phone number"
        />
        {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(!!checked)}
        />
        <Label htmlFor="terms">I accept the Terms & Conditions</Label>
      </div>
      <Button onClick={handleDownload} disabled={isButtonDisabled} className="w-full">
        {isLoading ? 'Generating...' : 'Confirm & Download'}
      </Button>
    </div>
  );
}
