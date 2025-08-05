"use client";

import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HardCopyTab from "@/components/sections/HardCopyTab";
import { CertificateForm } from "@/components/CertificateForm";
import { CertificatePreview } from "@/components/certificate-preview";
import EcertificateTab from "@/components/EcertificateTab";

export default function GeneratePage() {
  const [fullName, setFullName] = useLocalStorageState("fullName", "");
  const [selectedDistrict, setSelectedDistrict] = useLocalStorageState("selectedDistrict", "");

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
      <Tabs defaultValue="e-certificate" className="w-[800px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="e-certificate">Download E-certificate</TabsTrigger>
          <TabsTrigger value="hard-copy">Order Hard Copy</TabsTrigger>
        </TabsList>
        <TabsContent value="e-certificate">
          <EcertificateTab name={fullName} town={selectedDistrict} />
        </TabsContent>
        <TabsContent value="hard-copy">
          <HardCopyTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}