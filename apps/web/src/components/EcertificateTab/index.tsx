
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { createCertificate } from '@/app/actions/certificate';
import { Captcha } from '@/components/Captcha';

interface EcertificateTabProps {
  name: string;
  town: string;
}

export default function EcertificateTab({ name, town }: EcertificateTabProps) {
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    if (!captchaToken) {
      setError("Please complete the CAPTCHA.");
      setIsLoading(false);
      return;
    }
    const result = await createCertificate(name, town, phone, captchaToken);
    setIsLoading(false);

    if (result.success) {
      const response = await fetch(`/api/certificate/${result.certificateNumber}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'e-certificate.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } else {
      setError(result.error??'');
    }
  };

  const isButtonDisabled = !phone || !termsAccepted || !captchaToken || isLoading;

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
      <Captcha onChange={setCaptchaToken} />
      <Button onClick={handleDownload} disabled={isButtonDisabled} className="w-full">
        {isLoading ? 'Generating...' : 'Confirm & Download'}
      </Button>
    </div>
  );
}
