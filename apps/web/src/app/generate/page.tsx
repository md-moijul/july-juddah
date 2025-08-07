"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HardCopyTab } from "@/components/HardCopyTab";
import { CertificateForm } from "@/components/CertificateForm";
import { CertificatePreview } from "@/components/CertificatePreview";
import EcertificateTab from "@/components/EcertificateTab";
import { useEffect } from "react";
import { getUserById } from "@/app/actions/user";
import { useUserStore } from "@/stores/useUserStore";

export default function GeneratePage() {
  return <GeneratePageContent />;
}

function GeneratePageContent() {
  const { user,loading, setUser, setLoading } = useUserStore();

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        const fetchedUser = await getUserById(storedUserId);
        if (fetchedUser) {
          const validatedUser = {
            id: String(fetchedUser.id),
            name: fetchedUser.name,
            town: fetchedUser.town || "",
            phone: fetchedUser.phone || "",
          };
          setUser(validatedUser);
        } else {
          localStorage.removeItem("userId"); // Clear invalid userId
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [setUser, setLoading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 lg:gap-8">
        <h1 className="text-4xl font-bold mb-8">Loading User Data...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 lg:gap-8">
      <h1 className="text-4xl font-bold mb-8">Generate Your Certificate</h1>
      <CertificateForm/>
      <CertificatePreview />
      <Tabs defaultValue="e-certificate" className="w-[800px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="e-certificate">Download E-certificate</TabsTrigger>
          <TabsTrigger value="hard-copy">Order Hard Copy</TabsTrigger>
        </TabsList>
        <TabsContent value="e-certificate">
          <EcertificateTab />
        </TabsContent>
        <TabsContent value="hard-copy">
          <HardCopyTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}