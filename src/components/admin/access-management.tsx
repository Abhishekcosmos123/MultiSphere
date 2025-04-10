"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
import { initialModules } from "@/lib/content"

export default function AccessManagement() {
  const [modules, setModules] = useState(initialModules)
  const [role] = useState("Admin")

  const handlePermissionChange = (
    moduleIndex: number,
    value: boolean,
  ) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].read = value
    setModules(updatedModules)
  }

  const handleSave = () => {
    // Logic to save the changes can be added here
    console.log("Permissions saved:", modules)
  }

  const handleCancel = () => {
    // Logic to handle cancel can be added here
    console.log("Changes canceled")
  }

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        E-LEARNING ACCESS MANAGEMENT ({role})
      </h1>

      <div className="border rounded-md overflow-hidden shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-left p-4 font-medium text-gray-700">MODULE NAME</TableHead>
              <TableHead className="text-center p-4 font-medium text-gray-700">READ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modules.map((module, index) => (
              <TableRow key={module.name} className="border-t hover:bg-gray-50">
                <TableCell className="p-4 font-medium text-gray-800">
                  {module.name}
                </TableCell>
                <TableCell className="text-center p-4">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={module.read}
                      onCheckedChange={(checked) =>
                        handlePermissionChange(index, checked as boolean)
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleCancel}
          className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  )
}
