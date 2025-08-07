
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
import { useUserStore } from "@/stores/useUserStore";

export function CertificateForm() {
  const { user, setUserName, setUserTown } = useUserStore();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
        setUserName(newName);
  };

  const handleDistrictChange = (newDistrict: string) => {
      setUserTown(newDistrict);
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
          value={user?.name}
          onChange={handleNameChange}
          className="mt-1"
        />
      </div>

      <div>
        <label htmlFor="districtSelect" className="block text-sm font-medium text-gray-700">
          Select which Town you&apos;ve participated in
        </label>
        <Select onValueChange={handleDistrictChange} value={user.town}>
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
