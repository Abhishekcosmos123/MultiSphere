import Image from "next/image";

interface CTAProps {
  heading: string;
  backgroundImage: string;
}

export function CTASection({ heading, backgroundImage }: CTAProps) {
  return (
    <div className="py-6 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{heading}</h2>
        <div className="relative w-full h-[250px] rounded-2xl shadow-md overflow-hidden">
          <Image
            src={backgroundImage}
            alt={heading}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
