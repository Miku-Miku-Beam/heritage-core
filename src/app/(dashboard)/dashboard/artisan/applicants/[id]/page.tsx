import StatusChip from "@/lib/components/StatusChip";
import { repositories } from "@/lib/repository";
import Image from "next/image";
import Link from "next/link";
import ApplicationActionButtons from "../ApplicationActionButtons";

interface ApplicationDetailPageProps {
    params: Promise<{ id: string }>;
}

// Enhanced status badge component
function DetailStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Pending Review
        </span>
      );
    case "APPROVED":
      return (
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-green-100 text-green-700 border border-green-200">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Approved
        </span>
      );
    case "COMPLETED":
      return (
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-100 text-blue-700 border border-blue-200">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Completed
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-red-100 text-red-700 border border-red-200">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Rejected
        </span>
      );
    default:
      return <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-200">{status}</span>;
  }
}

const ApplicationDetailPage = async ({ params }: ApplicationDetailPageProps) => {
    const { id } = await params;

    // Fetch application detail by id
    const application = await repositories.application.getApplicationById(id);

    if (!application) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8 max-w-md mx-auto text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Application Not Found</h3>
                    <p className="text-gray-600 mb-6">The application you're looking for doesn't exist or has been removed.</p>
                    <Link
                        href="/dashboard/artisan/applicants"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Applications
                    </Link>
                </div>
            </div>
        );
    }

    const { applicant, Program, status, message, motivation, createdAt } = application;

    // Handle CV and Portfolio URLs
    let cvPortfolioUrl: string | undefined = undefined;
    if (application.message && application.message.startsWith('http')) cvPortfolioUrl = application.message;
    else if (application.motivation && application.motivation.startsWith('http')) cvPortfolioUrl = application.motivation;
    else if (applicant.ApplicantProfile?.background && applicant.ApplicantProfile.background.startsWith('http')) cvPortfolioUrl = applicant.ApplicantProfile.background;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard/artisan/applicants"
                        className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-4 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Applications
                    </Link>
                    
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Application Review 📋</h1>
                        <p className="text-white/90 text-lg">
                            Review student application and make your decision
                        </p>
                    </div>
                </div>

                <div className="mx-auto space-y-8">
                    {/* Student Profile Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                Student Information
                            </h2>
                            <DetailStatusBadge status={status} />
                        </div>

                        <div className="flex items-start gap-8">
                            <div className="relative">
                                <Image
                                    src={applicant.profileImageUrl || "/default-avatar.png"}
                                    alt={applicant.name}
                                    width={120}
                                    height={120}
                                    className="w-30 h-30 rounded-2xl border-4 border-orange-300 object-cover shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{applicant.name}</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-gray-600">{applicant.email}</span>
                                    </div>
                                    
                                    {applicant.location && (
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-gray-600">{applicant.location}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-gray-600">Applied on {new Date(createdAt).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/profile/${applicant.id}`}
                                    className="inline-flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-xl transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View Full Profile
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Program Information */}
                    <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            Applied Program
                        </h2>

                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-orange-700 mb-3">{Program.title}</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span className="text-gray-600">Category:</span>
                                    <span className="font-semibold text-gray-900">{Program.category?.name}</span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-gray-600">Instructor:</span>
                                    <span className="font-semibold text-gray-900">{Program.artisan?.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Application Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Application Message */}
                        <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                Application Message
                            </h3>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{message}</p>
                            </div>
                        </div>

                        {/* Motivation */}
                        {motivation && (
                            <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    Motivation
                                </h3>
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{motivation}</p>
                                </div>
                            </div>
                        )}

                        {/* CV/Portfolio */}
                        <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                CV/Portfolio
                            </h3>
                            
                            {cvPortfolioUrl ? (
                                <a
                                    href={cvPortfolioUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-blue-700 block">View CV/Portfolio</span>
                                        <span className="text-blue-500 text-sm">Click to open document</span>
                                    </div>
                                    <svg className="w-4 h-4 text-blue-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            ) : (
                                <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                    <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-500 italic">No CV/Portfolio uploaded</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Progress Reports Section - Only show for APPROVED/COMPLETED applications */}
                    {(status === 'APPROVED' || status === 'COMPLETED') && (
                        <div id="progress" className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                Weekly Progress Reports
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    ({application.progressReports.length} reports submitted)
                                </span>
                            </h3>

                            {application.progressReports.length > 0 ? (
                                <div className="space-y-6">
                                    {application.progressReports
                                        .sort((a, b) => b.weekNumber - a.weekNumber)
                                        .map((report) => (
                                            <div key={report.id} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-orange-50/30">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                                            {report.weekNumber}
                                                        </div>
                                                        Week {report.weekNumber} Report
                                                    </h4>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(report.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                
                                                <div className="prose prose-sm max-w-none mb-4">
                                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                        {report.reportText}
                                                    </p>
                                                </div>
                                                
                                                {report.imageUrl && (
                                                    <div className="mt-4">
                                                        <p className="text-sm font-medium text-gray-600 mb-2">Attached Image:</p>
                                                        <div className="relative rounded-xl overflow-hidden border border-gray-200 inline-block">
                                                            <img
                                                                src={report.imageUrl}
                                                                alt={`Week ${report.weekNumber} progress`}
                                                                className="max-w-md max-h-64 object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No Progress Reports Yet</h4>
                                    <p className="text-gray-600">
                                        The student hasn't submitted any weekly progress reports yet. 
                                        Reports will appear here once they start documenting their learning journey.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            Review Actions
                        </h3>
                        
                        <div className="flex flex-wrap gap-4">
                            <ApplicationActionButtons applicationId={application.id} status={status} />
                            
                            <a
                                href={`https://wa.me/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                                Contact Student via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailPage;
