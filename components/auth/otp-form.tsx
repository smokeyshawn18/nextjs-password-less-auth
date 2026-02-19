"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const otpSchema = z.object({
  otp: z.string().length(6),
});

type OTPFormData = z.infer<typeof otpSchema>;

type OTPFormProps = React.ComponentProps<typeof Card> & {
  email: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export function OTPForm({ email, onSuccess, onError, ...props }: OTPFormProps) {
  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const router = useRouter();

  async function onSubmit(data: OTPFormData) {
    try {
      await authClient.signIn.emailOtp(
        { email, otp: data.otp },
        {
          onSuccess: () => {
            onSuccess?.();
            router.push("/dashboard");
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred.");
      onError?.(error);
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">Verification code</FieldLabel>
              <Controller
                control={control}
                name="otp"
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    id="otp"
                    required
                    value={field.value}
                    onChange={field.onChange}
                    aria-invalid={!!errors.otp}
                  >
                    <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              <FieldDescription>
                Enter the 6-digit code sent to your email ({email}).
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>
              <FieldDescription className="text-center">
                Didn&apos;t receive the code? <a href="#">Resend</a>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
