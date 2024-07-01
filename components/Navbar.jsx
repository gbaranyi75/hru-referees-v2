"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/hru-logo_sm.png";
import profileDefault from "@/assets/images/profile.png";
import { signOut, useSession, getProviders } from "next-auth/react";
import { FaFacebook } from "react-icons/fa";
import LoadingComponent from "./common/LoadingComponent";

const Navbar = () => {
  const { data: session, loading, status, update } = useSession();
  const profileImage = session?.user?.image;
  const userRole = session?.user?.role;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  useEffect(() => {
    setIsAdmin(userRole === "admin");
  }, [session]);

  return (
    <nav className="bg-red-500 border-b border-red-200">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                className="h-14 w-auto"
                src={logo}
                alt="JV Bizottság"
                width={40}
                height={40}
              />

              <span className="hidden md:block font-bold">
                <div className="text-gray-300 text-xs font-medium md:ml-2">
                  <div className="flex-col">
                    <div className="flex justify-center">MRGSZ</div>
                    <div className="flex justify-center">
                      Játékvezetői Bizottság
                    </div>
                  </div>
                </div>
              </span>
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden md:ml-6 md:block space-x-2 my-auto">
              <Link
                href="/"
                className={`${
                  pathname === "/" ? "bg-red-300" : ""
                } hover:bg-red-400 text-white px-3 py-2 rounded-md text-xs font-medium`}
              >
                Főoldal
              </Link>
              <Link
                href="/tablazat"
                className={`${
                  pathname === "/tablazat" ? "bg-red-300" : ""
                } hover:bg-red-400 text-white px-3 py-2 rounded-md text-xs font-medium`}
              >
                Táblázat
              </Link>
              <Link
                href="/merkozesek"
                className={`${
                  pathname === "/merkozesek" ? "bg-red-300" : ""
                } hover:bg-red-400 text-white px-3 py-2 rounded-md text-xs font-medium`}
              >
                Mérkőzések
              </Link>
              {session && (
                <Link
                  href="/"
                  className={`${
                    pathname === "/properties/add" ? "bg-red-300" : ""
                  } hover:bg-red-400 text-white px-3 py-2 rounded-md text-xs font-medium`}
                >
                  Később...
                </Link>
              )}
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!session && status === "unauthenticated" && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                <button
                  onClick={() => router.push("/auth/belepes")}
                  className="flex items-center text-sm py-2 px-4 border text-md border-gray-300 text-white hover:bg-red-400 shadow-sm rounded-md"
                >
                  <span>Belépés vagy regisztráció</span>
                </button>
              </div>
            </div>
          )}

          {status === "loading" && (<LoadingComponent text={"Profil betöltése..."} textColor={"text-gray-200"}/>)}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              {/* <!-- Profile dropdown button --> */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full border-2 border-white"
                      src={profileImage || profileDefault}
                      alt=""
                      width={50}
                      height={50}
                    />
                  </button>
                </div>

                {/* <!-- Profile dropdown --> */}
                {isProfileMenuOpen && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    {isAdmin && (
                      <Link
                        href="/dashboard/calendar"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                        }}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/profil"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Profilom
                    </Link>
                    <Link
                      href="/jv-elerhetoseg"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Elérhetőség megadása
                    </Link>
                    <hr />
                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-3"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut({ redirect: false }).then(() => {
                          router.push("/");
                        });
                      }}
                    >
                      Kijelentkezés
                    </button>
                  </div>
                )}
              </div>
              <div className="hidden ml-6 md:inline-block">
                <a
                  className="flex items-center justify-center"
                  href="https://www.facebook.com/groups/513219272190437"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook color="white" size={32} />
                  {/* <span className="ml-2">Facebook</span> */}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/tablazat"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`${
                pathname === "/tablazat" ? "bg-red-300" : ""
              } text-white block rounded-md px-3 py-2 text-sm font-medium`}
            >
              Táblázat
            </Link>
            <Link
              href="/merkozesek"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`${
                pathname === "/merkozesek" ? "bg-red-300" : ""
              } text-white block rounded-md px-3 py-2 text-sm font-medium`}
            >
              Mérkőzések
            </Link>
            {/* <Link
              href="/"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`${
                pathname === "/tablazat" ? "bg-red-300" : ""
              } text-white block rounded-md px-3 py-2 text-sm font-medium`}
            >
              Később....
            </Link> */}
            <div className="flex md:hidden text-white rounded-md px-3 py-2 text-sm font-medium">
              <a
                className="flex items-center justify-center"
                href="https://www.facebook.com/groups/513219272190437"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook color="white" size={24} />
                <span className="ml-2">Facebook</span>
              </a>
            </div>
            <Link
              href="/auth/belepes"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex justify-center text-sm ml-2 max-w-56 py-2 px-4 border text-md border-gray-300 text-white hover:bg-red-400 shadow-sm rounded-md"

            >
              Belépés vagy regisztráció
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
