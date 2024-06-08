import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuBedSingle } from "react-icons/lu";
import { FaBath } from "react-icons/fa";
import { FaRulerCombined } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

interface IPropertyCard {
  _id: string;
  name: string;
  type: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  rates: {
    weekly: number;
    monthly: number;
    nightly: number;
  };
  images: [string];
}

const PropertyCard = (props: IPropertyCard) => {
  const { _id, baths, beds, images, location, name, rates, square_feet, type } =
    props;

  const getRateDisplay = () => {
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/Month`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/Week`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/Night`;
    }
  };

  return (
    <React.Fragment>
      {/* <!-- Listing 1 --> */}
      <div className="rounded-xl shadow-md relative">
        <Image
          src={`/assets/images/properties/${images[0]}`}
          alt=""
          className="w-100 h-auto rounded-t-xl"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="p-4">
          <div className="text-left md:text-center lg:text-left mb-6">
            <div className="text-gray-600">{type}</div>
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
          <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
            ${getRateDisplay()}
          </h3>

          <div className="flex justify-center gap-4 text-gray-500 mb-4">
            <p className="flex items-center gap-2">
              <LuBedSingle /> {beds}{" "}
              <span className="md:hidden lg:inline">Beds</span>
            </p>
            <p className="flex items-center gap-2">
              <FaBath /> {baths}{" "}
              <span className="md:hidden lg:inline">Baths</span>
            </p>
            <p className="flex items-center gap-2">
              <FaRulerCombined />
              {square_feet} <span className="md:hidden lg:inline">sqft</span>
            </p>
          </div>

          <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
            {rates.monthly && (
              <p className="flex items-center gap-2">
                <FaMoneyBill /> Monthly
              </p>
            )}

            {rates.weekly && (
              <p className="flex items-center gap-2">
                <FaMoneyBill /> Weekly
              </p>
            )}

            {rates.nightly && (
              <p className="flex items-center gap-2">
                <FaMoneyBill /> Night
              </p>
            )}
          </div>

          <div className="border border-gray-100 mb-5"></div>

          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
              <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
              <span className="text-orange-700">
                {" "}
                {location.city} {location.state}{" "}
              </span>
            </div>
            <Link
              href={`/properties/${_id}`}
              className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PropertyCard;
