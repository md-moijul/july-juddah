
"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import districts from "@/data/districts.json";
import { useState, useEffect } from "react";
import { createUser } from "@/app/actions/user";
import { useUserStore } from "@/stores/useUserStore";

interface CertificateFormProps {
  initialFullName: string;
  initialSelectedDistrict: string;
  initialPhone: string;
  onUserCreated: (user: { id: string; name: string; town: string; phone: string }) => void;
}

export function CertificateForm({
  initialFullName,
  initialSelectedDistrict,
  initialPhone,
  onUserCreated,
}: CertificateFormProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [selectedDistrict, setSelectedDistrict] = useState(initialSelectedDistrict);
  const [phone, setPhone] = useState(initialPhone);
  const { setUser } = useUserStore();

  useEffect(() => {
    setFullName(initialFullName);
  }, [initialFullName]);

  useEffect(() => {
    setSelectedDistrict(initialSelectedDistrict);
  }, [initialSelectedDistrict]);

  useEffect(() => {
    setPhone(initialPhone);
  }, [initialPhone]);

  const handleCreateUser = async () => {
    const result = await createUser(fullName, selectedDistrict, phone);
    if (result.success && result.userId) {
      const newUser = { id: result.userId.toString(), name: fullName, town: selectedDistrict, phone: phone };
      onUserCreated(newUser);
      setUser(newUser);
    } else {
      // Handle error, e.g., show a toast message
      console.error(result.error);
    }
  };

  return (
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
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          What is your phone number?
        </label>
        <Input
          id="phone"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
      <button onClick={handleCreateUser}>Save User</button>
    </div>
  );
}
