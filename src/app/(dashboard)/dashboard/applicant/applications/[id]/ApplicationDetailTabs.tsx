"use client";
import StatusChip from "@/lib/components/StatusChip";
import type { ApplicationWithDetails } from "@/lib/repository/application.repository";
import type { OurFileRouter } from "@/lib/uploadthing";
import { UploadButton } from "@uploadthing/react";
import React, { FormEvent, useEffect, useState } from "react";

interface ApplicationDetailTabsProps {
    application: ApplicationWithDetails;
}

interface ProgressReport {
    id: string;
    weekNumber: number;
    reportText: string;
    imageUrl: string;
    createdAt: string;
}

export default function ApplicationDetailTabs({ application }: ApplicationDetailTabsProps) {
    const [activeTab, setActiveTab] = useState<'detail' | 'journal'>('detail');
    const [showForm, setShowForm] = useState(false);
    const [editingReport, setEditingReport] = useState<ProgressReport | null>(null);
    const [weekNumber, setWeekNumber] = useState(1);
    const [reportText, setReportText] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [reports, setReports] = useState<ProgressReport[]>([]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!imageUrl) return;
        setSubmitting(true);
        try {
            if (editingReport) {
                // Update existing report
                const res = await fetch(`/api/application/progress-report/${editingReport.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ weekNumber, reportText, imageUrl }),
                });
                if (!res.ok) throw new Error('Failed to update report');
                alert('Report successfully updated');
            } else {
                // Create new report
                const res = await fetch('/api/application/progress-report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ applicationId: application.id, weekNumber, reportText, imageUrl }),
                });
                if (!res.ok) throw new Error('Failed to submit report');
                alert('Report successfully created');
            }
            setShowForm(false);
            setEditingReport(null);
            setReportText(''); setWeekNumber(1); setImageUrl(null);
            fetchReports();
        } catch (err) {
            alert((err as Error).message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (report: ProgressReport) => {
        setEditingReport(report);
        setWeekNumber(report.weekNumber);
        setReportText(report.reportText);
        setImageUrl(report.imageUrl);
        setShowForm(true);
    };

    const handleDelete = async (reportId: string) => {
        if (!confirm('Are you sure you want to delete this report?')) return;
        setDeleting(reportId);
        try {
            const res = await fetch(`/api/application/progress-report/${reportId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete report');
            alert('Report successfully deleted');
            fetchReports();
        } catch (err) {
            alert((err as Error).message);
        } finally {
            setDeleting(null);
        }
    };

    const handleCancelEdit = () => {
        setShowForm(false);
        setEditingReport(null);
        setReportText(''); setWeekNumber(1); setImageUrl(null);
    };

    const fetchReports = async () => {
        try {
            const res = await fetch(`/api/application/progress-report?applicationId=${application.id}`);
            if (res.ok) {
                const data = await res.json();
                setReports(data);
            }
        } catch { }
    };

    useEffect(() => {
        if (activeTab === 'journal') {
            fetchReports();
        }
    }, [activeTab, application.id]);

    return (
        <div className="mt-8">
            {/* Tab Navigation */}
            <div className="flex border-b border-orange-200">
                <button
                    className={`px-4 py-2 ${activeTab === 'detail' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('detail')}
                >
                    Application Details
                </button>
                {application.status === 'APPROVED' && (
                    <button
                        className={`px-4 py-2 ${activeTab === 'journal' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('journal')}
                    >
                        Learning Journal
                    </button>
                )}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'detail' && (
                    <div className="space-y-6">
                        {/* Application Status */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 text-orange-600">Application Detail</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="mb-2"><strong>Status:</strong> <StatusChip status={application.status} /></p>
                                    <p className="mb-2"><strong>Application Date:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
                                    <p className="mb-2"><strong>Message:</strong> {application.message}</p>
                                    {application.motivation && (
                                        <p className="mb-2"><strong>Motivation:</strong> {application.motivation}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Program Details */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 text-orange-600">Program Detail</h2>
                            <div className="h-60 overflow-hidden rounded-xl mb-4">
                                <img src={application.Program.programImageUrl ? application.Program.programImageUrl : '/placeholder.png'} alt={application.Program.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{application.Program.title}</h3>
                                    <p className="text-gray-700 mb-4">{application.Program.description}</p>

                                    <div className="space-y-2">
                                        <p><strong>Category:</strong> {application.Program.category.name}</p>
                                        <p><strong>Duration:</strong> {application.Program.duration}</p>
                                        <p><strong>Program Status:</strong> {application.Program.isOpen ? 'Open' : 'Closed'}</p>
                                    </div>
                                </div>

                                <div>
                                    {/* Artisan Info */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2">Artisan</h4>
                                        <div className="flex items-center space-x-3">
                                            {application.Program.artisan.profileImageUrl ? (
                                                <img
                                                    src={application.Program.artisan.profileImageUrl}
                                                    alt={application.Program.artisan.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-100 via-yellow-100 to-pink-100 flex items-center justify-center border-4 border-white shadow-md">
                                                    <span className="font-extrabold text-orange-600">
                                                        {application.Program.artisan.name?.charAt(0).toUpperCase() || 'A'}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-center space-x-3">
                                                {application.Program.artisan.profileImageUrl && (
                                                    <img
                                                        src={application.Program.artisan.profileImageUrl}
                                                        alt={application.Program.artisan.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <p className="font-medium">{application.Program.artisan.name}</p>
                                                    {application.Program.artisan.location && (
                                                        <p className="text-sm text-gray-600">{application.Program.artisan.location}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'journal' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold mb-4 text-orange-600">Learning Journal</h2>
                            <button
                                className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                                onClick={() => setShowForm(true)}
                            >
                                + Add Weekly Report
                            </button>
                        </div>
                        <div>

                            {/* List of weekly reports */}
                            {reports.length > 0 ? (
                                <div className="space-y-4">
                                    {reports.map(r => (
                                        <div key={r.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                                            Week {r.weekNumber}
                                                        </div>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(r.createdAt).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEdit(r)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                                            title="Edit Report"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(r.id)}
                                                            disabled={deleting === r.id}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                                            title="Delete report"
                                                        >
                                                            {deleting === r.id ? (
                                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="prose max-w-none">
                                                    <p className="text-gray-700 leading-relaxed mb-4">{r.reportText}</p>
                                                    {r.imageUrl && (
                                                        <div className="rounded-lg overflow-hidden">
                                                            <img
                                                                src={r.imageUrl}
                                                                alt="Dokumentasi kegiatan"
                                                                className="w-full h-60 object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                                                                onClick={() => window.open(r.imageUrl, '_blank')}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="mb-4">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No weekly reports yet</h3>
                                    <p className="text-gray-500 mb-4">Start documenting your learning journey by creating your first weekly report.</p>
                                    <button
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                                        onClick={() => setShowForm(true)}
                                    >
                                        Create First Report
                                    </button>
                                </div>
                            )}

                            {/* Modal form popup */}
                            {showForm && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {editingReport ? 'Edit Weekly Report' : 'Create Weekly Report'}
                                                </h3>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                                >
                                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Week Number</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={weekNumber}
                                                        onChange={e => setWeekNumber(parseInt(e.target.value))}
                                                        className="block w-24 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                        placeholder="1"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Content</label>
                                                    <textarea
                                                        value={reportText}
                                                        onChange={e => setReportText(e.target.value)}
                                                        rows={5}
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                        placeholder="Ceritakan aktivitas dan pembelajaran Anda minggu ini..."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Documentation Photo</label>
                                                    <div className="space-y-4">
                                                        <UploadButton<OurFileRouter, "imageUploader">
                                                            endpoint="imageUploader"
                                                            className="w-full"
                                                            onClientUploadComplete={(res) => {
                                                                if (res && res.length > 0) setImageUrl(res[0].url);
                                                            }}
                                                            onUploadError={(error) => alert('Upload gagal: ' + error.message)}
                                                        />
                                                        {imageUrl && (
                                                            <div className="relative">
                                                                <img
                                                                    src={imageUrl}
                                                                    alt="Preview"
                                                                    className="w-full h-48 object-cover rounded-lg"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setImageUrl(null)}
                                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={submitting || !imageUrl || !reportText.trim()}
                                                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                                                    >
                                                        <span>{submitting ? 'Saving...' : (editingReport ? 'Update' : 'Save')}</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
