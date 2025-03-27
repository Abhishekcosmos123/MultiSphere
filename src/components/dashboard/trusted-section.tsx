import { trustedCompanies } from "@/lib/content"
import Image from "next/image"

export function TrustedSection() {
  return (
    <div className="py-6 bg-gray-50">
      <div className="px-4 mx-auto text-center mx-auto max-w-7xl">
        <p className="text-lg font-medium text-gray-600">
          Trusted by over 16,000 companies and millions of learners around the world
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
          {trustedCompanies.map((company) => (
            <div key={company.id} className="flex items-center justify-center flex-grow">
              <Image
                src={company.logo}
                alt={company.name}
                width={64}
                height={64}
                className="grayscale opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
