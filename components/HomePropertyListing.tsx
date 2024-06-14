import React from "react";
import PropertyCard, { IPropertyCard } from "@/components/PropertyCard";
import Link from "next/link";
import { fetchProperties } from "@/utils/requests";

const HomePropertyListing = async () => {
  const recentProperties = await fetchProperties({
    page_limit: 3,
    page_number: 1,
  });

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties?.data?.map((property: IPropertyCard) => (
                <PropertyCard key={property._id} {...property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomePropertyListing;
