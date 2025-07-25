import { getCurrentUser } from '@/lib/auth';
import LogoutButton from '@/lib/components/LogoutButton';
import { DEFAULT_PFP } from '@/lib/static';
import Link from 'next/link';
import ActiveLink from './ActiveLink';

const menu = [
  { href: "/dashboard/artisan", label: "Overview", icon: "🏠" },
  { href: "/dashboard/artisan/programs", label: "My Programs", icon: "📋" },
  { href: "/dashboard/artisan/applicants", label: "Applications", icon: "📝" },
  { href: "/dashboard/artisan/profile", label: "Edit Profile", icon: "👤" },
];

const Sidebar = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <aside className="w-full md:w-64 min-h-screen bg-white/80 backdrop-blur-md border-r border-orange-100 px-4 md:px-6 py-6 flex flex-col rounded-r-3xl shadow-xl fixed md:static z-40">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="block w-fit">
            <div className='flex gap-2 items-center'>
              <img src="/logo.svg" alt="Logo" className="h-10 w-auto mb-4 md:mb-0" />
              <span className="text-2xl font-extrabold text-orange-700 tracking-tight mb-4 md:mb-0">Waris.in</span>
            </div>
          </Link>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {menu.map(item => (
          <div key={item.href}>
            <ActiveLink
              href={item.href}
              exactMatch={item.href === "/dashboard/artisan"}
            >
              <span className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-orange-50
                w-full
                group-[.active]:bg-orange-100 group-[.active]:text-orange-700 group-[.active]:font-bold group-[.active]:shadow
              ">
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </span>
            </ActiveLink>
          </div>
        ))}
      </nav>
      {/* User Info & Logout */}
      <div className="mt-auto pt-8 border-t border-orange-100">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={user.profileImageUrl && user.profileImageUrl !== '' && user.profileImageUrl !== null ? user.profileImageUrl : DEFAULT_PFP}
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-orange-200 object-cover bg-white"
          />
          <div className="hidden md:block">
            <div className="text-sm font-semibold text-gray-900">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="w-full">
          <LogoutButton />
        </div>
      </div>
      {/* Mobile: show name/email below avatar */}
      <div className="block md:hidden mt-2 text-center">
        <div className="text-sm font-semibold text-gray-900">{user.name}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
      </div>
    </aside>
  );
};

export default Sidebar;