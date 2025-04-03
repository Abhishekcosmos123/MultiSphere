import { useDispatch } from 'react-redux';
import { logoutRequest } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/ui/button";
import { LogOut, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    profileImage?: string;
  };
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleLogout = () => {
    setDialogOpen(true);
  };

  const confirmLogout = () => {
    dispatch(logoutRequest());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationModal 
        isOpen={isDialogOpen} 
        onClose={() => setDialogOpen(false)} 
        onConfirm={confirmLogout} 
        message="Are you sure you want to log out?"
        title="Logout Confirmation"
        confirmLabel="Logout"
        cancelLabel="Cancel"
      />
    </>
  );
} 