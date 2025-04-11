import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import DashboardLayout from "../layout";
import AddUserModal, { AddUserModalHandle } from "@/components/admin/AddUserModal";
import EditUserModal from "@/components/admin/EditUserModal";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import {
  getUsersRequest,
  GetUsers,
} from "@/store/slices/authSlice";
import {
  createUserRequest,
  deleteUserRequest,
  searchUsersRequest,
  updateUserRequest,
} from "@/store/slices/admin/userSlice";

import { RootState } from "@/store";
import {
  CreateUserPayload,
  UpdateUserPayload,
} from "@/lib/api/services/authService";
import { showErrorToast, showSuccessToast } from "@/lib/utils/toast";

// -------------------- UserTable --------------------
const UserTable: React.FC<{
  users: GetUsers[];
  deleteUser: (id: string) => void;
  onEditUser: (user: GetUsers) => void;
}> = ({ users, deleteUser, onEditUser }) => (
  <Table className="min-w-full bg-white shadow-md rounded-lg">
    <TableHeader>
      <TableRow className="bg-gray-200">
        {[
          "ID", "Name", "Email", "Mobile", "Status",
          "Deleted", "Updated At", "Access", "Actions"
        ].map((head) => (
          <TableHead key={head}>{head}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id} className="hover:bg-gray-50">
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.phone}</TableCell>
          <TableCell>
            <input type="checkbox" checked={user.is_active} readOnly className="h-5 w-5 text-green-600" />
          </TableCell>
          <TableCell>
            <input type="checkbox" checked={user.is_deleted} readOnly className="h-5 w-5 text-green-600" />
          </TableCell>
          <TableCell>{user.updated_at}</TableCell>
          <TableCell>
            <a href="/admin/manage-access" className="text-blue-500 hover:underline">
              Manage Access
            </a>
          </TableCell>
          <TableCell className="flex gap-2">
            <button onClick={() => onEditUser(user)} className="bg-yellow-500 p-2 text-white rounded hover:bg-yellow-600">
              <FaEdit />
            </button>
            <button onClick={() => deleteUser(user.id)} className="bg-red-500 p-2 text-white rounded hover:bg-red-600">
              <FaTrash />
            </button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

// -------------------- UsersTable --------------------
const UsersTable: React.FC = () => {
  type SearchField = "name" | "email" | "phone";

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.auth.getUsers || []);
  const createUserStatus = useSelector((state: RootState) => state.users);

  const [activeTab, setActiveTab] = useState("consumer");
  const [searchBy, setSearchBy] = useState<SearchField>("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<GetUsers | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const modalRef = useRef<AddUserModalHandle>(null);

  useEffect(() => {
    if (searchTerm.trim()) {
      dispatch(searchUsersRequest({ searchBy, searchValue: searchTerm }));
    } else {
      dispatch(getUsersRequest({ role: activeTab }));
    }
  }, [searchTerm, searchBy, activeTab, dispatch]);

  useEffect(() => {
    if (createUserStatus?.createdUser?.data) {
      showSuccessToast(createUserStatus.createdUser.message);
      setIsEditModalOpen(false);
      modalRef.current?.resetForm();
      setIsModalOpen(false);
      dispatch(getUsersRequest({ role: activeTab }));
    } else if (createUserStatus?.error) {
      showErrorToast(createUserStatus.error);
    }
  }, [createUserStatus?.createdUser, createUserStatus?.error]);

  const handleDeleteUser = (id: string) => {
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

  const handleEditClick = (user: GetUsers) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (updatedUser: GetUsers) => {
    const payload: UpdateUserPayload = {
      userId: updatedUser.id,
      userData: {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        country_code: updatedUser.country_code,
        is_active: updatedUser.is_active,
        is_deleted: updatedUser.is_deleted,
      },
    };
    dispatch(updateUserRequest(payload));
    showSuccessToast("User updated successfully");
    setIsEditModalOpen(false);
  };

  const handleUserSubmit = (userData: {
    name: string;
    email?: string;
    phone?: string;
    password?: string;
  }) => {
    const phoneNumber = userData.phone?.replace(/^\+/, "");
    const countryCode = phoneNumber?.slice(0, -10);
    const mobileNumber = phoneNumber?.slice(-10);

    const payload: CreateUserPayload = {
      provider: userData.email ? "email" : "phone",
      name: userData.name,
      role: activeTab.toLowerCase(),
      created_by: "User",
      ...(userData.email
        ? { email: userData.email, password: userData.password }
        : { phone: mobileNumber, country_code: `+${countryCode}` }),
    };

    dispatch(createUserRequest(payload));
  };

  const filteredUsers = users.filter(
    (user) =>
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
                onEditUser={handleEditClick}
              />
            </TabsContent>
          ))}
        </Tabs>

        <AddUserModal
          ref={modalRef}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUserSubmit}
          userType={activeTab === "consumer" ? "Consumer" : "Producer"}
        />

        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={editUser}
          onSubmit={handleEditSubmit}
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
