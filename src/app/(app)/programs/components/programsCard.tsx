
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
    <div className="bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col">
      {/* Image Header */}
      <div className="relative aspect-video">
        <img
          src={programImageUrl || fallbackProgram}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isOpen 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
        {!isOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-medium text-lg">Program Closed</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            {category}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>

        {/* Program Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{applications} applicant{applications !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Artisan Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <img
              src={artisanAvatar || fallbackAvatar}
              alt={artisanName || 'Artisan'}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{artisanName || 'Unknown'}</p>
              <p className="text-xs text-gray-500">Artisan</p>
            </div>
          </div>
          
          {isOpen && (
            <div className="flex items-center text-orange-600 text-sm font-medium group-hover:text-orange-700">
              View Details
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  </Link>
);

export default ProgramCard;