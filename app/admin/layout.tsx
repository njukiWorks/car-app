import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import AdminGuard from "@/components/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen">
        <header className="border-b">
          <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
            <nav className="flex items-center gap-4">
              <Link className="font-semibold" href="/admin/cars">
                Admin
              </Link>
              <Link className="text-sm text-muted-foreground" href="/">
                Public site
              </Link>
            </nav>
            <UserButton />
          </div>
        </header>
        <div className="max-w-5xl mx-auto p-6">{children}</div>
      </div>
    </AdminGuard>
  );
}
