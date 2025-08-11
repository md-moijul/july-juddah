
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { createUser } from '@/app/actions/user';
import { useUserStore } from '@/stores/useUserStore';
import { PhoneNumberInput } from '@/components/PhoneNumberInput';
import { useCertificateDownload } from '@/hooks/useCertificateDownload';

export default function EcertificateTab() {
  const { user, setUser } = useUserStore();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const { downloadCertificate } = useCertificateDownload();


  const { name, town, phone } = user;

  const handleDownload = async () => {

    setError(null);
    if (error) { // Check if there's an existing error from PhoneNumberInput
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
      
      downloadCertificate(user.name, user.town)
      

    } else {
      setError(result.error ?? '');
    }
  };

  const isButtonDisabled = !phone || !!error || !termsAccepted || isLoading;

  return (
    <div className="space-y-4">
      <PhoneNumberInput setError={setError} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(!!checked)}
        />
        <Label htmlFor="terms">I accept the Terms & Conditions</Label>
      </div>
      <Button onClick={()=> downloadCertificate(user.name, user.town)
} className="w-full">
        {isLoading ? 'Generating...' : 'Confirm & Download'}
      </Button>
    </div>
  );
}
