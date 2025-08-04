"use client";

import { useState } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import OtpVerificationModal from "@/components/OtpVerificationModal";
import { CertificateForm } from "@/components/CertificateForm";
import { CertificateDisplay } from "@/components/CertificateDisplay";
import { CertificatePreview } from "@/components/certificate-preview";

export default function GeneratePage() {
  const [fullName, setFullName] = useLocalStorageState("fullName", "");
  const [selectedDistrict, setSelectedDistrict] = useLocalStorageState("selectedDistrict", "");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const generatedImageUrl = (fullName && selectedDistrict) 
    ? `/api/generate-image?name=${encodeURIComponent(fullName)}&district=${encodeURIComponent(selectedDistrict)}`
    : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 lg:gap-8">
      <h1 className="text-4xl font-bold mb-8">Generate Your Certificate</h1>

      <CertificateForm 
        fullName={fullName} 
        setFullName={setFullName} 
        selectedDistrict={selectedDistrict} 
        setSelectedDistrict={setSelectedDistrict} 
      />

    <CertificatePreview fullName={fullName} location={selectedDistrict} />


      <OtpVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}