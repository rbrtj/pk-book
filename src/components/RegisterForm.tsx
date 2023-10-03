"use client";
import { useForm } from "react-hook-form";
import { Button } from "./ui/Button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "./ui/Form";
import { Input } from "./ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { VerificationCodeForm } from "@/components/VerificationCodeForm";
import { Loader2 } from "lucide-react";

const FormSchema = z
  .object({
    username: z.string().min(1, "Nazwa użytkownika jest wymagana").max(30),
    // TODO: Add validation for @pk.edu.pl email
    email: z
      .string()
      .min(1, "Adres email jest wymagany")
      .email("Nieprawidłowy adres email"),
    password: z.string().min(8, "Hasło musi składać się z conajmniej 8 znaków"),
    confirmPassword: z.string().min(1, "Hasła nie są identyczne"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Hasła nie są identyczne",
  });

export const RegisterForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>, e: any) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsFormSubmitting(true);
    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });

      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      setIsFormSubmitting(false);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerify = async (verificationCode: string, e: any) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code: verificationCode,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
      }
    } catch (err: any) {
      console.error(JSON.stringify, null, 2);
    }
  };

  return (
    <Form {...form}>
      {!pendingVerification ? (
        <form className="w-72" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa użytkownika</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Twoja nazwa, która pokaże się w profilu
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hasło</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potwierdź hasło</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-6" type="submit" disabled={isFormSubmitting}>
            {isFormSubmitting && <Loader2 className="animate-spin" />}
            Zarejestruj
          </Button>
        </form>
      ) : (
        <VerificationCodeForm onVerify={onVerify} />
      )}
    </Form>
  );
};
