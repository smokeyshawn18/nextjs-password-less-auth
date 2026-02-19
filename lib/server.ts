import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { cache } from "react";

export const getServerSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
});
