'use client';
import { Input } from "@/components/ui/Input";
import Image from "next/image";

export default function Home () {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-xl w-full mx-4 p-8 bg-white rounded-lg shadow-lg flex items-center"> {/* Wrap the entire container in a flex container */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left side with image */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <Image
              src="/pk.png" // Replace with your image path
              alt="Login Image"
              width={400} // Set the desired width
              height={300} // Set the desired height
              objectFit="cover" // Adjust to your image aspect ratio
            />
          </div>

          {/* Right side with login form */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-3xl font-semibold mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                  Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}