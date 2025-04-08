import { Card } from "@/components/ui/card"
import { PencilIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Certification {
  title: string
  issuer: string
  date: string
  credentialId: string
  logo: string
}

interface CertificationsSectionProps {
  certifications: Certification[]
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">Licenses & certifications</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {certifications.map((certification, index) => (
          <div key={index} className="flex">
            <div className="mr-4">
              <div className="h-12 w-12 bg-white border border-gray-200 rounded flex items-center justify-center">
                <Image
                  src={certification.logo || "/placeholder.svg"}
                  alt={certification.issuer}
                  width={32}
                  height={32}
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold">{certification.title}</h3>
              <p className="text-sm text-gray-700">{certification.issuer}</p>
              <p className="text-sm text-gray-500">{certification.date}</p>
              <p className="text-sm text-gray-500">Credential ID {certification.credentialId}</p>

              <Button variant="outline" className="mt-2 text-sm h-8 rounded-full">
                Show credential
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
