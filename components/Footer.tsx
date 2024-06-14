import Image from "next/image";
import React from "react";
import Logo from "@/assets/images/logo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image
            src={Logo}
            alt="Logo"
            className="h-8 w-auto"
            width={0}
            height={0}
          />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <Link
            href={"https://www.linkedin.com/in/ajaysharma12799/"}
            target="_blank"
          >
            Follow me: @ajaysharma12799
          </Link>
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; 2024 PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
