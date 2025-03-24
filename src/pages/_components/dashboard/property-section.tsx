import { PropertyCard } from "../../_components/dashboard/property-card";

interface PropertySectionProps {
  title: string;
  location: string;
  properties: any[];
}

export function PropertySection({
  title,
  location,
  properties,
}: PropertySectionProps) {
  return (
    <div className="py-12 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">View all in {location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              price={property.price}
              beds={property.beds}
              baths={property.baths}
              sqft={property.sqft}
              address={property.address}
              city={property.city}
              state={property.state}
              zip={property.zip}
              type={property.type}
              image={property.image}
              new={property.new}
              lot={property.lot}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
