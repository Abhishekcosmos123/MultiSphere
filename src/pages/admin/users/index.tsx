import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardLayout from "../layout";
import AddUserModal from "@/components/admin/AddUserModal";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { showSuccessToast } from "@/lib/utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  getUsersRequest,
  GetUsers,
} from "@/store/slices/authSlice";
import {
  searchUsersRequest,
  deleteUserRequest,
} from "@/store/slices/admin/userSlice";

const UserTable: React.FC<{
  users: GetUsers[];
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
}> = ({ users, deleteUser, toggleUserStatus }) => (
  <Table className="min-w-full bg-white shadow-md rounded-lg">
    <TableHeader>
      <TableRow className="bg-gray-200">
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Deleted</TableHead>
        <TableHead>Updated At</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Access</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id} className="hover:bg-gray-50">
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>
            <input
              type="checkbox"
              checked={user.is_active === true}
              onChange={() => toggleUserStatus(user.id)}
              className="h-5 w-5 text-green-600"
            />
          </TableCell>
          <TableCell>{user.is_deleted}
          <input
              type="checkbox"
              checked={user.is_deleted === true}
              onChange={() => {}}
              className="h-5 w-5 text-green-600"
            />
          </TableCell>
          <TableCell>{user.updated_at}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>
            <a
              href={`/admin/manage-access`}
              className="text-blue-500 hover:underline"
            >
              Manage Access
            </a>
          </TableCell>
          <TableCell className="flex gap-2">
            <button className="bg-yellow-500 p-2 text-white rounded hover:bg-yellow-600">
              <FaEdit />
            </button>
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 p-2 text-white rounded hover:bg-red-600"
            >
              <FaTrash />
            </button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const UsersTable: React.FC = () => {
  type SearchField = "name" | "email" | "phone";

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.auth.getUsers || []);
  const [activeTab, setActiveTab] = useState("consumer");
  const [searchBy, setSearchBy] = useState<SearchField>("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getUsersRequest({ role: activeTab }));
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchUsersRequest({ searchBy, searchValue: searchTerm }));
    } else {
      dispatch(getUsersRequest({ role: activeTab }));
    }
  }, [searchTerm, searchBy, dispatch, activeTab]);

  const handleDeleteUser = (id: string) => {
    console.log(id,'Ifdd')
    setUserIdToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete) {
      dispatch(deleteUserRequest(userIdToDelete));
      showSuccessToast("User deleted successfully!");
      setUserIdToDelete(null);
    }
    setIsConfirmModalOpen(false);
  };

  const toggleUserStatus = (id: string) => {
    showSuccessToast("User status updated!");
  };

  const filteredUsers = users.filter((user) =>
    user.role === activeTab &&
    typeof user[searchBy] === "string" &&
    user[searchBy]!.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 rounded-lg shadow-md">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="consumer">Consumers</TabsTrigger>
            <TabsTrigger value="producer">Producers</TabsTrigger>
          </TabsList>

          {["consumer", "producer"].map((role) => (
            <TabsContent key={role} value={role}>
              <div className="flex items-center gap-2 mb-4">
                <select
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value as SearchField)}
                  className="border rounded px-2 py-1"
                >
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
                <input
                  type="text"
                  placeholder={`Search by ${searchBy}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <FaPlus className="mr-2" />
                  Add {role === "consumer" ? "Consumer" : "Producer"}
                </Button>
              </div>
              <UserTable
                users={filteredUsers}
                deleteUser={handleDeleteUser}
                toggleUserStatus={toggleUserStatus}
              />
            </TabsContent>
          ))}
        </Tabs>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {}}
          userType={activeTab === "consumer" ? "Consumer" : "Producer"}
        />

        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          message="Are you sure you want to delete this user?"
        />
      </div>
    </DashboardLayout>
  );
};

export default UsersTable;
