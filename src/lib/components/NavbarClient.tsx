"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

type NavbarClientUser = {
  id: string;
  name?: string | null;
  profileImageUrl?: string | null;
};

interface NavbarClientProps {
  isLoggedIn: boolean;
  isArtisan: boolean;
  isApplicant: boolean;
  user?: NavbarClientUser;
}

const NavbarClient = ({ isLoggedIn, isArtisan, isApplicant, user }: NavbarClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  const getNavLinkClasses = (href: string) => {
    const isActive = pathname === href;
    return [
      "text-sm font-medium rounded-md px-3 py-1.5 transition-colors",
      isActive
        ? "text-orange-700 bg-orange-50 border border-orange-200"
        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-50 supports-[backdrop-filter]:bg-white/20 bg-white/20 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-900 tracking-tight hover:text-orange-600 transition-colors group"
          onClick={closeMenu}
        >
          <div className="relative">
            <Image
              src="/logo-warisin.svg"
              alt="Warisin Logo"
              width={32}
              height={32}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </div>
          <span className="bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">Warisin</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 items-center">
          {!isLoggedIn && (
            <>
              <Link href="/artisans" className={getNavLinkClasses("/artisans")}>
                Artists
              </Link>
              <Link href="/programs" className={getNavLinkClasses("/programs")}>
                Programs
              </Link>
              <div className="flex items-center gap-2">
                <Link href="/login" className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 text-sm">
                  Login
                </Link>
                <Link href="/register" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm">
                  Sign Up
                </Link>
              </div>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link href="/artisans" className={getNavLinkClasses("/artisans")}>
                Artists
              </Link>
              <Link href="/programs" className={getNavLinkClasses("/programs")}>
                Programs
              </Link>
              <div className="flex items-center gap-3">
                {(isArtisan || isApplicant) && (
                  <Link
                    href={isArtisan ? "/dashboard/artisan" : "/dashboard/applicant"}
                    className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 border border-orange-200 text-sm"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <Link href={isArtisan ? `/artisan/${user?.id}` : "/profile"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {user?.profileImageUrl ? (
                      <Image
                        src={user.profileImageUrl}
                        alt={user?.name || "User"}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-200 hover:ring-orange-300 transition-all"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center ring-2 ring-orange-200 hover:ring-orange-300 transition-all">
                        <span className="text-white font-semibold text-xs">{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
                      </div>
                    )}
                    <span className="text-gray-700 font-medium hidden lg:block text-sm">{user?.name || "User"}</span>
                  </Link>
                  <LogoutButton />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          {isLoggedIn ? (
            <Link href={isArtisan ? `/artisan/${user?.id}` : "/profile"} className="flex items-center gap-2" onClick={closeMenu}>
              {user?.profileImageUrl ? (
                <Image src={user.profileImageUrl} alt={user?.name || "User"} width={32} height={32} className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-200" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center ring-2 ring-orange-200">
                  <span className="text-white font-semibold text-xs">{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
                </div>
              )}
            </Link>
          ) : (
            <Link href="/login" className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 text-sm" onClick={closeMenu}>
              
            </Link>
          )}

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div id="mobile-menu" className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${isMenuOpen ? "max-h-96" : "max-h-0"} supports-[backdrop-filter]:bg-white/20 bg-white/20 backdrop-blur-xl border-t border-white/20`}> 
        <div className="px-4 pb-4 sm:px-6 pt-2">
          <div className="flex flex-col gap-2">
            <Link href="/artisans" className={getNavLinkClasses("/artisans")} onClick={closeMenu}>
              Artists
            </Link>
            <Link href="/programs" className={getNavLinkClasses("/programs")} onClick={closeMenu}>
              Programs
            </Link>
            <div className="h-px bg-white/30 my-2" />

            {!isLoggedIn && (
              <div className="pt-2 flex items-center gap-3">
                <Link href="/register" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm" onClick={closeMenu}>
                  Sign Up
                </Link>
                <Link href="/login" className="text-orange-600 hover:text-orange-700 font-medium text-sm" onClick={closeMenu}>
                  Login
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <>
                {(isArtisan || isApplicant) && (
                  <Link
                    href={isArtisan ? "/dashboard/artisan" : "/dashboard/applicant"}
                    className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium px-3 py-2 rounded-lg transition-colors duration-200 border border-orange-200 text-sm w-fit"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                )}
                <div className="pt-2">
                  <LogoutButton />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarClient;


