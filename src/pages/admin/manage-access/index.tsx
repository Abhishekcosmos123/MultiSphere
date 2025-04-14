import AccessManagement from "@/components/admin/access-management";
import DashboardLayout from "../layout";
import { withAuth } from "@/hooks/middleware";

function ManageAccessPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <AccessManagement />
      </div>
    </DashboardLayout>
  );
}

export default withAuth(ManageAccessPage, "/admin/login");