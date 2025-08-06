"use client";
import type { OurFileRouter } from "@/lib/uploadthing";
import { UploadButton } from "@uploadthing/react";
import React, { FormEvent } from "react";
import { ProgressReport } from "./ApplicationDetailTabs";

interface ReportFormModalProps {
    editingReport: ProgressReport | null;
    weekNumber: number;
    setWeekNumber: (num: number) => void;
    reportText: string;
    setReportText: (text: string) => void;
    imageUrl: string | null;
    setImageUrl: (url: string | null) => void;
    submitting: boolean;
    handleSubmit: (e: FormEvent) => Promise<void>;
    handleCancelEdit: () => void;
}

export function ReportFormModal({
    editingReport,
    weekNumber,
    setWeekNumber,
    reportText,
    setReportText,
    imageUrl,
    setImageUrl,
    submitting,
    handleSubmit,
    handleCancelEdit,
}: ReportFormModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-orange-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    {editingReport ? 'Edit Weekly Report' : 'Create Weekly Report'}
                                </h3>
                                <p className="text-orange-100 text-sm">Document your learning progress and insights</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCancelEdit}
                            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Week Number Input */}
                        <div className="bg-gradient-to-r from-gray-50 to-orange-50/30 border border-orange-200 rounded-xl p-6">
                            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                </svg>
                                Week Number
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    min={1}
                                    value={weekNumber}
                                    onChange={e => setWeekNumber(parseInt(e.target.value))}
                                    className="w-32 px-4 py-3 text-center text-xl font-bold border-2 border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                                    placeholder="1"
                                />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">Enter the week number for this progress report</p>
                                </div>
                            </div>
                        </div>

                        {/* Report Content */}
                        <div className="bg-gradient-to-r from-gray-50 to-orange-50/30 border border-orange-200 rounded-xl p-6">
                            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Learning Reflection
                            </label>
                            <textarea
                                value={reportText}
                                onChange={e => setReportText(e.target.value)}
                                rows={6}
                                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white resize-none"
                                placeholder="Share your weekly learning experience, challenges, achievements, and insights. What did you learn? What skills did you develop? What challenges did you overcome?"
                            />
                            <div className="mt-2 flex justify-between items-center">
                                <p className="text-sm text-gray-500">Describe your weekly progress and learning journey</p>
                                <span className="text-sm text-gray-400">{reportText.length} characters</span>
                            </div>
                        </div>

                        {/* Photo Documentation */}
                        <div className="bg-gradient-to-r from-gray-50 to-orange-50/30 border border-orange-200 rounded-xl p-6">
                            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Progress Documentation
                            </label>
                            
                            <div className="space-y-4">
                                {!imageUrl ? (
                                    <div className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center bg-white hover:bg-orange-50/50 transition-colors duration-200">
                                        <svg className="w-12 h-12 text-orange-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Progress Photo</h4>
                                        <p className="text-gray-600 mb-4">Share visual documentation of your work and progress</p>
                                        <UploadButton<OurFileRouter, "imageUploader">
                                            endpoint="imageUploader"
                                            className="w-full"
                                            onClientUploadComplete={(res) => {
                                                if (res && res.length > 0) setImageUrl(res[0].url);
                                            }}
                                            onUploadError={(error) => alert('Upload failed: ' + error.message)}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative bg-white rounded-xl border-2 border-orange-200 overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt="Progress Documentation Preview"
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        <button
                                            type="button"
                                            onClick={() => setImageUrl(null)}
                                            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 shadow-lg hover:scale-105"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="text-white text-sm font-medium">Progress Documentation</p>
                                            <p className="text-orange-200 text-xs">Click the delete icon to replace this image</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-medium hover:scale-105"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || !reportText.trim()}
                                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center gap-2 hover:scale-105 disabled:hover:scale-100"
                            >
                                {submitting ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Saving Report...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{editingReport ? 'Update Report' : 'Save Report'}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}