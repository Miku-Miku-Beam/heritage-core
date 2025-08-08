"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ModalApplyForm from "./ModalApplyForm";

interface ProgramDetailProps {
  program: {
    id: string;
    title: string;
    description: string;
    duration: string;
    criteria: string;
    isOpen: boolean;
    location?: string;
    programImageUrl?: string;
    artisan?: {
      name?: string;
      bio?: string;
      profileImageUrl?: string;
    };
    category?: {
      name?: string;
    };
  };
}

const fallbackProgram = "/default-program.png";

const ProgramDetail = ({ program }: ProgramDetailProps) => {
  const [showModal, setShowModal] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    program.programImageUrl || fallbackProgram
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* Hero Section */}
      <motion.div 
        className="relative w-full h-96 md:h-[500px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={imgSrc}
            alt={program.title}
            className="object-cover w-full h-full"
            onError={() => setImgSrc(fallbackProgram)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <motion.div 
              className="flex flex-col md:flex-row items-end gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Artisan Profile */}
              <div className="flex-shrink-0">
                <img
                  src={program.artisan?.profileImageUrl || "/default-avatar.png"}
                  alt={program.artisan?.name || "Artisan"}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-2xl"
                />
              </div>

              {/* Program Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {program.category?.name}
                  </span>
                  
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                    program.isOpen
                      ? "bg-green-500/90 backdrop-blur-sm text-white"
                      : "bg-gray-500/90 backdrop-blur-sm text-white"
                  }`}>
                    {program.isOpen ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    {program.isOpen ? "Open for Applications" : "Closed"}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
                  {program.title}
                </h1>
                
                <div className="flex items-center justify-center md:justify-start gap-2 text-white/90 text-lg">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-semibold">{program.artisan?.name || "Master Artisan"}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative -mt-20 z-20">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                About This Program
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {program.description}
              </p>
            </div>

            {/* Artisan Bio Card */}
            {program.artisan?.bio && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Your Mentor
                </h2>
                <div className="flex items-start gap-4">
                  <img
                    src={program.artisan?.profileImageUrl || "/default-avatar.png"}
                    alt={program.artisan?.name || "Artisan"}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{program.artisan?.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{program.artisan.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Criteria Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Requirements
              </h2>
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line font-medium">
                  {program.criteria}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-orange-100 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Program Details</h3>
              
              <div className="space-y-4">
                {/* Duration */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Duration</div>
                    <div className="text-orange-600 font-bold">{program.duration}</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Location</div>
                    <div className="text-orange-600 font-bold">{program.location || "To be announced"}</div>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-8">
                <button
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-lg shadow-xl transition-all duration-300 transform ${
                    program.isOpen
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white hover:scale-105 hover:shadow-2xl"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!program.isOpen}
                  onClick={() => program.isOpen && setShowModal(true)}
                >
                  {program.isOpen ? (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Apply for Internship
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Applications Closed
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <ModalApplyForm
        open={showModal}
        onClose={() => setShowModal(false)}
        programId={program.id}
      />
    </div>
  );
};

export default ProgramDetail;
