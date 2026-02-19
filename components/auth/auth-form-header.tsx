import { AppWindow } from "lucide-react";
import Link from "next/link";

export function AuthFormHeader() {
  return (
    <Link href="/" className="flex items-center gap-2 font-medium">
      <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <AppWindow className="size-4" />
      </div>
      App
    </Link>
  );
}
