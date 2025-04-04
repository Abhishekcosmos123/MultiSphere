import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Save, LogOut, Phone, Globe, Mail } from "lucide-react";
import Link from "next/link";
import { NavigationBar } from "@/components/dashboard/navigation-bar";
import { Footer } from "@/components/dashboard/footer";
import {
	CRMButtons,
	RestaurantButtons,
	RealEstateButtons,
	ELearningButtons,
} from "@/lib/content";
import { Input } from "@/components/ui/input";
import { logoutRequest } from "@/store/slices/authSlice";
import { useRouter } from "next/router";
import { showSuccessToast } from "@/lib/utils/toast";
import { storage, StorageKeys } from '@/lib/utils/storage';

interface Module {
	id: number;
	name: string;
}

export default function ProfilePage() {
    const router = useRouter();
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();
	const [selectedModule, setSelectedModule] = useState<Module>({
		id: 0,
		name: "E-learning",
	});
	const [isEditing, setIsEditing] = useState(false);

	const [name, setName] = useState(user?.name || "");
	const [phone, setPhone] = useState(user?.phone || "");
	const [email, setEmail] = useState(user?.email || "");
	const [countryCode, setCountryCode] = useState(user?.country_code || "");

	useEffect(() => {
		const savedModule = storage.getJson(StorageKeys.SELECTED_MODULE);
		if (savedModule) {
			setSelectedModule(savedModule);
		}
	}, []);

	const handleSave = () => {
		setIsEditing(false);
		console.log("Saved values:", { name, phone, email, countryCode });
	};

	const handleLogout = () => {
		const token = storage.get(StorageKeys.TOKEN);
		dispatch(logoutRequest({refreshToken: token ? String(token) : undefined}))
		storage.remove(StorageKeys.TOKEN);
		storage.remove(StorageKeys.USER);
		router.push('/');
        showSuccessToast("Logged out Successfully")
	};

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 transition-colors">
			{selectedModule && (
				<NavigationBar
					buttons={
						{
							"E-learning": ELearningButtons,
							"Real Estate": RealEstateButtons,
							"CRM Management": CRMButtons,
							Restaurants: RestaurantButtons,
						}[selectedModule.name]
					}
				/>
			)}

			<div className="flex justify-center items-center py-12 px-4">
				<Card className="w-full max-w-2xl rounded-3xl shadow-xl border-none bg-white dark:bg-gray-900 transition-all">
					<CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-3xl p-6 text-center">
						<CardTitle className="text-3xl font-bold tracking-tight">
							Profile Overview
						</CardTitle>
					</CardHeader>
					<CardContent className="p-8">
						<div className="flex flex-col items-center text-center">
							<Avatar className="h-32 w-32 mb-6 ring-4 ring-indigo-500 shadow-lg">
								<AvatarImage src={user?.profileImage} alt={name} />
								<AvatarFallback className="text-2xl bg-indigo-500 text-white">
									{user?.name?.charAt(0) || "U"}
								</AvatarFallback>
							</Avatar>

							{isEditing ? (
								<Input
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="text-xl font-semibold text-center mb-2 max-w-sm border-2 border-indigo-500 focus:border-indigo-700 transition duration-200"
								/>
							) : (
								<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
									{name}
								</h2>
							)}

							<div className="mt-6 w-full max-w-lg grid gap-5">
								<div className="flex items-center gap-3">
									<Globe className="text-indigo-500" size={20} />
									<span className="font-medium text-gray-700 dark:text-gray-300 w-32">
										Country Code:
									</span>
									{isEditing ? (
										<Input
											value={countryCode}
											onChange={(e) => setCountryCode(e.target.value)}
											className="flex-1 border-2 border-indigo-500 focus:border-indigo-700 transition duration-200"
										/>
									) : (
										<span className="text-gray-600 dark:text-gray-200">
											{countryCode}
										</span>
									)}
								</div>

								<div className="flex items-center gap-3">
									<Phone className="text-indigo-500" size={20} />
									<span className="font-medium text-gray-700 dark:text-gray-300 w-32">
										Phone:
									</span>
									{isEditing ? (
										<Input
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											className="flex-1 border-2 border-indigo-500 focus:border-indigo-700 transition duration-200"
										/>
									) : (
										<span className="text-gray-600 dark:text-gray-200">
											{phone}
										</span>
									)}
								</div>

								<div className="flex items-center gap-3">
									<Mail className="text-indigo-500" size={20} />
									<span className="font-medium text-gray-700 dark:text-gray-300 w-32">
										Email:
									</span>
									{isEditing ? (
										<Input
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="flex-1 border-2 border-indigo-500 focus:border-indigo-700 transition duration-200"
										/>
									) : (
										<span className="text-gray-600 dark:text-gray-200">
											{email}
										</span>
									)}
								</div>
							</div>

							<div className="flex justify-center gap-4 mt-8">
								{isEditing ? (
									<Button
										onClick={handleSave}
										className="bg-green-600 hover:bg-green-700 text-white px-6 transition duration-200"
									>
										<Save className="mr-2" size={18} />
										Save Changes
									</Button>
								) : (
									<Button
										variant="outline"
										onClick={() => setIsEditing(true)}
										className="hover:bg-indigo-100 dark:hover:bg-indigo-800 transition duration-200"
									>
										<Edit className="mr-2" size={18} />
										Edit Profile
									</Button>
								)}

								<Button
									variant="destructive"
									onClick={handleLogout}
									className="px-6 transition duration-200"
								>
									<LogOut className="mr-2" size={18} />
									Log Out
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<Footer />
		</div>
	);
}
