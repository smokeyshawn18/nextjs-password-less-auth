import { AuthFormHeader } from "@/components/auth/auth-form-header";
import { SignInForm } from "@/components/auth/signin-form";
import { getServerSession } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect("/dashboard");

  return (
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <AuthFormHeader />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
