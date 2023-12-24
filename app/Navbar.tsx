"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { FaPlus } from "react-icons/fa";
export const Navbar = () => {
  const pathname = usePathname();
  const links = [
    { label: "Forms", href: "/forms" },
    { label: "Enums", href: "/enums" },
  ];
  return (
    <div className="navbar bg-base-100 py-4 flex-none">
      <div className="flex-1 px-9">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Formbuilder</a>
        </div>
        <div className="flex-none space-x-5">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              <button
                className={`btn btn-primary ${
                  pathname === link.href && "btn-outline"
                }`}
              >
                {link.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
