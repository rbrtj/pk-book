"use client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(30),
    // TODO: Add validation for @pk.edu.pl email
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-3xl w-full mx-4 p-8 bg-white rounded-lg shadow-lg flex items-center">
        {" "}
        {/* Wrap the entire container in a flex container */}
        <div className="flex flex-col lg:flex-row w-full gap-14">
          {/* Left side with image */}
          <div className="lg:w-1/2 order-2 lg:order-1 flex flex-col items-center">
            <Image
              src="/pk.png" // Replace with your image path
              alt="Login Image"
              width={400} // Set the desired width
              height={400} // Set the desired height
            />
            <Button>Register</Button>
          </div>

          {/* Right side with login form */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="lg:w-1/2 order-2 py-14">
              <h2 className="text-3xl font-semibold mb-4">Login</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 w-full">
                  Login
                </Button>
              </form>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
