"use client";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import { useState } from "react";
import { RegisterForm } from "@/components/RegisterForm";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="absolute w-2/3 h-fit left-0 right-0 top-0 bottom-0 m-auto border p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="relative">
          <Image
            src="/pk.png"
            alt="Politechnika Logo"
            layout="fill"
            objectFit="cover"
            className="max-w-full max-h-full"
          />
        </div>
        <div className="flex flex-col items-start pl-2 justify-center pr-20">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="py-6">
            {isLogin ? (
              <p className="text-sm">Nie posiadasz jeszcze konta?</p>
            ) : (
              <p className="text-sm">Posiadasz już konto?</p>
            )}
            <p
              onClick={() => setIsLogin((prev) => !prev)}
              className="text-xs text-primary font-bold cursor-pointer"
            >
              {isLogin ? "Zarejestruj się" : "Zaloguj się"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
