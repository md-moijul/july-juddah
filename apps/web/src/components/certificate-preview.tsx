
"use client";

import React from "react";

interface CertificatePreviewProps {
  fullName: string;
  location: string;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  fullName,
  location,
}) => {
  return (
    <div className="relative w-[800px] h-[600px] border-2 border-border flex items-center justify-center bg-card shadow-lg overflow-hidden">
      <img src="/template.jpg" alt="Certificate Template" className="w-full h-full object-cover" />
    </div>
  );
};
