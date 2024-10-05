/** @format */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConnectWallet } from "./ConnectWallet";

function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link to={"/"} id="logo" className="flex items-center">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link to={"/search"}>
            <Input id="search" type="search" placeholder="Search" className="w-full md:w-96" />
          </Link>
          <div className="flex items-center gap-4">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default Navbar;
