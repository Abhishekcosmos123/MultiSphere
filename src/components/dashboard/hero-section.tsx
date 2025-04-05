import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSection({ title, options, imageSrc }: { title: string, options: string[], imageSrc: string }) {
  const [index, setIndex] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % options.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="Background"
          className="object-cover"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative px-4 py-24 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {title}<sup>*</sup>
          </h1>

          <div className="relative mt-8">
            <div className="flex items-center bg-white rounded-full shadow-lg">
              <input
                type="text"
                placeholder=""
                className="w-full px-6 py-4 text-gray-900 rounded-l-full focus:outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText === "" && (
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
                  Search for{" "}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={options[index]}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block"
                    >
                      '{options[index]}'
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
              <button className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mr-1">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
