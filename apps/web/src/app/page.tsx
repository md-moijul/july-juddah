import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">
        Commemorate Your Achievement: Get Your Free Certificate!
      </h1>
      <Link href="/generate" passHref>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
