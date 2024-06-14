import React from "react";
import PropertyCard, { IPropertyCard } from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";

const AllProperties = async () => {
  const properties = await fetchProperties({
    page_limit: 10,
    page_number: 1,
  });

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <div>
            <p>No Properties Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.data?.map((property: IPropertyCard, idx: number) => (
              <PropertyCard key={idx} {...property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProperties;
