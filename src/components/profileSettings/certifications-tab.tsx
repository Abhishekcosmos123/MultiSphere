"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Certification } from "../../../types/profile"

export default function CertificationsTab() {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      logo: null,
      name: "",
      companyName: "",
      issuedDate: "",
      credentialId: "",
    },
  ])

  return (
    <div className="space-y-8 w-full">
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full border p-4 rounded-lg bg-gray-50 relative"
        >
          {/* Delete Button */}
          <button
            onClick={() => {
              const updated = certifications.filter((_, i) => i !== index)
              setCertifications(
                updated.length
                  ? updated
                  : [
                      {
                        logo: null,
                        name: "",
                        companyName: "",
                        issuedDate: "",
                        credentialId: "",
                      },
                    ],
              )
            }}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-500"
            aria-label="Delete certification entry"
          >
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
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>

          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="block text-gray-700">University/Issuer Logo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null
                const updated = [...certifications]
                updated[index].logo = file
                setCertifications(updated)
              }}
            />
            {cert.logo && (
              <img
                src={URL.createObjectURL(cert.logo) || "/placeholder.svg"}
                alt="Logo Preview"
                className="w-20 h-20 mt-2 object-contain border rounded"
              />
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-gray-700">Certificate Name</label>
            <Input
              value={cert.name}
              onChange={(e) => {
                const updated = [...certifications]
                updated[index].name = e.target.value
                setCertifications(updated)
              }}
            />
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <label className="block text-gray-700">Issuing Organization</label>
            <Input
              value={cert.companyName}
              onChange={(e) => {
                const updated = [...certifications]
                updated[index].companyName = e.target.value
                setCertifications(updated)
              }}
            />
          </div>

          {/* Issued Date */}
          <div className="space-y-2">
            <label className="block text-gray-700">Issued Date</label>
            <Input
              type="date"
              value={cert.issuedDate}
              onChange={(e) => {
                const updated = [...certifications]
                updated[index].issuedDate = e.target.value
                setCertifications(updated)
              }}
            />
          </div>

          {/* Credential ID */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-gray-700">Credential ID</label>
            <Input
              value={cert.credentialId}
              onChange={(e) => {
                const updated = [...certifications]
                updated[index].credentialId = e.target.value
                setCertifications(updated)
              }}
            />
          </div>
        </div>
      ))}

      {/* Add More Button */}
      <Button
        onClick={() =>
          setCertifications([
            ...certifications,
            {
              logo: null,
              name: "",
              companyName: "",
              issuedDate: "",
              credentialId: "",
            },
          ])
        }
        className="bg-purple-500 hover:bg-purple-600 text-white"
      >
        Add More
      </Button>
    </div>
  )
}
