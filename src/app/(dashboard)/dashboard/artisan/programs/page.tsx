import { repositories } from "@/lib/repository";
import { cookies } from "next/headers";
import Image from 'next/image';
import Link from "next/link";

const getProgramsData = async () => {
    const cookieStore = await cookies();

    const sessionValue = cookieStore.get('session')?.value;

    if (!sessionValue) {
        console.error('Session not found in cookies');
        return [];
    }

    const { userId: artisanId } = JSON.parse(sessionValue);

    if (!artisanId) {
        console.error('Artisan ID not found in session');
        return [];
    }

    const programs = await repositories.program.getProgramsByArtisan(artisanId);

    return programs
}

export default async function ArtisanProgramPage() {
    const programs = await getProgramsData();

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">My Programs 🎭</h1>
                                <p className="text-white/90 text-lg">
                                    Manage and monitor your cultural heritage programs
                                </p>
                            </div>
                            
                            {/* Add Program Button */}
                            <Link
                                href="/dashboard/artisan/programs/add"
                                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                            >
                                <svg 
                                    className="w-6 h-6" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                                    />
                                </svg>
                                Create New Program
                            </Link>
                        </div>
                    </div>
                </div>

            {/* Programs Grid */}
            {programs.length === 0 ? (
                /* Empty State */
                <div className="text-center py-16">
                    <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-12 max-w-md mx-auto">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg 
                                className="w-10 h-10 text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            No Programs Yet
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Start sharing your cultural heritage expertise by creating your first training program
                        </p>
                        <Link
                            href="/dashboard/artisan/programs/add"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                            <svg 
                                className="w-5 h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                                />
                            </svg>
                            Create Your First Program
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {/* Programs Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                        {programs.map((program) => (
                            <div 
                                key={program.id} 
                                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-orange-200 group"
                            >
                                {/* Program Image */}
                                <div className="relative h-48 w-full">
                                    <img
                                        src={
                                            typeof program.programImageUrl === 'string' && program.programImageUrl.trim() !== ''
                                                ? program.programImageUrl
                                                : '/default-program.png'
                                        }
                                        alt={program.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                    {/* Status Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                                            program.isOpen 
                                                ? 'bg-green-100/90 text-green-700 border-green-200' 
                                                : 'bg-gray-100/90 text-gray-700 border-gray-200'
                                        }`}>
                                            <div className={`w-2 h-2 rounded-full ${
                                                program.isOpen ? 'bg-green-500' : 'bg-gray-500'
                                            }`}></div>
                                            {program.isOpen ? 'Active' : 'Closed'}
                                        </span>
                                    </div>
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                            {program.category.name}
                                        </span>
                                    </div>
                                </div>

                                {/* Program Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                        {program.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                        {program.description}
                                    </p>
                                    
                                    {/* Program Details */}
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium">Duration:</span>
                                            <span>{program.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="font-medium">Location:</span>
                                            <span className="truncate">{program.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-medium">Start Date:</span>
                                            <span>{new Date(program.startDate).toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Statistics */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                            <div className="text-xl font-bold text-blue-600">{program.applications.length}</div>
                                            <div className="text-xs text-blue-500 font-medium">Applicants</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                            <div className="text-xl font-bold text-green-600">
                                                {program.applications.filter(app => app.status === 'APPROVED').length}
                                            </div>
                                            <div className="text-xs text-green-500 font-medium">Approved</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                                            <div className="text-xl font-bold text-yellow-600">
                                                {program.applications.filter(app => app.status === 'PENDING').length}
                                            </div>
                                            <div className="text-xs text-yellow-500 font-medium">Pending</div>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Link
                                            href={`/programs/${program.id}`}
                                            className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-3 rounded-xl text-center text-sm font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
                                        >
                                            View Details
                                        </Link>
                                        <Link
                                            href={`/dashboard/artisan/programs/${program.id}/edit`}
                                            className="px-4 py-3 border border-orange-300 text-orange-600 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-all duration-200"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Stats Summary */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-orange-600 mb-2">{programs.length}</div>
                            <div className="text-sm font-semibold text-gray-700">Total Programs</div>
                            <div className="text-xs text-gray-500 mt-1">All created programs</div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-green-600 mb-2">{programs.filter(p => p.isOpen).length}</div>
                            <div className="text-sm font-semibold text-gray-700">Active Programs</div>
                            <div className="text-xs text-gray-500 mt-1">Currently accepting applications</div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-xl border border-blue-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">{programs.filter(p => !p.isOpen).length}</div>
                            <div className="text-sm font-semibold text-gray-700">Completed</div>
                            <div className="text-xs text-gray-500 mt-1">Finished programs</div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-xl border border-purple-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                {programs.reduce((total, program) => total + program.applications.length, 0)}
                            </div>
                            <div className="text-sm font-semibold text-gray-700">Total Students</div>
                            <div className="text-xs text-gray-500 mt-1">All applicants across programs</div>
                        </div>
                    </div>
                </>
            )}
            </div>
        </div>
    );
}