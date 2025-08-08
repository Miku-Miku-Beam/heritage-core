import { getCurrentCookie } from "@/lib/auth";
import type { ApplicationWithDetails, ProgressReport } from "@/lib/repository";
import { repositories } from "@/lib/repository";
import Image from "next/image";
import Link from "next/link";

const getProgressReports = async () => {
    const cookie = await getCurrentCookie();
    if (!cookie) {
        throw new Error("User not authenticated");
    }

    const userId = cookie.userId;
    // Get all applications for this artisan
    const applications = await repositories.application.getApplicationsByArtisan(userId);
    
    // Get progress reports for approved/completed applications
    const activeApplications = applications.filter(app => 
        app.status === 'APPROVED' || app.status === 'COMPLETED'
    );

    return activeApplications;
};

// Enhanced status badge for progress
function ProgressStatusBadge({ status, weekNumber, totalWeeks = 12 }: { status: string, weekNumber: number, totalWeeks?: number }) {
    const progressPercentage = Math.round((weekNumber / totalWeeks) * 100);
    
    if (status === 'COMPLETED') {
        return (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Completed Program
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Week {weekNumber} ({progressPercentage}%)
        </span>
    );
}

const ArtisanProgressPage = async () => {
    try {
        const applications = await getProgressReports();
        
        // Calculate statistics
        const totalActiveStudents = applications.length;
        const completedPrograms = applications.filter(app => app.status === 'COMPLETED').length;
        const ongoingPrograms = applications.filter(app => app.status === 'APPROVED').length;
        
        // Get all progress reports
        const allReports: (ProgressReport & { application: ApplicationWithDetails })[] = applications.flatMap(app => 
            app.progressReports.map(report => ({
                ...report,
                application: app
            }))
        );
        
        const totalReports = allReports.length;
        const recentReports = allReports
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);

        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Student Progress Monitoring 📊</h1>
                            <p className="text-white/90 text-lg">
                                Track weekly progress reports from your cultural heritage program participants
                            </p>
                        </div>
                    </div>

                    {/* Statistics Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">{totalActiveStudents}</div>
                            <div className="text-sm font-semibold text-gray-700">Active Students</div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-green-600 mb-2">{totalReports}</div>
                            <div className="text-sm font-semibold text-gray-700">Total Reports</div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-yellow-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-yellow-600 mb-2">{ongoingPrograms}</div>
                            <div className="text-sm font-semibold text-gray-700">Ongoing Programs</div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-indigo-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-indigo-600 mb-2">{completedPrograms}</div>
                            <div className="text-sm font-semibold text-gray-700">Completed</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Active Students List */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-orange-200 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                                Active Students
                            </h2>

                            {applications.length > 0 ? (
                                <div className="space-y-4">
                                    {applications.map((application) => {
                                        const latestReport = application.progressReports
                                            .sort((a: ProgressReport, b: ProgressReport) => b.weekNumber - a.weekNumber)[0];
                                        
                                        return (
                                            <Link
                                                key={application.id}
                                                href={`/dashboard/artisan/applicants/${application.id}`}
                                                className="block p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl hover:shadow-lg transition-all duration-200 group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <Image
                                                            src={application.applicant.profileImageUrl || "/default-avatar.png"}
                                                            alt={application.applicant.name}
                                                            width={60}
                                                            height={60}
                                                            className="w-15 h-15 rounded-xl border-2 border-orange-300 object-cover"
                                                        />
                                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                                                    </div>
                                                    
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                                            {application.applicant.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mb-2">{application.Program.title}</p>
                                                        
                                                        <div className="flex items-center gap-3">
                                                            <ProgressStatusBadge 
                                                                status={application.status} 
                                                                weekNumber={latestReport?.weekNumber || 0}
                                                            />
                                                            <span className="text-xs text-gray-500">
                                                                {application.progressReports.length} reports submitted
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <svg className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Students</h3>
                                    <p className="text-gray-600">Students will appear here once their applications are approved</p>
                                </div>
                            )}
                        </div>

                        {/* Recent Reports Sidebar */}
                        <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                Recent Reports
                            </h3>

                            {recentReports.length > 0 ? (
                                <div className="space-y-4">
                                    {recentReports.map((report) => (
                                        <Link
                                            key={report.id}
                                            href={`/dashboard/artisan/applicants/${report.application.id}#progress`}
                                            className="block p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <Image
                                                    src={report.application.applicant.profileImageUrl || "/default-avatar.png"}
                                                    alt={report.application.applicant.name}
                                                    width={32}
                                                    height={32}
                                                    className="w-8 h-8 rounded-lg object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                                        {report.application.applicant.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">Week {report.weekNumber}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600 line-clamp-2">
                                                {report.reportText.substring(0, 80)}...
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2">
                                                {new Date(report.createdAt).toLocaleDateString()}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-600">No reports yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching progress reports:", error);
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8 max-w-md mx-auto text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Progress Reports</h3>
                    <p className="text-gray-600">Please try again later or contact support if the problem persists.</p>
                </div>
            </div>
        );
    }
};

export default ArtisanProgressPage;
