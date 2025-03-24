import Image from "next/image";
import { Heart } from "lucide-react";
import { Badge } from "@/ui/badge";

interface PropertyCardProps {
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  type: string;
  image: string;
  new?: boolean;
  lot?: string;
}

export function PropertyCard({
  price,
  beds,
  baths,
  sqft,
  address,
  city,
  state,
  zip,
  type,
  image,
  new: isNew = false,
  lot,
}: PropertyCardProps) {
  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
      <div className="relative aspect-[4/3]">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${address}, ${city}, ${state} ${zip}`}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://via.placeholder.com/600x400/eeeeee/999999?text=Property+Image";
          }}
        />

        <button className="absolute p-2 bg-white rounded-full top-2 right-2">
          <Heart className="w-5 h-5 text-gray-500" />
        </button>

        {isNew && (
          <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
            New
          </Badge>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs font-medium text-gray-500">{type}</div>

        <div className="mt-1 text-2xl font-bold text-gray-900">
          ${price.toLocaleString()}
        </div>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
          <span>
            <span className="font-bold">{beds}</span> bed
          </span>
          <span>
            <span className="font-bold">{baths}</span> bath
          </span>
          <span>
            <span className="font-bold">{sqft.toLocaleString()}</span> sqft
          </span>
        </div>

        <div className="mt-2 text-sm text-gray-700">{address}</div>

        <div className="mt-1 text-sm text-gray-700">
          {city}, {state} {zip}
        </div>
      </div>
    </div>
  );
}
