import React, { useState, useEffect } from "react";
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
import { useDispatch } from 'react-redux';
import { getUsersRequest } from '@/store/slices/authSlice'; // Import the action
import { searchUsersRequest } from "@/store/slices/admin/userSlice";

interface User {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  loginTime: string;
  type: string;
  role: string; 
}

const initialUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Consumer ${i + 1}`,
  email: `consumer${i + 1}@mail.com`,
  status: i % 2 === 0 ? "Active" : "Inactive",
  loginTime: "10:30 AM",
  type: "Consumer",
  role: "User", 
}));

const initialProducers: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Producer ${i + 1}`,
  email: `producer${i + 1}@mail.com`,
  status: i % 2 === 0 ? "Active" : "Inactive",
  loginTime: "12:15 PM",
  type: "Producer",
  role: "Admin",
}));

interface UserTableProps {
  users: User[];
  deleteUser: (id: number) => void;
  toggleUserStatus: (id: number) => void; 
}

const UserTable: React.FC<UserTableProps> = ({ users, deleteUser, toggleUserStatus }) => (
  <Table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
    <TableHeader>
      <TableRow className="bg-gray-200">
        <TableHead className="text-left text-gray-600">ID</TableHead>
        <TableHead className="text-left text-gray-600">Name</TableHead>
        <TableHead className="text-left text-gray-600">Email</TableHead>
        <TableHead className="text-left text-gray-600">Status</TableHead>
        <TableHead className="text-left text-gray-600">Last Login</TableHead>
        <TableHead className="text-left text-gray-600">Role</TableHead>
        <TableHead className="text-left text-gray-600">Manage Access</TableHead>
        <TableHead className="text-left text-gray-600">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map(user => (
        <TableRow key={user.id} className="text-left hover:bg-gray-100 transition-colors">
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>
            <input 
              type="checkbox" 
              checked={user.status === "Active"} 
              onChange={() => toggleUserStatus(user.id)} 
              className="form-checkbox h-5 w-5 text-green-600"
            />
          </TableCell>
          <TableCell>{user.loginTime}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>
            <a href={`/admin/manage-access`} className="text-blue-500 hover:underline">Manage Access</a>
          </TableCell>
          <TableCell>
            <button className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition-colors mr-2">
              <FaEdit />
            </button>
            <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors" onClick={() => deleteUser(user.id)}>
              <FaTrash />
            </button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const UsersTable: React.FC = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<string>("Consumers");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [producers, setProducers] = useState<User[]>(initialProducers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null); 

  useEffect(() => {
    dispatch(getUsersRequest({ role: activeTab }));
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchUsersRequest({ searchBy: "name", searchValue: searchTerm }));
    }
  }, [searchTerm, dispatch]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete !== null) {
      if (activeTab === "Consumers") {
        setUsers(users.filter(user => user.id !== userIdToDelete));
      } else {
        setProducers(producers.filter(producer => producer.id !== userIdToDelete));
      }
      showSuccessToast("User deleted successfully!"); // Show success toast
      setUserIdToDelete(null); // Reset user ID after deletion
    }
    setIsConfirmModalOpen(false); // Close confirmation modal
  };

  const handleDeleteUser = (id: number) => {
    setUserIdToDelete(id); // Set user ID to delete
    setIsConfirmModalOpen(true); // Open confirmation modal
  };

  const toggleUserStatus = (id: number) => {
    if (activeTab === "Consumers") {
      setUsers(users.map(user => user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user));
    } else {
      setProducers(producers.map(producer => producer.id === id ? { ...producer, status: producer.status === "Active" ? "Inactive" : "Active" } : producer));
    }
    showSuccessToast("User status updated successfully!"); // Show success toast
  };

  const handleAddUser = (userData: { name: string; email?: string; phone?: string; role: string }): void => {
    const newUser: User = {
      id: activeTab === "Consumers" ? users.length + 1 : producers.length + 1,
      name: userData.name,
      email: userData.email || "",
      status: "Active",
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: activeTab === "Consumers" ? "Consumer" : "Producer",
      role: userData.role,
    };

    if (activeTab === "Consumers") {
      setUsers([...users, newUser]);
    } else {
      setProducers([...producers, newUser]);
    }
  };

  const filteredUsers = activeTab === "Consumers" 
    ? users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : producers.filter(producer => producer.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 rounded-lg shadow-md">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="Consumers" className={`px-4 py-2 rounded-lg ${activeTab === "Consumers" ? "bg-blue-600 text-white" : "bg-gray-300"}`}>
              Consumers
            </TabsTrigger>
            <TabsTrigger value="Producers" className={`px-4 py-2 rounded-lg ${activeTab === "Producers" ? "bg-blue-600 text-white" : "bg-gray-300"}`}>
              Producers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Consumers">
            <input 
              type="text" 
              placeholder="Search by name" 
              className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <Button 
              className="bg-green-600 text-white mb-4 float-right px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="mr-2" /> Add Consumer
            </Button>
            <UserTable users={filteredUsers} deleteUser={handleDeleteUser} toggleUserStatus={toggleUserStatus} />
          </TabsContent>
          <TabsContent value="Producers">
            <input 
              type="text" 
              placeholder="Search by name" 
              className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <Button 
              className="bg-green-600 text-white mb-4 float-right px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="mr-2" /> Add Producer
            </Button>
            <UserTable users={filteredUsers} deleteUser={handleDeleteUser} toggleUserStatus={toggleUserStatus} />
          </TabsContent>
        </Tabs>
        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddUser}
          userType={activeTab === "Consumers" ? "Consumer" : "Producer"}
        />
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this user?"
          title="Delete User"  
          confirmLabel="Delete"  
          cancelLabel="Cancel"  
        />
      </div>
    </DashboardLayout>
  );
};

export default UsersTable;
