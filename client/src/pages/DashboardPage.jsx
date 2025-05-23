import { useAuth } from "../contexts/AuthContext";
import CommonLayout from "../layout/CommonLayout";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <CommonLayout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.name || 'User'}!</h1>

        {user?.role === 'Admin' && (
          <div className="space-y-4">
            <p className="text-gray-700">You have full access to manage users, projects, and more.</p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>View and manage all projects</li>
              <li>Create and assign users</li>
              <li>Monitor overall progress</li>
            </ul>
          </div>
        )}

        {user?.role === 'Manager' && (
          <div className="space-y-4">
            <p className="text-gray-700">You can manage team members and projects assigned to you.</p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Track team project statuses</li>
              <li>Assign tasks and review progress</li>
            </ul>
          </div>
        )}

        {user?.role === 'Member' && (
          <div className="space-y-4">
            <p className="text-gray-700">You can view and update your assigned tasks.</p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Check assigned tasks</li>
              <li>Update task progress</li>
            </ul>
          </div>
        )}
      </div>
    </CommonLayout>
  );
}
