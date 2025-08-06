import { getCurrentCookie } from "@/lib/auth";
import StatusChip from "@/lib/components/StatusChip";
import { repositories } from "@/lib/repository";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface ApplicationItemProps {
  id: string;
  status: string;
  createdAt: Date;
  Program: {
    id: string;
    title: string;
    programImageUrl?: string;
  };
}

export default async function ApplicantApplicationsPage() {
  const user = await getCurrentCookie();
  if (!user || user.role !== "APPLICANT") {
    redirect("/login/applicant");
  }

  const applications = await repositories.applicant.getMyApplications(user.userId);

  const grouped: Record<string, ApplicationItemProps[]> = {};
  applications.forEach((app: any) => {
    const status = app.status;
    if (!grouped[status]) grouped[status] = [];
    grouped[status].push(app);
  });

  const statusOrder = ["APPROVED", "PENDING", "COMPLETED", "REJECTED"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
              <p className="text-gray-600">Manage and track the status of your training program applications</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-500 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-800">Total Applications</p>
                    <p className="text-2xl font-bold text-orange-900">{applications.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No applications yet</h3>
              <p className="text-gray-600 mb-6">You haven't applied to any programs yet. Start exploring the amazing programs available.</p>
              <Link
                href="/dashboard/applicant/programs"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Explore Programs
              </Link>
            </div>
          </div>
        ) : (
          statusOrder.map((status) =>
            grouped[status]?.length > 0 ? (
              <section key={status} className="space-y-6">
                <div className="flex items-center space-x-3">
                  <StatusChip status={status} />
                  <span className="text-xl font-semibold text-gray-900">
                    {status === 'APPROVED' && 'Approved'}
                    {status === 'PENDING' && 'Pending'}
                    {status === 'COMPLETED' && 'Completed'}
                    {status === 'REJECTED' && 'Rejected'}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                    {grouped[status].length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grouped[status].map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all duration-200 overflow-hidden group"
                    >
                      {/* Program Image */}
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img
                          src={app.Program.programImageUrl || "/default-program.png"}
                          alt={app.Program.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {app.Program.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Applied on {new Date(app.createdAt).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-2">
                            <StatusChip status={app.status} />
                          </div>
                          <Link
                            href={`/dashboard/applicant/applications/${app.id}`}
                            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200 group"
                          >
                            View Details
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null
          )
        )}
      </div>
    </div>
  );
}
