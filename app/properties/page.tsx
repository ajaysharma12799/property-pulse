import React from "react";
import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";

const AllProperties = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <div>
            <p>No Properties Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property, idx) => (
              <PropertyCard key={idx} {...property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProperties;
