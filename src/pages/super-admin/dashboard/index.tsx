import DashboardLayout from "../layout"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"  

export default function DashboardPage() {
    const [crmModules] = useState([
        { id: 1, name: "E-learning" },
        { id: 2, name: "Real Estate" },
        { id: 3, name: "Restaurants" },
        { id: 4, name: "CRM Management" },
    ])

    const [selectedModule, setSelectedModule] = useState(crmModules[0])

    useEffect(() => {
        const savedModule = localStorage.getItem('selectedModule');
        if (savedModule) {
            setSelectedModule(JSON.parse(savedModule));
        }
    }, []);

    const handleModuleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const moduleId = parseInt(event.target.value)
        const module = crmModules.find(mod => mod.id === moduleId)
        if (module) {
            setSelectedModule(module)
        }
    }

    const handleSave = () => {
        localStorage.setItem('selectedModule', JSON.stringify(selectedModule));
        // Logic to save the selected module
        console.log("Saved module:", selectedModule);
    }

    const handleCancel = () => {
        // Logic to cancel the selection
        setSelectedModule(crmModules[0]);
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
                
                <Card className="p-4 mt-4">
                    <h6 className="text-sm font-semibold">Select Module</h6>
                    <select 
                        value={selectedModule.id} 
                        onChange={handleModuleChange} 
                        className="border rounded-md p-2 w-full"
                    >
                        {crmModules.map(module => (
                            <option key={module.id} value={module.id}>
                                {module.name}
                            </option>
                        ))}
                    </select>
                
                    <div className="mt-4 flex space-x-4">
                        <button 
                            onClick={handleSave} 
                            className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition"
                        >
                            Save
                        </button>
                        <button 
                            onClick={handleCancel} 
                            className="bg-gray-300 text-black rounded-md p-2 hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}