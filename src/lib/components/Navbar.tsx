import { getCurrentUser } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import LogoutButton from './LogoutButton';

// Loading component for Navbar
const NavbarSkeleton = () => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="hidden md:flex gap-6 items-center">
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </nav>
    </header>
);

const NavbarContent = async () => {
    try {
        const user = await getCurrentUser();
        const isLoggedIn = !!user;
        const isArtisan = user?.role === 'ARTISAN';
        const isApplicant = user?.role === 'APPLICANT';

        return (
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-sm">
                <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 tracking-tight hover:text-orange-600 transition-colors group">
                        <div className="relative">
                            <Image 
                                src="/logo-warisin.svg" 
                                alt="Warisin Logo" 
                                width={40} 
                                height={40} 
                                className="group-hover:scale-110 transition-transform duration-200"
                            />
                        </div>
                        <span className="bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
                            Warisin
                        </span>
                    </Link>

                    <div className="hidden md:flex gap-8 items-center">
                        {/* Public navigation */}
                        {!isLoggedIn && (
                            <>
                                <Link href="/artisans" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group">
                                    The Artist
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                                <Link href="/programs" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group">
                                    Programs
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                                <div className="flex items-center gap-3">
                                    <Link href="/login" className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200">
                                        Login
                                    </Link>
                                    <Link href="/register" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                        Sign Up
                                    </Link>
                                </div>
                            </>
                        )}

                        {/* Logged in navigation */}
                        {isLoggedIn && (
                            <>
                                {/* Common links for all logged-in users */}
                                <Link href="/artisans" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group">
                                    The Artist
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                                <Link href="/programs" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group">
                                    Programs
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
                                </Link>

                                {/* User profile and actions */}
                                <div className="flex items-center gap-4">
                                    {/* Dashboard link */}
                                    {(isArtisan || isApplicant) && (
                                        <Link 
                                            href={isArtisan ? "/dashboard/artisan" : "/dashboard/applicant"} 
                                            className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium px-4 py-2 rounded-lg transition-colors duration-200 border border-orange-200"
                                        >
                                            Dashboard
                                        </Link>
                                    )}

                                    {/* User profile */}
                                    <div className="flex items-center gap-3">
                                        {/* <Link
                                            href={isArtisan ? `/artisan/${user.id}` : '/profile'}
                                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                        >
                                            {user.profileImageUrl ? (
                                                <img
                                                    src={user.profileImageUrl}
                                                    alt={user.name || 'User'}
                                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-200 hover:ring-orange-300 transition-all"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center ring-2 ring-orange-200 hover:ring-orange-300 transition-all">
                                                    <span className="text-white font-semibold text-sm">
                                                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                                    </span>
                                                </div>
                                            )}
                                            <span className="text-gray-700 font-medium hidden lg:block">
                                                {user.name || 'User'}
                                            </span>
                                        </Link> */}
                                        <LogoutButton />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile menu */}
                    <div className="md:hidden">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={isArtisan ? `/artisan/${user.id}` : '/profile'}
                                    className="flex items-center gap-2"
                                >
                                    {user.profileImageUrl ? (
                                        <img
                                            src={user.profileImageUrl}
                                            alt={user.name || 'User'}
                                            className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-200"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center ring-2 ring-orange-200">
                                            <span className="text-white font-semibold text-sm">
                                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                    )}
                                </Link>
                                <LogoutButton />
                            </div>
                        ) : (
                            <Link href="/login" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-200">
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
            </header>
        );
    } catch (error) {
        console.error('Error in Navbar:', error);
        // Fallback to logged-out state
        return (
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-sm">
                <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 tracking-tight hover:text-orange-600 transition-colors group">
                        <div className="relative">
                            <Image 
                                src="/logo-warisin.svg" 
                                alt="Warisin Logo" 
                                width={40} 
                                height={40} 
                                className="group-hover:scale-110 transition-transform duration-200"
                            />
                        </div>
                        <span className="bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
                            Warisin
                        </span>
                    </Link>
                    <div className="hidden md:flex gap-8 items-center">
                        <Link href="/artisans" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group">
                            The Artist
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
                        </Link>
                        <Link href="/programs" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group">
                            Programs
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200">
                                Login
                            </Link>
                            <Link href="/register" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <Link href="/login" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-200">
                            Login
                        </Link>
                    </div>
                </nav>
            </header>
        );
    }
};

const Navbar = () => {
    return (
        <Suspense fallback={<NavbarSkeleton />}>
            <NavbarContent />
        </Suspense>
    );
};

export default Navbar; 