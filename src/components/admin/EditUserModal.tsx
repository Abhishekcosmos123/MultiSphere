import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GetUsers } from "@/store/slices/authSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: GetUsers | null;
  onSubmit: (updatedUser: GetUsers) => void;
}

const EditUserModal: React.FC<Props> = ({ isOpen, onClose, user, onSubmit }) => {
    console.log(user,'user')
  const [form, setForm] = useState<GetUsers | null>(user);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  if (!form) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" />
          <Input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" />
          <Input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" />
          <Input name="country_code" value={form.country_code || ""} onChange={handleChange} placeholder="Country Code" />

          <div className="flex items-center space-x-2">
            <label>Status:</label>
            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleCheckboxChange} />
          </div>

          <div className="flex items-center space-x-2">
            <label>Deleted:</label>
            <input type="checkbox" name="is_deleted" checked={form.is_deleted} onChange={handleCheckboxChange} />
          </div>

          <div className="flex justify-end space-x-2">
            <Button onClick={onClose} variant="outline">Cancel</Button>
            <Button onClick={() => onSubmit(form)} className="bg-blue-600 text-white">Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
