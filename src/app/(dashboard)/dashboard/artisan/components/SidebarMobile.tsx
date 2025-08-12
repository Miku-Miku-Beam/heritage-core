"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import LogoutButton from "@/lib/components/LogoutButton";

type UserLite = {
  name: string | null;
  email: string;
  profileImageUrl?: string | null;
};

interface SidebarMobileProps {
  user: UserLite;
}

const menu = [
  { href: "/dashboard/artisan", label: "Overview" },
  { href: "/dashboard/artisan/programs", label: "My Programs" },
  { href: "/dashboard/artisan/applicants", label: "Applications" },
  { href: "/dashboard/artisan/progress", label: "Student Progress" },
  { href: "/dashboard/artisan/profile", label: "Edit Profile" },
];

const SidebarMobile = ({ user }: SidebarMobileProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = pathname === href || pathname.startsWith(href + "/");
    return [
      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
      active
        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow"
        : "text-gray-700 hover:bg-white/70 hover:shadow",
    ].join(" ");
  };

  return (
    <>
      <div className="md:hidden sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-extrabold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent text-lg">
            Waris.in
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <svg className={`h-6 w-6 ${open ? "hidden" : "block"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className={`h-6 w-6 ${open ? "block" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden fixed inset-0 z-40 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-black/20 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-80 max-w-[85%] bg-gradient-to-b from-white via-orange-50/50 to-yellow-50/50 backdrop-blur-md border-r border-orange-200/50 shadow-2xl transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`} role="dialog" aria-modal="true">
          <div className="p-4 border-b border-orange-200/50 flex items-center gap-3">
            <Image src={user.profileImageUrl || "/default-avatar.png"} alt="Avatar" width={40} height={40} className="w-10 h-10 rounded-lg object-cover border" />
            <div className="min-w-0">
              <div className="text-sm font-bold truncate text-gray-900">{user.name || "User"}</div>
              <div className="text-xs text-gray-600 truncate">{user.email}</div>
            </div>
          </div>
          <nav className="p-3 space-y-2">
            {menu.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)} onClick={() => setOpen(false)}>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t border-orange-200/50">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMobile;


