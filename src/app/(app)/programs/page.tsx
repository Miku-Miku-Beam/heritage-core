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
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight drop-shadow-lg">Heritage Programs</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Discover traditional craft programs and learn from master artisans
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Available Programs</h2>
              <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                {events.length} {events.length === 1 ? 'Program' : 'Programs'}
              </span>
            </div>
          </div>
          
          <Suspense fallback={
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <div className="w-full md:w-48">
                  <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          }>
            <ProgramsSearchBar search={search} category={category} categories={categories} />
          </Suspense>
        </div>

        <ProgramsList events={events} />
      </div>
    </div>
  );
}
