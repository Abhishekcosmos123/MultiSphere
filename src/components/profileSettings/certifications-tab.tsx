"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Certification } from "../../../types/profile"

interface CertificationTabProps {
  certification?: Certification[];
}

const defaultCertification: Certification = {
  logo: null,
  certificate_name: "",
  issuing_organization: "",
  issue_date: "",
  credential_id: "",
}

export default function CertificationsTab({ certification = [] }: CertificationTabProps) {
  const [certifications, setCertifications] = useState<Certification[]>([defaultCertification])

  useEffect(() => {
    if (certification.length > 0) {
      const mapped = certification.map((c) => ({
        logo: null,
        certificate_name: c.certificate_name || "",
        issuing_organization: c.issuing_organization || "",
        issue_date: c.issue_date || "",
        credential_id: c.credential_id || "",
      }))
      setCertifications(mapped)
    }
  }, [certification])

  const handleChange = (index: number, field: keyof Certification, value: any) => {
    setCertifications((prev) =>
      prev.map((cert, i) => (i === index ? { ...cert, [field]: value } : cert))
    )
  }

  const handleDelete = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index)
    setCertifications(updated.length > 0 ? updated : [defaultCertification])
  }

  return (
    <div className="space-y-8 w-full">
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full border p-4 rounded-lg bg-gray-50 relative"
        >
          {/* Delete Button */}
          <button
            onClick={() => handleDelete(index)}
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

          {/* Logo */}
          <div className="space-y-2">
            <label className="block text-gray-700">University/Issuer Logo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null
                handleChange(index, "logo", file)
              }}
              disabled
            />
            {cert.logo && (
              <img
                src={URL.createObjectURL(cert.logo)}
                alt="Logo Preview"
                className="w-20 h-20 mt-2 object-contain border rounded"
              />
            )}
          </div>

          {/* Certificate Name */}
          <div className="space-y-2">
            <label className="block text-gray-700">Certificate Name</label>
            <Input
              value={cert.certificate_name}
              onChange={(e) => handleChange(index, "certificate_name", e.target.value)}
            />
          </div>

          {/* Issuing Organization */}
          <div className="space-y-2">
            <label className="block text-gray-700">Issuing Organization</label>
            <Input
              value={cert.issuing_organization}
              onChange={(e) => handleChange(index, "issuing_organization", e.target.value)}
            />
          </div>

          {/* Issue Date */}
          <div className="space-y-2">
            <label className="block text-gray-700">Issued Date</label>
            <Input
              type="date"
              value={cert.issue_date}
              onChange={(e) => handleChange(index, "issue_date", e.target.value)}
            />
          </div>

          {/* Credential ID */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-gray-700">Credential ID</label>
            <Input
              value={cert.credential_id}
              onChange={(e) => handleChange(index, "credential_id", e.target.value)}
            />
          </div>
        </div>
      ))}

      <Button
        onClick={() => setCertifications([...certifications, defaultCertification])}
        className="bg-purple-500 hover:bg-purple-600 text-white"
      >
        Add More
      </Button>
    </div>
  )
}
