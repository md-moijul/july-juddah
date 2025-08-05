
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

interface CertificateFormProps {
  fullName: string;
  setFullName: (value: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}

export function CertificateForm({ fullName, setFullName, selectedDistrict, setSelectedDistrict, phone, setPhone }: CertificateFormProps) {
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
    </div>
  );
}
