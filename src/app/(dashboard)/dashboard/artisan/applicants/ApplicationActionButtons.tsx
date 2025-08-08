"use client";
import React, { useState } from "react";

interface ApplicationActionButtonsProps {
    applicationId: string;
    status: string;
}

const ApplicationActionButtons: React.FC<ApplicationActionButtonsProps> = ({ applicationId, status }) => {
    const [showModal, setShowModal] = useState<null | "approve" | "reject">(null);
    const [loading, setLoading] = useState(false);

    const handleAction = async (action: "approve" | "reject") => {
        setLoading(true);
        try {
            // Ganti dengan endpoint sesuai kebutuhan
            await fetch(`/api/application/${action}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: applicationId }),
            });
            window.location.reload();
        } catch (err) {
            alert("Failed to process application.");
        } finally {
            setLoading(false);
            setShowModal(null);
        }
    };

    // Show buttons for PENDING status
    if (status !== "PENDING") {
        return (
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600 font-medium">
                    Application has been {status.toLowerCase()}
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="flex gap-4">
                <button
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setShowModal("approve")}
                    disabled={loading}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {loading ? "Processing..." : "Approve Application"}
                </button>
                <button
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setShowModal("reject")}
                    disabled={loading}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {loading ? "Processing..." : "Reject Application"}
                </button>
            </div>
            
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 p-8 max-w-md w-full mx-auto">
                        <div className="text-center mb-6">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                showModal === "approve" ? "bg-green-100" : "bg-red-100"
                            }`}>
                                {showModal === "approve" ? (
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {showModal === "approve" ? "Approve Application" : "Reject Application"}
                            </h3>
                            <p className="text-gray-600">
                                Are you sure you want to {showModal === "approve" ? "approve" : "reject"} this application? 
                                This action cannot be undone.
                            </p>
                        </div>
                        
                        <div className="flex gap-3">
                            <button
                                className="flex-1 px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors disabled:opacity-50"
                                onClick={() => setShowModal(null)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className={`flex-1 px-4 py-3 rounded-xl text-white font-semibold transition-colors disabled:opacity-50 ${
                                    showModal === "approve" 
                                        ? "bg-green-500 hover:bg-green-600" 
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                                onClick={() => handleAction(showModal)}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : `Yes, ${showModal === "approve" ? "Approve" : "Reject"}`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ApplicationActionButtons;
