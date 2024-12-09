"use client";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { usePathname } from "next/navigation";
import { GiSelfLove } from "react-icons/gi";
import { useAuthStore } from "@/store/useAuthStore";

const TopNav = () => {
  const { isAuthenticated } = useAuthStore();
  const currentPage = usePathname();

  return (
    <Navbar
      maxWidth="full"
      className="bg-gradient-to-r from-pink-400 via-red-400 to bg-pink-600"
    >
      <NavbarBrand as={Link} href="/">
        <GiSelfLove size={40} className="text-gray-200" />
        <div className="font-bold text-3xl-flex">
          <span className="text-gray-200">Love Me</span>
        </div>
      </NavbarBrand>

      {isAuthenticated && (
        <>
          <NavbarContent justify="center">
            <NavbarItem
              isActive={currentPage === "/members"}
              className={`${
                currentPage === "/members"
                  ? "bg-black px-3 py-1 rounded-md"
                  : ""
              }`}
            >
              <Link
                className={`${
                  currentPage === "/members" ? "text-yellow-300" : "text-white"
                }`}
                href="/members"
                aria-current={currentPage === "/members" ? "page" : undefined}
              >
                Matches
              </Link>
            </NavbarItem>
            <NavbarItem
              isActive={currentPage === "/list"}
              className={`${
                currentPage === "/list" ? "bg-black px-3 py-1 rounded-md" : ""
              }`}
            >
              <Link
                className={`${
                  currentPage === "/list" ? "text-yellow-300" : "text-white"
                }`}
                href="/list"
                aria-current={currentPage === "/list" ? "page" : undefined}
              >
                List
              </Link>
            </NavbarItem>
            <NavbarItem
              isActive={currentPage === "/messages"}
              className={`${
                currentPage === "/messages"
                  ? "bg-black px-3 py-1 rounded-md"
                  : ""
              }`}
            >
              <Link
                className={`${
                  currentPage === "/messages" ? "text-yellow-300" : "text-white"
                }`}
                href="/messages"
                aria-current={currentPage === "/messages" ? "page" : undefined}
              >
                Messages
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end"></NavbarContent>
        </>
      )}

      {!isAuthenticated && (
        <NavbarContent justify="end">
          <Button
            as={Link}
            href="/login"
            variant="bordered"
            className="text-white"
          >
            Login
          </Button>

          <Button
            as={Link}
            href="/register"
            variant="bordered"
            className="text-white"
          >
            Register
          </Button>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default TopNav;
