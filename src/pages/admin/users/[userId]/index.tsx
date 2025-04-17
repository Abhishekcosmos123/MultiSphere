import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateUserRequest } from "@/store/slices/profileSlice";
import LoaderWithLabel from "@/ui/loader-with-label"
import { UserProfile } from "@/components/profile/user-profile";
import { CoordinatorProfile } from "@/components/profile/coordinator-profile";
import DashboardLayout from "../../layout";
import { ArrowLeft } from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();
  const { userId, role } = router.query;
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (userId) {
      dispatch(updateUserRequest(userId as string));
    }
  }, [userId, dispatch]);

  const goBack = () => router.back();

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 w-fit" onClick={goBack}>
        <ArrowLeft size={20} />
        <span>Back</span>
      </div>
      {userProfile.loading ? (
        <LoaderWithLabel label="Loading profile..." />
      ) : role === "coordinator" ? (
        <CoordinatorProfile
          user={undefined} name={""} phone={""} email={""} countryCode={""} contactConsent={false} setContactConsent={function (value: boolean): void {
            throw new Error("Function not implemented.");
          }} setIsEditing={function (value: boolean): void {
            throw new Error("Function not implemented.");
          }} handleLogout={function (): void {
            throw new Error("Function not implemented.");
          }} setName={function (value: string): void {
            throw new Error("Function not implemented.");
          }} setEmail={function (value: string): void {
            throw new Error("Function not implemented.");
          }} setPhone={function (value: string): void {
            throw new Error("Function not implemented.");
          }} {...userProfile.userProfile}
          isEditing={false}
          handleSave={() => { }}
          readonly />
      ) : (
        <UserProfile user={userProfile.userProfile} name={""} setIsEditing={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }} selected={null} 
        readonly />
      )
      }
    </DashboardLayout>
  );
};


export default ProfilePage;
