import { useEffect, useState } from "react";
import DashboardLayout from "../layout";
import { Switch } from "@/components/ui/switch";
import { getCookie, setCookie } from 'cookies-next';

const SettingsPage = () => {
    const [isProducerMode, setIsProducerMode] = useState<boolean>(false);

    useEffect(() => {
        const storedMode = getCookie("producerMode") as string; 
        if (storedMode) {
            setIsProducerMode(JSON.parse(storedMode));
        }
    }, []);                                             

    const toggleProducerMode = () => {
        setIsProducerMode(prevMode => {
            const newMode = !prevMode;
            setCookie("producerMode", JSON.stringify(newMode), { path: '/' }); 
            return newMode;
        });
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <div className="flex items-center space-x-4">
                <span className="text-lg">Producer Mode:</span>
                <Switch 
                    checked={isProducerMode} 
                    onCheckedChange={toggleProducerMode} 
                    className="transition duration-200 ease-in-out" 
                />
            </div>
        </DashboardLayout>
    );
}

export default SettingsPage;