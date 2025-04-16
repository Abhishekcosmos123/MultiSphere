import { PencilIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ProfileHeaderProps {
    name: string;
    title: string;
    location: string;
    connections: number;
    profileImageUrl: File | null
    backgroundImageUrl: string
    university: string
    setIsEditing: (value: boolean) => void;
    selected: string | null;
}

export default function ProfileHeader({
    name,
    title,
    location,
    profileImageUrl,
    backgroundImageUrl,
    university,
    setIsEditing,
    selected,
}: ProfileHeaderProps) {
    return (
        <div className="relative">
            <div className="h-64 w-full relative bg-slate-300">
                <Image
                    src={backgroundImageUrl || "/placeholder.svg"}
                    alt="Profile background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="px-4 relative">
                <div className="absolute -top-20 left-4">
                    <div className="rounded-full border-4 border-white overflow-hidden h-36 w-36 relative">
                        <Image src={
                            profileImageUrl
                                ? typeof profileImageUrl === "string"
                                    ? profileImageUrl
                                    : URL.createObjectURL(profileImageUrl)
                                : "/placeholder.svg"
                        } alt={name} fill className="object-cover" priority />
                    </div>
                </div>

                <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white/80 hover:bg-white/90" onClick={() => setIsEditing(true)}>
                        <PencilIcon className="h-5 w-5" />
                    </Button>
                </div>

                <div className="pt-20 pb-2">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">{name}</h1>
                            </div>
                            <p className="text-gray-700 text-xl">{title}</p>
                            <p className="text-gray-500">
                                {location}
                            </p>

                            <div className="flex space-x-2 mt-2">
                                <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                    </svg>
                                </Button>
                                <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect x="2" y="9" width="4" height="12"></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                </Button>
                                <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </Button>
                            </div>
                        </div>

                        {selected !== "Restaurants" && selected !== "Real Estate" && university && (
                            <div className="mt-4">
                                {/* University section */}
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/dav.png"
                                        alt="University logo"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div className="ml-2">
                                        <p className="font-medium">{university}</p>
                                    </div>
                                </div>

                                {/* Learners + Reviews section */}
                                <div className="flex justify-start gap-8 mt-4 mb-6">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">1211</p>
                                        <p className="text-gray-500">Total learners</p>
                                    </div>

                                    <div className="text-center flex flex-col items-center">
                                        <div className="flex items-center">
                                            <p className="text-2xl font-bold mr-2">212</p>
                                            <div className="flex">
                                                <StarIcon className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                                                <StarIcon className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                                                <StarIcon className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                                                <StarIcon className="h-6 w-6 text-gray-200" />
                                            </div>
                                        </div>
                                        <p className="text-gray-500">Reviews</p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}
