import { Search } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&h=600&auto=format&fit=crop"
          alt="Real estate background"
          className="object-cover"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative px-4 py-24 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            The #1 site real estate professionals trust<sup>*</sup>
          </h1>

          <div className="relative mt-8">
            <div className="flex items-center bg-white rounded-full shadow-lg">
              <input
                type="text"
                placeholder="Address, School, City, Zip or Neighborhood"
                className="w-full px-6 py-4 text-gray-900 rounded-l-full focus:outline-none"
              />
              <button className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mr-1">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
