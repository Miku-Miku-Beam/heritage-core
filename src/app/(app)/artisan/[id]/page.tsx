import { repositories } from "@/lib/repository";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getArtisanProfile(id: string) {
    try {
        const artisan = await repositories.artisan.getArtisanById(id);
        return artisan;
    } catch (error) {
        console.error('Error fetching artisan profile:', error);
        return null;
    }
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

    // Handle null or missing data
    if (!artisan) {
        notFound();
    }

    // If artisan exists but no profile, show placeholder content
    const profile = artisan.ArtisanProfile;
    const programs = artisan.ArtisanPrograms || [];
    const hasProfile = !!profile;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            {(profile?.imageUrl || artisan.profileImageUrl) ? (
                                <img
                                    src={profile?.imageUrl || artisan.profileImageUrl || '/placeholder-avatar.png'}
                                    alt={artisan.name || 'Artisan'}
                                    width={200}
                                    height={200}
                                    className="w-48 h-48 rounded-full ring-4 ring-white shadow-lg object-cover"
                                />
                            ) : (
                                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-300 to-yellow-400 flex items-center justify-center ring-4 ring-white shadow-lg">
                                    <span className="text-4xl font-bold text-white">
                                        {artisan.name?.charAt(0)?.toUpperCase() || 'A'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">{artisan.name || 'Unknown Artisan'}</h1>
                            <div className="mb-4">
                                {profile?.expertise && (
                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800 shadow-lg">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {profile.expertise}
                                    </span>
                                )}
                            </div>
                            {(profile?.location || artisan.location) && (
                                <div className="flex items-center justify-center md:justify-start gap-2 text-orange-100 text-lg">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{profile?.location || artisan.location}</span>
                                </div>
                            )}

                            {/* Show incomplete profile notice */}
                            {!hasProfile && (
                                <div className="mt-4 px-4 py-2 bg-yellow-100/20 border border-yellow-200/30 rounded-lg backdrop-blur-sm">
                                    <p className="text-yellow-100 text-sm">
                                        Profile setup is incomplete. Some information may not be available.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                About
                            </h2>
                            <div className="prose prose-gray max-w-none">
                                {hasProfile && profile.story ? (
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                                        {profile.story}
                                    </p>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                                            <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No story available</h3>
                                        <p className="text-gray-500">This artisan hasn't shared their story yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Works/Portfolio Section */}
                        {hasProfile && profile.works && Array.isArray(profile.works) && profile.works.length > 0 ? (
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12V8l-2 2-2-2-2 2-2-2-2 2v4h12z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    Portfolio & Works
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {profile.works.map((work, index) => (
                                        <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors">
                                            <p className="text-gray-700 font-medium">{String(work)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12V8l-2 2-2-2-2 2-2-2-2 2v4h12z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    Portfolio & Works
                                </h2>
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolio available</h3>
                                    <p className="text-gray-500">This artisan hasn't shared their portfolio yet.</p>
                                </div>
                            </div>
                        )}

                        {/* Programs Section */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                Training Programs
                            </h2>
                            {programs.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {programs.map((program) => {
                                        const totalApplications = program.applications?.length || 0;
                                        const pendingApplications = program.applications?.filter(app => app.status === 'PENDING').length || 0;
                                        const acceptedApplications = program.applications?.filter(app => app.status === 'ACCEPTED').length || 0;

                                        return (
                                            <div key={program.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                                {/* Program Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    {program.programImageUrl ? (
                                                        <img
                                                            src={program.programImageUrl}
                                                            alt={program.title || 'Program Image'}
                                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                                                            <div className="text-center text-white">
                                                                <svg className="w-12 h-12 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                                </svg>
                                                                <span className="text-sm font-medium">Heritage Program</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Status Badge */}
                                                    <div className="absolute top-3 right-3">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${program.isOpen
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-red-500 text-white'
                                                            }`}>
                                                            {program.isOpen ? 'Open' : 'Closed'}
                                                        </span>
                                                    </div>

                                                    {/* Category Badge */}
                                                    <div className="absolute top-3 left-3">
                                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 shadow-lg">
                                                            {program.category?.name || 'General'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Card Content */}
                                                <div className="p-5">
                                                    {/* Title */}
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                        {program.title || 'Untitled Program'}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                        {program.description || 'No description available'}
                                                    </p>

                                                    {/* Program Details */}
                                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                            </svg>
                                                            <span>{program.duration || 'Not specified'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                                            </svg>
                                                            <span>{totalApplications} applicants</span>
                                                        </div>
                                                    </div>

                                                    {/* Application Stats */}
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div className="flex gap-3 text-xs">
                                                            <span className="flex items-center gap-1 text-yellow-600">
                                                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                                {pendingApplications} Pending
                                                            </span>
                                                            <span className="flex items-center gap-1 text-green-600">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                                {acceptedApplications} Accepted
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Action Button */}
                                                    <Link
                                                        href={`/programs/${program.id}`}
                                                        className="w-full block text-center px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                                    >
                                                        View Program Details
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                                        <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">No training programs</h3>
                                    <p className="text-gray-500">This artisan hasn't created any training programs yet.</p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                Contact Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Email</p>
                                        <p className="text-sm text-gray-600">{artisan.email || 'No email provided'}</p>
                                    </div>
                                </div>
                                {(profile?.location || artisan.location) && (
                                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Location</p>
                                            <p className="text-sm text-gray-600">{profile?.location || artisan.location}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                    </svg>
                                </div>
                                Statistics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                                    <span className="text-gray-700 font-medium">Total Programs</span>
                                    <span className="font-bold text-xl text-orange-600">{programs.length}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                                    <span className="text-gray-700 font-medium">Active Programs</span>
                                    <span className="font-bold text-xl text-green-600">
                                        {programs.filter(p => p.isOpen).length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                                    <span className="text-gray-700 font-medium">Total Applications</span>
                                    <span className="font-bold text-xl text-blue-600">
                                        {programs.reduce((total, program) => total + program.applications.length, 0)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                                    <span className="text-gray-700 font-medium">Member Since</span>
                                    <span className="font-semibold text-sm text-purple-600">
                                        {artisan.createdAt ? new Date(artisan.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long'
                                        }) : 'Unknown'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    href={`/programs?artisan=${artisan.id}`}
                                    className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200 text-center block font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    View All Programs
                                </Link>
                                <Link
                                    href="/artisans"
                                    className="w-full px-4 py-3 border-2 border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 text-center block font-medium"
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
