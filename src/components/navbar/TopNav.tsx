import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { GiSelfLove } from "react-icons/gi";

const TopNav = () => {
  return (
    <Navbar
      maxWidth="full"
      className="bg-gradient-to-r from-pink-400 via-red-400 to bg-pink-600"
      classNames={{
        item: [
          "text-xl",
          "text-white",
          "uppercase",
          "data-[active=true]:text-yellow-200",
        ],
      }}
    >
      <NavbarBrand as={Link} href="/">
        <GiSelfLove size={40} className="text-gray-200" />
        <div className="font-bold text-3xl-flex">
          <span className="text-gray-200">Love Me</span>
        </div>
      </NavbarBrand>
      <NavbarItem>
        <Link color="foreground" href="/members">
          Matches
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/list">
          List
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/messages">
          Messages
        </Link>
      </NavbarItem>

      <NavbarContent></NavbarContent>
    </Navbar>
  );
};

export default TopNav;
