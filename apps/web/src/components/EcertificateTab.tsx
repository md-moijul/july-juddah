
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { createCertificate } from '@/app/actions/certificate';

interface EcertificateTabProps {
  name: string;
  town: string;
}

export default function EcertificateTab({ name, town }: EcertificateTabProps) {
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true); // Mock
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
        const result = await createCertificate(name, town, phone);
    setIsLoading(false);

    if (result.success) {
      // Trigger download
      const link = document.createElement('a');
            link.href = `/api/certificate/${result.certificateNumber}`;
      link.download = 'certificate.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setError(result.error??'');
    }
  };

  const isButtonDisabled = !phone || !termsAccepted || !isCaptchaVerified || isLoading;

  return (
    <div className="space-y-4">
      <div className='gap-2 flex flex-col'>
        <Label htmlFor="phone">Register With Your Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
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
      <div id="captcha-placeholder" className="w-full h-20 bg-gray-200 rounded-md flex items-center justify-center">
        <p className="text-gray-500">CAPTCHA Placeholder</p>
      </div>
      <Button onClick={handleDownload} disabled={isButtonDisabled} className="w-full">
        {isLoading ? 'Generating...' : 'Confirm & Download'}
      </Button>
    </div>
  );
}
