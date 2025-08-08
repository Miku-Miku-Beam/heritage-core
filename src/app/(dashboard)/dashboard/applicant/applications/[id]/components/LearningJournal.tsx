import React from 'react';
import { ProgressReport } from './ApplicationDetailTabs';

interface LearningJournalProps {
    reports: ProgressReport[];
    onAddReport: () => void;
    onEdit: (report: ProgressReport) => void;
    onDelete: (reportId: string) => void;
    deleting: string | null;
}

export function LearningJournal({ reports, onAddReport, onEdit, onDelete, deleting }: LearningJournalProps) {
    return (
        <div className="space-y-8">
            {/* Header with Add Button */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        Your Learning Journey
                    </h2>
                    <p className="text-gray-600 mt-1">Document your weekly progress and insights</p>
                </div>
                
                <button
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={onAddReport}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Weekly Report
                </button>
            </div>

            {/* Reports Content */}
            {reports.length > 0 ? (
                <div className="space-y-6">
                    {reports
                        .sort((a, b) => b.weekNumber - a.weekNumber)
                        .map((report) => (
                            <div key={report.id} className="bg-gradient-to-r from-white to-orange-50/30 border border-orange-200 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                                <div className="p-8">
                                    {/* Report Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
                                                    {report.weekNumber}
                                                </div>
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">Week {report.weekNumber} Progress</h3>
                                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(report.createdAt).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button
                                                onClick={() => onEdit(report)}
                                                className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105"
                                                title="Edit Report"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => onDelete(report.id)}
                                                disabled={deleting === report.id}
                                                className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50"
                                                title="Delete Report"
                                            >
                                                {deleting === report.id ? (
                                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Report Content */}
                                    <div className="space-y-6">
                                        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                Weekly Reflection
                                            </h4>
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{report.reportText}</p>
                                        </div>
                                        
                                        {/* Image Documentation */}
                                        {report.imageUrl && (
                                            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
                                                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    Progress Documentation
                                                </h4>
                                                <div className="relative rounded-xl overflow-hidden border border-gray-200 group cursor-pointer">
                                                    <img
                                                        src={report.imageUrl}
                                                        alt={`Week ${report.weekNumber} Progress Documentation`}
                                                        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                                                        Click to view full size
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-gradient-to-r from-gray-50 to-orange-50/30 border border-gray-200 rounded-2xl">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Your Learning Journey</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                        Document your weekly progress, insights, and milestones. 
                        Share your learning experience with photos and reflections.
                    </p>
                    <button
                        onClick={onAddReport}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create First Report
                    </button>
                </div>
            )}
        </div>
    );
}