import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logoutRequest } from '@/store/slices/authSlice';
import { RootState } from '@/store';
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
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { showSuccessToast, showErrorToast } from '@/lib/utils/toast';
import { storage, StorageKeys } from '@/lib/utils/storage';
import { updateUserRequest } from '@/store/slices/profileSlice';

interface ProfileDropdownProps {
  user: {
    name: string;
    email?: string;
    profileImage?: string;
    phone?: string;
    id: string;
  };
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  // const { userProfile } = useSelector((state: RootState) => state.profile);

  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    setDialogOpen(true);
  };

  const confirmLogout = () => {
    const token = storage.get(StorageKeys.TOKEN);
    dispatch(logoutRequest({ refreshToken: token ? String(token) : undefined }));
    setDialogOpen(false);
  };

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  // useEffect(() => {
  //   if (!isAuthenticated && !loading) {
  //     showSuccessToast('Logged out successfully!');
  //     storage.remove(StorageKeys.TOKEN);
  //     // storage.remove(StorageKeys.USER);
  //     router.push('/');
  //   }
  // }, [isAuthenticated, loading]);

  const fetchProfile = async () => {
    try {
      dispatch(updateUserRequest(user?.id))
      router.push('/profile');
    } catch (error) {
      showErrorToast('Failed to fetch profile data');
    }
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
                {user.email ? user.email : user.phone}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={fetchProfile}>
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
