"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
const FormSchema = z.object({
  // TODO: Verify how long is the clerk verification code.
  verificationCode: z.string().min(3, "Kod jest za krótki"),
});

interface VerificationCodeFormProps {
  onVerify: (verificationCode: string, e: any) => Promise<void>;
}
export const VerificationCodeForm = ({
  onVerify,
}: VerificationCodeFormProps) => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>, e: any) => {
    e.preventDefault();
    try {
      setIsFormSubmitting(true);
      await onVerify(values.verificationCode, e);
    } catch (err: any) {
      form.setError("verificationCode", {
        type: "custom",
        message: "Nieprawidłowy kod",
      });
      setIsFormSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kod weryfikacyjny</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-6" type="submit" disabled={isFormSubmitting}>
          {isFormSubmitting && <Loader2 className="animate-spin" />}
          Potwierdź
        </Button>
      </form>
    </Form>
  );
};
