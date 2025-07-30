
"use client";

import { useState } from "react";
import { generateCertificatePdf } from "@/services/certificateService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CertificatePreview } from "@/components/certificate-preview";

export default function GeneratePage() {
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const pdfBlob = await generateCertificatePdf({ fullName, location });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `July_Revelation_Certificate_${fullName.replace(/ /g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Generate Your Certificate</h1>

      <div className="w-full max-w-md space-y-4">
        <Input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button className="w-full" onClick={handleDownload} disabled={!fullName || !location || isLoading}>
          {isLoading ? "Generating..." : "Download PDF"}
        </Button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      <div className="mt-8">
        <CertificatePreview fullName={fullName} location={location} />
      </div>
    </div>
  );
}
