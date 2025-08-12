import { getCurrentUser } from '@/lib/auth';
import LogoutButton from '@/lib/components/LogoutButton';
import { DEFAULT_PFP } from '@/lib/static';
import Link from 'next/link';
import ActiveLink from './ActiveLink';
import Image from 'next/image';
import SidebarMobile from './SidebarMobile';

const menu = [
  { 
    href: "/dashboard/artisan", 
    label: "Overview", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10zm0-4l9-3 9 3" />
      </svg>
    )
  },
  { 
    href: "/dashboard/artisan/programs", 
    label: "My Programs", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  { 
    href: "/dashboard/artisan/applicants", 
    label: "Applications", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  { 
    href: "/dashboard/artisan/progress", 
    label: "Student Progress", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  { 
    href: "/dashboard/artisan/profile", 
    label: "Edit Profile", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
];

const Sidebar = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <>
      {/* Mobile top bar + drawer */}
      <div className="md:hidden w-full">
        <SidebarMobile user={{ name: user.name, email: user.email, profileImageUrl: user.profileImageUrl }} />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-72 min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-yellow-50/30 backdrop-blur-md border-r border-orange-200/50 flex-col sticky top-0 z-40 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-orange-200/50">
        <Link href="/" className="block w-fit group">
          <div className='flex gap-3 items-center'>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Waris.in
              </span>
              <div className="text-xs text-gray-500 font-medium">Artisan Dashboard</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item, index) => (
          <div key={item.href}>
            <ActiveLink
              href={item.href}
              exactMatch={item.href === "/dashboard/artisan"}
            >
              <div className="relative group">
                <div className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-white/60 hover:shadow-md hover:scale-[1.02]
                  group-[.active]:bg-gradient-to-r group-[.active]:from-orange-500 group-[.active]:to-yellow-500 
                  group-[.active]:text-white group-[.active]:shadow-xl group-[.active]:font-semibold
                  text-gray-700 hover:text-gray-900 group-[.active]:hover:scale-[1.02]
                ">
                  <div className="flex-shrink-0 group-[.active]:text-white text-orange-500">
                    {item.icon}
                  </div>
                  <span className="text-sm">{item.label}</span>
                  
                  {/* Active indicator */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-r-full opacity-0 group-[.active]:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
            </ActiveLink>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-6 border-t border-orange-200/50 bg-gradient-to-r from-orange-50/50 to-yellow-50/50">
        {/* User Profile Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-orange-200/50 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={user.profileImageUrl && user.profileImageUrl !== '' && user.profileImageUrl !== null ? user.profileImageUrl : DEFAULT_PFP}
                alt="Avatar"
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl border-2 border-white object-cover shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-900 truncate">{user.name}</div>
              <div className="text-xs text-gray-600 truncate">{user.email}</div>
              <div className="text-xs text-orange-600 font-medium">Master Artisan</div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="w-full">
          <LogoutButton />
        </div>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;