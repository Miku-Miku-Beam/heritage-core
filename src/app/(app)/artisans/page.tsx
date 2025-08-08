import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

async function getArtisans() {
    try {
        const artisans = await prisma.user.findMany({
            where: {
                role: 'ARTISAN'
            },
            include: {
                ArtisanProfile: true,
                ArtisanPrograms: {
                    where: {
                        isOpen: true
                    },
                    select: {
                        id: true,
                        title: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return artisans;
    } catch (error) {
        console.error('Error fetching artisans:', error);
        return [];
    }
}

export default async function ArtisansPage() {
    const artisans = await getArtisans();

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold mb-4 tracking-tight drop-shadow-lg">Heritage Artisans</h1>
                        <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                            Discover talented artisans preserving traditional crafts and heritage skills
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-gray-900">Meet Our Artisans</h2>
                        <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                            {artisans.length} {artisans.length === 1 ? 'Artisan' : 'Artisans'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Artisans Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {artisans.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {artisans.map((artisan) => {
                            const profile = artisan.ArtisanProfile;
                            const activePrograms = artisan.ArtisanPrograms.length;

                            return (
                                <Link key={artisan.id} href={`/artisan/${artisan.id}`} className="group block">
                                    <div className="bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden h-full">
                                        {/* Header with Avatar */}
                                        <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 px-6 pt-8 pb-6">
                                            <div className="flex flex-col items-center">
                                                {profile?.imageUrl || artisan.profileImageUrl ? (
                                                    <div className="relative">
                                                        <div className="w-20 h-20 rounded-full ring-4 ring-white shadow-lg overflow-hidden">
                                                            <Image
                                                                src={profile?.imageUrl || artisan.profileImageUrl || '/placeholder-avatar.png'}
                                                                alt={artisan.name || 'Artisan'}
                                                                width={80}
                                                                height={80}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                            />
                                                        </div>
                                                        {activePrograms > 0 && (
                                                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="relative">
                                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center ring-4 ring-white shadow-lg">
                                                            <span className="text-2xl font-bold text-white">
                                                                {artisan.name?.charAt(0).toUpperCase() || 'A'}
                                                            </span>
                                                        </div>
                                                        {activePrograms > 0 && (
                                                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                
                                                <h3 className="text-lg font-bold text-gray-900 mt-4 text-center line-clamp-1">
                                                    {artisan.name}
                                                </h3>
                                                
                                                {profile?.expertise && (
                                                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {profile.expertise}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Location */}
                                            {(profile?.location || artisan.location) && (
                                                <div className="flex items-center text-gray-500 mb-3">
                                                    <svg className="w-4 h-4 mr-2 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm">{profile?.location || artisan.location}</span>
                                                </div>
                                            )}

                                            {/* Story Preview */}
                                            {profile?.story && (
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                                    {profile.story}
                                                </p>
                                            )}

                                            {/* Stats */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {activePrograms} Active Program{activePrograms !== 1 ? 's' : ''}
                                                </div>
                                                
                                                <div className="flex items-center text-orange-600 text-sm font-medium group-hover:text-orange-700">
                                                    View Profile
                                                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Artisans Found</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We're building our community of talented artisans. Check back soon to discover amazing creators preserving traditional crafts!
                            </p>
                            <div className="mt-8">
                                <Link 
                                    href="/programs" 
                                    className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    Browse Programs Instead
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
