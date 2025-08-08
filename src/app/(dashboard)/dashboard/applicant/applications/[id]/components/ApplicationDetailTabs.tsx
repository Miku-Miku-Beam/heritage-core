"use client";
import type { ApplicationWithDetails } from "@/lib/repository/application.repository";
import React, { FormEvent, useEffect, useState } from "react";
import { ApplicationDetails } from "./ApplicationDetails";
import { LearningJournal } from "./LearningJournal";
import { ReportFormModal } from "./ReportFormModal";


interface ApplicationDetailTabsProps {
    application: ApplicationWithDetails;
}

export interface ProgressReport {
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

    const fetchReports = async () => {
        try {
            const res = await fetch(`/api/application/progress-report?applicationId=${application.id}`);
            if (res.ok) {
                const data = await res.json();
                setReports(data);
            }
        } catch (error) {
            console.error("Failed to fetch reports:", error);
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
            const res = await fetch(`/api/application/progress-report/${reportId}`, { method: 'DELETE' });
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!imageUrl) return;
        setSubmitting(true);
        try {
            const endpoint = editingReport ? `/api/application/progress-report/${editingReport.id}` : '/api/application/progress-report';
            const method = editingReport ? 'PUT' : 'POST';
            const body = editingReport
                ? { weekNumber, reportText, imageUrl }
                : { applicationId: application.id, weekNumber, reportText, imageUrl };

            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error(editingReport ? 'Failed to update report' : 'Failed to submit report');
            alert(editingReport ? 'Report successfully updated' : 'Report successfully created');
            handleCancelEdit();
            fetchReports();
        } catch (err) {
            alert((err as Error).message);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'journal') {
            fetchReports();
        }
    }, [activeTab, application.id]);

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-orange-200 overflow-hidden">
            {/* Modern Tab Navigation */}
            <div className="border-b border-orange-200/50 bg-gradient-to-r from-orange-50/30 to-yellow-50/30">
                <div className="flex">
                    <button
                        className={`relative px-8 py-4 font-semibold text-sm transition-all duration-200 ${
                            activeTab === 'detail' 
                                ? 'text-orange-600 bg-white border-b-2 border-orange-500' 
                                : 'text-gray-600 hover:text-orange-500 hover:bg-white/50'
                        }`}
                        onClick={() => setActiveTab('detail')}
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Application Details
                        </div>
                        {activeTab === 'detail' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                        )}
                    </button>
                    
                    {application.status === 'APPROVED' && (
                        <button
                            className={`relative px-8 py-4 font-semibold text-sm transition-all duration-200 ${
                                activeTab === 'journal' 
                                    ? 'text-orange-600 bg-white border-b-2 border-orange-500' 
                                    : 'text-gray-600 hover:text-orange-500 hover:bg-white/50'
                            }`}
                            onClick={() => setActiveTab('journal')}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Learning Journal
                                {reports.length > 0 && (
                                    <span className="ml-2 px-2 py-1 text-xs bg-orange-500 text-white rounded-full">
                                        {reports.length}
                                    </span>
                                )}
                            </div>
                            {activeTab === 'journal' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
                {activeTab === 'detail' && <ApplicationDetails application={application} />}
                {activeTab === 'journal' && (
                    <LearningJournal
                        reports={reports}
                        onAddReport={() => setShowForm(true)}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        deleting={deleting}
                    />
                )}
            </div>

            {showForm && (
                <ReportFormModal
                    editingReport={editingReport}
                    weekNumber={weekNumber}
                    setWeekNumber={setWeekNumber}
                    reportText={reportText}
                    setReportText={setReportText}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    submitting={submitting}
                    handleSubmit={handleSubmit}
                    handleCancelEdit={handleCancelEdit}
                />
            )}
        </div>
    );
}