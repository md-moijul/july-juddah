
"use client";

import { Button } from "@/components/ui/button";
import { CertificatePreview } from "@/components/certificate-preview";
import Link from "next/link";
import Image from "next/image";

interface CertificateDisplayProps {
  fullName: string;
  selectedDistrict: string;
  generatedImageUrl: string | null;
  onDownload: () => void;
}

export function CertificateDisplay({ fullName, selectedDistrict, generatedImageUrl, onDownload }: CertificateDisplayProps) {
  const isButtonDisabled = !fullName || !selectedDistrict;

  return (
    <>
    <CertificatePreview fullName={fullName} location={selectedDistrict} />
    <div className="w-full max-w-md">

      {generatedImageUrl &&(
          <>
          <div className="flex justify-center space-x-4 mt-4">
            <Button onClick={onDownload} disabled={isButtonDisabled}>Download E-certificate</Button>
            <Link href={`/purchase?imageUrl=${encodeURIComponent(generatedImageUrl)}`} passHref>
              <Button variant="outline" disabled={isButtonDisabled}>Get a Hard Copy</Button>
            </Link>
          </div>
        </>
      ) }
    </div>
      </>
  );
}
