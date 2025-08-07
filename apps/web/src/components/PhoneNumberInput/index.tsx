import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from '@/stores/useUserStore';

interface PhoneNumberInputProps {
  setError: (error: string | null) => void;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  setError,
}) => {
  const { user, setUserPhone } = useUserStore();
  const [internalPhoneError, setInternalPhoneError] = useState<string | null>(null);

  const validatePhone = (phoneNumber: string) => {
    if (!phoneNumber) {
      return 'Phone number is required.';
    }
    const phoneRegex = /^\d{1,11}$/; // E.164 format without leading +
    if (!phoneRegex.test(phoneNumber)) {
      return 'Please enter a valid phone number (e.g., 1234567890).';
    }
    return null;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setUserPhone(newPhone);

    const validationError = validatePhone(newPhone);
    setInternalPhoneError(validationError);
    setError(validationError); // Propagate error to parent
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phoneNumber">Phone Number</Label>
      <Input
        id="phoneNumber"
        type="tel"
        value={user.phone}
        onChange={handlePhoneChange}
        className={internalPhoneError ? "border-red-500" : ""}
      />
      {internalPhoneError && <p className="text-red-500 text-sm">{internalPhoneError}</p>}
    </div>
  );
};
