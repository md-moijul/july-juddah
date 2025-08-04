
"use client";

import { useState } from "react";
import { useCertificateDownload } from "@/hooks/useCertificateDownload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CertificatePreview } from "@/components/certificate-preview";
import districts from "@/data/districts.json";

export default function GeneratePage() {
  const [fullName, setFullName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleGenerateCertificate = async () => {
    try {
      // Simulate API call for image generation
      // In a real application, this would call a backend service
      // that generates the image and returns its URL or base64 data.
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      const imageUrl = `/api/generate-image?name=${encodeURIComponent(fullName)}&district=${encodeURIComponent(selectedDistrict)}`;
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      // setError(err instanceof Error ? err.message : 'An unknown error occurred.'); // Error handling for image generation
    } finally {
      // setIsLoading(false); // Loading state for image generation
    }
  };

  const { downloadCertificate, isLoading, error } = useCertificateDownload();

  const handleGetHardCopy = () => {
    alert("Hard copy request initiated! (This is a placeholder action)");
    // In a real application, this would trigger a backend process
    // for printing and shipping.
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Generate Your Certificate</h1>

      <div className="w-full max-w-md space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            What is your name?
          </label>
          <Input
            id="fullName"
            placeholder="Your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="districtSelect" className="block text-sm font-medium text-gray-700">
            Select which Town you&apos;ve participated in
          </label>
          <Select onValueChange={setSelectedDistrict} value={selectedDistrict}>
            <SelectTrigger id="districtSelect" className="w-full mt-1">
              <SelectValue placeholder="Select a district" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full"
          onClick={handleGenerateCertificate}
          disabled={!fullName || !selectedDistrict || isLoading}
        >
          {isLoading ? "Generating..." : "Generate Certificate"}
        </Button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      {generatedImageUrl && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Certificate</h2>
          <img src={generatedImageUrl} alt="Generated Certificate" className="w-full h-auto border rounded-lg shadow-lg" />
          <div className="flex justify-center space-x-4 mt-4">
            <Button onClick={() => downloadCertificate(fullName, selectedDistrict)} disabled={isLoading}>Download E-certificate</Button>
            <Button onClick={handleGetHardCopy} variant="outline">Get a Hard Copy</Button>
          </div>
        </div>
      )}

      {!generatedImageUrl && (
        <div className="mt-8">
          <CertificatePreview fullName={fullName} location={selectedDistrict} />
        </div>
      )}
    </div>
  );
}

