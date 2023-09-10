"use client";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { RegisterForm } from "@/components/RegisterForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-3xl w-full mx-4 p-8 bg-white rounded-lg shadow-lg flex items-center">
        {" "}
        <div className="flex flex-col lg:flex-row w-full gap-14">
          <div className="lg:w-1/2 order-2 lg:order-1 flex flex-col items-center">
            <Image
              src="/pk.png"
              alt="Politechnika Logo"
              width={400}
              height={400}
            />
            <Button>Register</Button>
          </div>

          {/* Right side with login form */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
