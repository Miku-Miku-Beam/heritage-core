"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function ModalApplyForm({
  open,
  onClose,
  programId,
}: {
  open: boolean;
  onClose: () => void;
  programId: string;
}) {
  const [motivation, setMotivation] = useState("");
  const [message, setMessage] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [cvError, setCvError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setCvError("");
    // Validate link
    if (cvLink && !/^https?:\/\//.test(cvLink)) {
      setCvError("CV/Portfolio link must start with http:// or https://");
      setLoading(false);
      return;
    }

    if (!programId) {
      alert("Program ID is required.");
      setLoading(false);
      return;
    }
    // Prepare FormData
    const formData = new FormData();
    formData.append("programId", programId);
    formData.append("motivation", motivation);
    formData.append("message", message);
    if (cvLink) formData.append("cvFileUrl", cvLink);

    // Send to API
    const res = await fetch("/api/application/apply", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    setLoading(false);
    if (res.ok) setSuccess(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div 
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-orange-100 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-white transition-all duration-200"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2">Apply for Program</h2>
                <p className="text-white/90 text-lg">Share your passion and motivation</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {success ? (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
                  <p className="text-gray-600 text-lg mb-8">Thank you for your interest. We'll review your application and contact you soon.</p>
                  <button
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Message Field */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Personal Message
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border-2 border-gray-200 focus:border-orange-400 rounded-xl px-4 py-3 transition-all duration-200 resize-none focus:ring-0 focus:outline-none"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                        rows={3}
                        placeholder="Write a personal message to the artisan..."
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {message.length}/500
                      </div>
                    </div>
                  </div>

                  {/* Motivation Field */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Your Motivation
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border-2 border-gray-200 focus:border-orange-400 rounded-xl px-4 py-3 transition-all duration-200 resize-none focus:ring-0 focus:outline-none"
                        value={motivation}
                        onChange={e => setMotivation(e.target.value)}
                        required
                        rows={4}
                        placeholder="Why are you passionate about learning this traditional craft?"
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {motivation.length}/1000
                      </div>
                    </div>
                  </div>

                  {/* CV/Portfolio Link */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      CV/Portfolio Link
                      <span className="text-gray-400 text-sm font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border-2 border-gray-200 focus:border-orange-400 rounded-xl px-4 py-3 transition-all duration-200 focus:ring-0 focus:outline-none"
                      value={cvLink}
                      onChange={e => setCvLink(e.target.value)}
                      placeholder="https://your-portfolio-or-cv.com"
                    />
                    {cvError && (
                      <motion.div 
                        className="mt-2 text-red-500 text-sm flex items-center gap-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {cvError}
                      </motion.div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>

                  {/* Help Text */}
                  <div className="text-center pt-2">
                    <p className="text-gray-500 text-sm">
                      By submitting, you agree to share your information with the artisan mentor.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}