
"use client";

import React from "react";
import { content } from "@/lib/content";
import Image from 'next/image'

interface CertificatePreviewProps {
  fullName: string;
  location: string;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  fullName,
  location,
}) => {
  return (
    <div className="relative w-[800px] h-[600px] border-2 border-border flex items-center justify-center bg-card shadow-lg overflow-hidden max-xs:scale-30 max-sm:scale-40 max-md:scale-50 ">
      <Image src="/template.jpg" alt="Certificate Template" className="w-full h-full object-cover" fill/>
      <div className="absolute inset-0">
        {/* Full Name */}
        <p
          style={{
            position: 'absolute',
            left: '40px',
            top: '200px',
            fontSize: '40px',
            color: '#835A2A', // Converted from rgb(0.5137, 0.3529, 0.1647)
            fontFamily: 'serif', // Placeholder for Lora/TimesRoman
            fontWeight: 'semibold',
          }}
        >
          {fullName || content.certificate.fullNamePlaceholder}
        </p>

        {/* Descriptive Text */}
        {(() => {
          const descriptiveText = `This certificate acknowledges your outstanding contribution and dedication during the July Student Revelation in ${location || content.certificate.locationPlaceholder}. Your perticipation was essential to its success.`;
          const words = descriptiveText.split(' ');
          let currentLine = '';
          const lines: string[] = [];
          const breakWords = ["outstanding", "Student", "was"];

          for (let i = 0; i < words.length; i++) {
            currentLine += words[i] + ' ';
            if (breakWords.includes(words[i]) || i === words.length - 1) {
              lines.push(currentLine.trim());
              currentLine = '';
            }
          }

          const fontSize = 22;
          const lineHeight = 34;
          const currentY = 283; // Scaled starting Y coordinate

          return (
            <>
              {lines.map((line, index) => (
                <p
                  key={index}
                  style={{
                    position: 'absolute',
                    left: '40px',
                    top: `${currentY + index * (lineHeight * (600 / 842))}px`, // Adjust top for each line
                    fontSize: `${fontSize * (600 / 842)}px`, // Scaled font size
                    color: '#6F6A5B', // Converted from rgb(0.435, 0.416, 0.357)
                    fontFamily: 'sans-serif', // Placeholder for Inter/Helvetica
                  }}
                >
                  {line}
                </p>
              ))}
            </>
          );
        })()}

        {/* Certificate Number */}
        {(() => {
          const generateMaskedCertificateNumber = () => {
            const randomNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
            return randomNumber.slice(0, -2) + '**';
          };
          const maskedCertificateNumber = generateMaskedCertificateNumber();

          return (
            <p
              style={{
                position: 'absolute',
                left: '42px',
                top: '510px',
                fontSize: '16px',
                color: '#000000',
                
              }}
            >
              {maskedCertificateNumber}
            </p>
          );
        })()}
      </div>
    </div>
  );
};
