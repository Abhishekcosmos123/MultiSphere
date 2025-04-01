import AccessManagement from "@/components/admin/access-management"
import DashboardLayout from "../layout"

export default function ManageAccessPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <AccessManagement />
      </div>
    </DashboardLayout>
  )
}
