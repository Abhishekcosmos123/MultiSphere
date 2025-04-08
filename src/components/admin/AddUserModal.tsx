import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";  
import { FaEnvelope, FaPhone, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";  
import PhoneInput from 'react-phone-input-2';  
import 'react-phone-input-2/lib/style.css';  
import '@/styles/phone-input.css';
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast"; // Import toast functions

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: { name: string; email?: string; phone?: string; role: string }) => void;
  userType: "Consumer" | "Producer";
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userType,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    email?: string;
    phone?: string;
    role: string;
  }>({
    name: "",
    email: "",
    phone: "",
    role: userType === "Consumer" ? "Consumer" : "Producer",
  });

  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    showSuccessToast(`${userType} added successfully!`);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: userType === "Consumer" ? "User" : "Producer",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="relative">
          <DialogTitle className="text-lg font-semibold">Add New {userType}</DialogTitle>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <FaTimes size={20} />
          </button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex-1 py-2 text-center ${loginMethod === 'email' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
              onClick={() => setLoginMethod('email')}
              type="button"
            >
              <FaEnvelope className="inline mr-2" /> Email
            </button>
            <button
              className={`flex-1 py-2 text-center ${loginMethod === 'phone' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
              onClick={() => setLoginMethod('phone')}
              type="button"
            >
              <FaPhone className="inline mr-2" /> Phone
            </button>
          </div>
          {loginMethod === 'email' ? (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="mt-1"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <PhoneInput
                  country={'us'}
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value })}
                  inputClass={`w-full`}
                  containerClass="phone-input-container"
                  buttonClass="phone-input-button"
                  dropdownClass="phone-input-dropdown"
                  searchClass="phone-input-search"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <Select
              value={formData.role}
              onValueChange={(value: string) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Producer">Producer</SelectItem>
                <SelectItem value="Consumer">Consumer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add {userType}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal; 