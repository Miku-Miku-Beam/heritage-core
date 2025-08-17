
import Link from "next/link";

interface ProgramCardProps {
  id: string;
  title: string;
  isOpen: boolean;
  description: string;
  duration: string;
  criteria: string;
  category: string;
  applications: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  programImageUrl?: string;
  artisanAvatar?: string;
  artisanName?: string;
}

const fallbackAvatar = "/default-avatar.png";
const fallbackProgram = "/default-program.png";

const ProgramCard = ({
  id,
  title,
  isOpen,
  description,
  duration,
  criteria,
  category,
  applications,
  createdAt,
  updatedAt,
  programImageUrl,
  artisanAvatar,
  artisanName,
}: ProgramCardProps) => (
  <Link href={isOpen ? `/programs/${id}` : "#"} className={`group block h-full ${!isOpen ? 'pointer-events-none' : ''}`}>
    <div className="bg-white border border-gray-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
      {/* Image Header */}
      <div className="relative aspect-video">
        <img
          src={programImageUrl || fallbackProgram}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
            isOpen 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isOpen ? 'bg-green-500' : 'bg-gray-500'}`}></div>
            {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-orange-700 border border-orange-200 backdrop-blur-sm">
            {category}
          </span>
        </div>
        {!isOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <svg className="w-8 h-8 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-white font-medium text-sm">Program Closed</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Title and Description */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>

        {/* Program Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center mr-2 group-hover:bg-orange-200 transition-colors">
              <svg className="w-2.5 h-2.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-medium">{duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2 group-hover:bg-blue-200 transition-colors">
              <svg className="w-2.5 h-2.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="font-medium">{applications} Applicant{applications !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Artisan Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center min-w-0">
            <div className="relative">
              <img
                src={artisanAvatar || fallbackAvatar}
                alt={artisanName || 'Artisan'}
                className="w-10 h-10 rounded-full mr-3 flex-shrink-0 object-cover border-2 border-white shadow-sm group-hover:border-orange-200 transition-colors"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">{artisanName || 'Unknown Artisan'}</p>
              <p className="text-xs text-gray-500 font-medium">Master Artisan</p>
            </div>
          </div>
          
          {isOpen && (
            <div className="flex items-center text-orange-600 text-sm font-semibold group-hover:text-orange-700 transition-colors ml-3">
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">View</span>
              <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  </Link>
);

export default ProgramCard;