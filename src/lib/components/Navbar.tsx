import { getCurrentUser } from '@/lib/auth';
import { Suspense } from 'react';
import NavbarClient from './NavbarClient';

// Loading component for Navbar
const NavbarSkeleton = () => (
    <header className="sticky top-0 z-50 supports-[backdrop-filter]:bg-white/20 bg-white/20 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
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
            <NavbarClient
                isLoggedIn={isLoggedIn}
                isArtisan={!!isArtisan}
                isApplicant={!!isApplicant}
                user={isLoggedIn ? { id: user!.id, name: user!.name, profileImageUrl: user!.profileImageUrl } : undefined}
            />
        );
    } catch (error) {
        console.error('Error in Navbar:', error);
        // Fallback to logged-out state
        return <NavbarClient isLoggedIn={false} isArtisan={false} isApplicant={false} />;
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