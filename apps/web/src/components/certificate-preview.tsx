
"use client";

import React from "react";
import { content } from "../lib/content";

interface CertificatePreviewProps {
  fullName: string;
  location: string;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  fullName,
  location,
}) => {
  return (
    <div className="relative w-[800px] h-[600px] border-2 border-border flex items-center justify-center bg-card shadow-lg">
      {/* This div represents the certificate design template */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">{content.certificate.title}</h2>
        <p className="text-xl mb-2">{content.certificate.subtitle}</p>
        <p className="text-3xl font-semibold mb-4">{fullName || content.certificate.fullNamePlaceholder}</p>
        <p className="text-xl mb-2">{content.certificate.courseCompletion}</p>
        <p className="text-2xl font-medium mb-4">{content.certificate.courseNamePlaceholder}</p>
        <p className="text-xl mb-2">{content.certificate.at}</p>
        <p className="text-2xl font-medium">{location || content.certificate.locationPlaceholder}</p>
      </div>
    </div>
  );
};
