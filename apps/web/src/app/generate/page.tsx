
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CertificatePreview } from "@/components/certificate-preview";

export default function GeneratePage() {
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");

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
        <Button className="w-full" disabled={!fullName || !location}>
          Download PDF
        </Button>
      </div>

      <div className="mt-8">
        <CertificatePreview fullName={fullName} location={location} />
      </div>
    </div>
  );
}
