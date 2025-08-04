import { useState } from "react";
import { generateCertificatePdf } from "@/services/certificateService";

interface UseCertificateDownloadResult {
  downloadCertificate: (fullName: string, selectedDistrict: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useCertificateDownload(): UseCertificateDownloadResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadCertificate = async (fullName: string, selectedDistrict: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const pdfBlob = await generateCertificatePdf({ fullName, location: selectedDistrict });
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

  return { downloadCertificate, isLoading, error };
}
