"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { FaPlus } from "react-icons/fa";
export const Navbar = () => {
  const pathname = usePathname();
  const links = [
    { label: "Forms", href: "/" },
    { label: "Enums", href: "/enums" },
  ];
  return (
    <div className="navbar bg-base-100 py-4">
      <div className="container mx-auto">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Formbuilder</a>
        </div>
        <div className="flex-none space-x-5">
          {links.map((link) => (
            <button
              key={link.label}
              className={`btn btn-primary ${
                pathname === link.href && "btn-outline"
              }`}
            >
              <Link href={link.href}>{link.label}</Link>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
