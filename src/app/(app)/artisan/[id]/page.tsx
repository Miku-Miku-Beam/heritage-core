import prisma from "@/lib/prisma";
import Image from "next/image";
import GalleryGrid from "./GalleryGrid";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

async function getArtisanProfile(id: string) {
    try {
        const artisan = await prisma.user.findUnique({
            where: {
                id: id,
                role: 'ARTISAN'
            },
            include: {
                ArtisanProfile: true,
                ArtisanPrograms: {
                    include: {
                        category: true,
                        applications: {
                            select: {
                                id: true,
                                status: true
                            }
                        }
                    }
                }
            }
        });

        return artisan;
    } catch (error) {
        console.error('Error fetching artisan profile:', error);
        return null;
    }
}


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const artisan = await getArtisanProfile(id);
    const name = artisan?.name || "Artisan";
    const expertise = artisan?.ArtisanProfile?.expertise || "Heritage Artisan";
    const title = `${name} – ${expertise}`;
    const description = artisan?.ArtisanProfile?.story?.slice(0, 140) || `Discover ${name}, a ${expertise} preserving cultural heritage.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "profile",
            images: artisan?.ArtisanProfile?.imageUrl || artisan?.profileImageUrl || "/default-avatar.png",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: artisan?.ArtisanProfile?.imageUrl || artisan?.profileImageUrl || "/default-avatar.png",
        },
    };
}


interface ArtisanProfilePageProps {
    params: Promise<{
        id: string;
    }>;
}


export default async function ArtisanProfilePage({ params }: ArtisanProfilePageProps) {
    const { id } = await params;

    console.log(id);
    const artisan = await getArtisanProfile(id);

    console.log(artisan)

    if (!artisan || !artisan.ArtisanProfile) {
        notFound();
    }

    const profile = artisan.ArtisanProfile;
    const programs = artisan.ArtisanPrograms || [];
    // Social links (optional fields not in schema yet)
    const anyProfile = profile as Record<string, any>;
    const waRaw = (anyProfile?.whatsapp ?? anyProfile?.whatsappNumber ?? anyProfile?.phone ?? '') as string;
    const waDigits = waRaw ? waRaw.replace(/\D/g, '') : '';
    const waLink = waDigits ? `https://wa.me/${waDigits}` : undefined;
    const igRaw = (anyProfile?.instagramUrl ?? anyProfile?.instagram ?? '') as string;
    const igLink = igRaw ? (igRaw.startsWith('http') ? igRaw : `https://instagram.com/${igRaw.replace(/^@/, '')}`) : undefined;
    const galleryImages = programs.flatMap((p: any) => p.galleryUrls || []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-6 text-orange-100/90">
                        <Link href="/artisans" className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Artisans
                        </Link>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            {(profile.imageUrl || artisan.profileImageUrl) ? (
                                <div className="relative">
                                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white/40 to-white/10 blur opacity-30" />
                                    <Image
                                        src={profile.imageUrl || artisan.profileImageUrl || '/default-avatar.png'}
                                        alt={artisan.name || 'Artisan'}
                                        width={200}
                                        height={200}
                                        className="relative rounded-full ring-4 ring-white/80 shadow-2xl object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="relative">
                                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white/40 to-white/10 blur opacity-30" />
                                    <div className="relative w-48 h-48 rounded-full bg-white/20 flex items-center justify-center ring-4 ring-white/80 shadow-2xl">
                                        <span className="text-4xl font-bold text-white">
                                            {artisan.name?.charAt(0)?.toUpperCase() || 'A'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-sm">{artisan.name || 'Unknown Artisan'}</h1>
                            <p className="text-lg md:text-xl text-orange-100/90 mb-5">{profile.expertise || 'Heritage Artisan'}</p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                {(profile.location || artisan.location) && (
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-sm">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {profile.location || artisan.location}
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-6H3v6a2 2 0 002 2z" />
                                    </svg>
                                    {artisan.createdAt ? new Date(artisan.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Member'}
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-sm">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 3h14a1 1 0 011 1v10.382a1 1 0 01-1.553.833L10 11.333 4.553 15.215A1 1 0 013 14.382V4a1 1 0 010-1z" clipRule="evenodd" />
                                    </svg>
                                    {programs.length} Programs
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-9-3a1 1 0 100-2 1 1 0 000 2zm2 2a1 1 0 10-2 0v5a1 1 0 102 0v-5z" clipRule="evenodd" />
                                </svg>
                                About
                            </h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {profile.story || 'No story available yet.'}
                                </p>
                            </div>
                        </div>

                        {/* Works/Portfolio Section */}
                        {profile.works && Array.isArray(profile.works) && profile.works.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio & Works</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {profile.works.map((work, index) => (
                                        <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <p className="text-gray-700">{String(work)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Gallery Section (from programs.galleryUrls) */}
                        {galleryImages.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 3a1 1 0 110 2 1 1 0 010-2zm-2 9l3.5-4.5 2.5 3 3.5-4.5L18 15H5z" />
                                    </svg>
                                    Gallery
                                </h2>
                                <GalleryGrid images={galleryImages} />
                            </div>
                        )}

                        {/* Programs Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Training Programs</h2>
                            {programs.length > 0 ? (
                                <div className="space-y-4">
                                    {programs.map((program) => {
                                        const totalApplications = program.applications.length;
                                        const pendingApplications = program.applications.filter(app => app.status === 'PENDING').length;
                                        const acceptedApplications = program.applications.filter(app => app.status === 'ACCEPTED').length;

                                        return (
                                            <div key={program.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                program.isOpen 
                                                                    ? 'bg-green-100 text-green-800' 
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}>
                                                                {program.isOpen ? 'Open' : 'Closed'}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 mb-2 line-clamp-3">{program.description}</p>
                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                                </svg>
                                                                Duration: {program.duration}
                                                            </span>
                                                             <span className="flex items-center gap-1">
                                                                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                     <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                 </svg>
                                                                 <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{program.category.name}</span>
                                                             </span>
                                                        </div>
                                                        <div className="mt-2 flex gap-4 text-sm">
                                                            <span className="text-blue-600">Total Applications: {totalApplications}</span>
                                                            <span className="text-yellow-600">Pending: {pendingApplications}</span>
                                                            <span className="text-green-600">Accepted: {acceptedApplications}</span>
                                                        </div>
                                                    </div>
                                                    <Link 
                                                        href={`/program/${program.id}`}
                                                        className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No training programs available yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                </svg>
                                Contact Information
                            </h3>
                            <div className="space-y-3">
                                <a 
                                    href={artisan.email ? `mailto:${artisan.email}` : undefined}
                                    className={`flex items-center gap-2 ${artisan.email ? 'text-gray-700 hover:text-orange-600 transition-colors' : 'text-gray-500'}`}
                                    aria-label="Email"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span>{artisan.email || 'No email provided'}</span>
                                </a>
                                {(profile.location || artisan.location) && (
                                    <a 
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.location || artisan.location || '')}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
                                        aria-label="Open location in maps"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{profile.location || artisan.location}</span>
                                    </a>
                                )}
                                {/* Social links */}
                                <div className="pt-3 border-t border-gray-100">
                                    <div className="text-sm text-gray-600 mb-2">Social</div>
                                    <div className="flex gap-2 flex-wrap">
                                        {waLink ? (
                                            <a
                                                href={waLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-2 rounded-md bg-green-50 text-green-700 border border-green-200 text-sm hover:bg-green-100"
                                                aria-label="WhatsApp"
                                            >
                                                WhatsApp
                                            </a>
                                        ) : (
                                            <span className="px-3 py-2 rounded-md bg-gray-50 text-gray-400 border border-gray-200 text-sm cursor-not-allowed" aria-disabled="true">WhatsApp (N/A)</span>
                                        )}
                                        {igLink ? (
                                            <a
                                                href={igLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-2 rounded-md bg-pink-50 text-pink-700 border border-pink-200 text-sm hover:bg-pink-100"
                                                aria-label="Instagram"
                                            >
                                                Instagram
                                            </a>
                                        ) : (
                                            <span className="px-3 py-2 rounded-md bg-gray-50 text-gray-400 border border-gray-200 text-sm cursor-not-allowed" aria-disabled="true">Instagram (N/A)</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 3h2v14H3V3zm6 6h2v8H9V9zm6-4h2v12h-2V5z" />
                                </svg>
                                Statistics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Programs</span>
                                    <span className="font-semibold text-lg">{programs.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Active Programs</span>
                                    <span className="font-semibold text-lg text-green-600">
                                        {programs.filter(p => p.isOpen).length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Applications</span>
                                    <span className="font-semibold text-lg text-blue-600">
                                        {programs.reduce((total, program) => total + program.applications.length, 0)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Member Since</span>
                                    <span className="font-semibold text-sm">
                                        {artisan.createdAt ? new Date(artisan.createdAt).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long' 
                                        }) : 'Unknown'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="space-y-3">
                                <Link 
                                    href={`/programs?artisan=${artisan.id}`}
                                    className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-center block shadow-sm"
                                >
                                    View All Programs
                                </Link>
                                <Link 
                                    href="/artisans"
                                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center block"
                                >
                                    Back to Artisans
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
