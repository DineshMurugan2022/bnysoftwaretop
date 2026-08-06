import { AdminLayoutWrapper } from "@/components/ui/admin-auth-wrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayoutWrapper>
      {children}
    </AdminLayoutWrapper>
  );
}
