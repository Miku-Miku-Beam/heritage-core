import prisma from '@/lib/prisma';
import { Suspense } from 'react';
import ProgramsList from './components/programsList';
import ProgramsSearchBar from './components/ProgramsSearchBar';

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


function getUniqueCategories(events: ProgramCardProps[]) {
  const cats = events.map(e => e.category).filter(Boolean);
  return Array.from(new Set(cats));
}

export interface ProgramsSearchParams {
  search?: string;
  category?: string;
}

export default async function EventPage({ searchParams }: { searchParams: Promise<ProgramsSearchParams> }) {
  let events: ProgramCardProps[] = [];
  let error: unknown = null;

  const { search: searchParam, category: categoryParam } = await searchParams;
  
  const search = searchParam || '';
  const category = categoryParam || 'All Program';
  try {
    const dbEvents = await prisma.program.findMany({
      include: {
        artisan: true,
        category: true,
        applications: true,
      },
      orderBy: { createdAt: 'desc' },
      where: {
        isOpen: true,
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
        ...(category && category !== 'All Program'
          ? { category: { name: category } }
          : {}),
      },
    });
    events = dbEvents.map(event => ({
      id: event.id,
      title: event.title,
      isOpen: event.isOpen,
      description: event.description,
      duration: event.duration,
      criteria: event.criteria,
      category: event.category?.name || '-',
      applications: event.applications.length,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      programImageUrl: event.programImageUrl || "/default-program.jpg",
      artisanAvatar: event.artisan?.profileImageUrl || "/default-avatar.png",
      artisanName: event.artisan?.name || 'Unknown',
    }));
  } catch (e) {
    error = e;
    console.error('Error fetching events:', e);
  }

  const categories = ['All Program', ...getUniqueCategories(events)];

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h2>
            <p className="text-red-600 mb-6">{error instanceof Error ? error.message : String(error)}</p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-yellow-400/20"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-300/15 rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent drop-shadow-lg">
                Heritage Programs
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-orange-50 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover traditional craft programs and learn from master artisans who preserve Indonesia's rich cultural heritage
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{events.length}</div>
                <div className="text-sm text-orange-100">Active Programs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{events.filter(e => e.isOpen).length}</div>
                <div className="text-sm text-orange-100">Open for Registration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{getUniqueCategories(events).length}</div>
                <div className="text-sm text-orange-100">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <Suspense fallback={
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-orange-100/50">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <div className="h-11 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="min-w-[180px]">
                <div className="h-11 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        }>
          <ProgramsSearchBar search={search} category={category} categories={categories} />
        </Suspense>
      </div>

      {/* Programs Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Available Programs</h2>
            <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
              {events.length} {events.length === 1 ? 'Program' : 'Programs'}
            </span>
          </div>
          
          {events.length > 0 && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Open Programs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>Closed Programs</span>
              </div>
            </div>
          )}
        </div>

        <ProgramsList events={events} />
      </div>
    </div>
  );
}
