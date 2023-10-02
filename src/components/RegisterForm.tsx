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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
        <Button className="mt-6" type="submit">
          Zarejestruj
        </Button>
      </form>
    </Form>
  );
};
