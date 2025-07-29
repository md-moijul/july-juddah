
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
    <div className="relative w-[800px] h-[600px] border-2 border-gray-300 flex items-center justify-center bg-white shadow-lg">
      {/* This div represents the certificate design template */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Certificate of Achievement</h2>
        <p className="text-xl mb-2">This certifies that</p>
        <p className="text-3xl font-semibold mb-4">{fullName || "[Full Name]"}</p>
        <p className="text-xl mb-2">has successfully completed a course in</p>
        <p className="text-2xl font-medium mb-4">[Course Name - Placeholder]</p>
        <p className="text-xl mb-2">at</p>
        <p className="text-2xl font-medium">{location || "[Location]"}</p>
      </div>
    </div>
  );
};
