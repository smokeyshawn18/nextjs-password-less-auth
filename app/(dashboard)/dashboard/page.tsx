import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getServerSession } from "@/lib/server";
import { Mail, ShieldCheck, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect("/signin");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Navigation Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="text-xl font-bold text-black">
                Dashboard
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Hero Content */}
        <main className="flex flex-1 flex-col items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-3xl flex flex-col items-center text-center space-y-8">
            {/* Minimalist Identity Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-6 shadow-xl">
                <User size={40} strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-4 border-white dark:border-slate-950 shadow-sm">
                <ShieldCheck size={18} className="text-white" />
              </div>
            </div>

            {/* Typography Section */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Welcome back
              </h1>
              <p className="text-xl md:text-2xl font-light text-slate-500 italic">
                {user?.email}
              </p>
            </div>

            {/* Clean Security Badge */}
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-full">
                <Mail size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Email Verify System Active
              </p>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
