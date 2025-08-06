import { getCurrentCookie } from "@/lib/auth";
import { repositories } from "@/lib/repository";
import ApplicantList from "../components/ApplicantList";

const getApplications = async () => {
    const cookie = await getCurrentCookie();
    if (!cookie) {
        throw new Error("User not authenticated");
    }

    const userId = cookie.userId;
    const response = await repositories.application.getApplicationsByArtisan(userId);
    return response;
};

const ArtisanApplicationsPage = async () => {
    try {
        const applications = await getApplications();
        
        // Calculate statistics
        const totalApplications = applications.length;
        const pendingApplications = applications.filter(app => app.status === 'PENDING').length;
        const approvedApplications = applications.filter(app => app.status === 'APPROVED').length;
        const rejectedApplications = applications.filter(app => app.status === 'REJECTED').length;
        const completedApplications = applications.filter(app => app.status === 'COMPLETED').length;

        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Program Applications 📋</h1>
                            <p className="text-white/90 text-lg">
                                Review and manage student applications for your cultural heritage programs
                            </p>
                        </div>
                    </div>

                    {/* Statistics Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">{totalApplications}</div>
                            <div className="text-sm font-semibold text-gray-700">Total Applications</div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-yellow-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-yellow-600 mb-2">{pendingApplications}</div>
                            <div className="text-sm font-semibold text-gray-700">Pending Review</div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-green-600 mb-2">{approvedApplications}</div>
                            <div className="text-sm font-semibold text-gray-700">Approved</div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-indigo-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-indigo-600 mb-2">{completedApplications}</div>
                            <div className="text-sm font-semibold text-gray-700">Completed</div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-6 text-center group hover:scale-105 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-red-600 mb-2">{rejectedApplications}</div>
                            <div className="text-sm font-semibold text-gray-700">Rejected</div>
                        </div>
                    </div>

                    {/* Applications List */}
                    <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                Recent Applications
                            </h2>
                            
                            {pendingApplications > 0 && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl border border-yellow-200">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium">{pendingApplications} applications need your review</span>
                                </div>
                            )}
                        </div>

                        {applications.length > 0 ? (
                            <ApplicantList notifications={applications} />
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    No Applications Yet
                                </h3>
                                <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
                                    When students apply to your programs, they will appear here for you to review and manage.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching applications:", error);
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8 max-w-md mx-auto text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Applications</h3>
                    <p className="text-gray-600">Please try again later or contact support if the problem persists.</p>
                </div>
            </div>
        );
    }
};

export default ArtisanApplicationsPage;