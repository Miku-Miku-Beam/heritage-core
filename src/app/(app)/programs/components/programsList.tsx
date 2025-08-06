import ProgramCard from './programsCard';

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

interface ProgramsListProps {
  events: ProgramCardProps[];
  search?: string;
  category?: string;
}

const ProgramsList = ({ events }: ProgramsListProps) => (
  <div>
    {events && events.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event: ProgramCardProps) => (
          <ProgramCard key={event.id} {...event} />
        ))}
      </div>
    ) : (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No Programs Found</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            We couldn't find any programs matching your criteria. Try adjusting your search terms or filters.
          </p>
        </div>
      </div>
    )}
  </div>
);

export default ProgramsList; 