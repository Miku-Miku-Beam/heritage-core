"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Types
interface ArtisanProfile {
    imageUrl?: string | null;
    expertise?: string | null;
    location?: string | null;
    story?: string | null;
}

interface ArtisanProgram {
    id: string;
    title: string;
}

interface Artisan {
    id: string;
    name?: string | null;
    role: string;
    ArtisanProfile?: ArtisanProfile | null;
    ArtisanPrograms: ArtisanProgram[];
    profileImageUrl?: string | null;
    location?: string | null;
}

// Props interface for the component
interface ArtisansPageClientProps {
    initialArtisans: Artisan[];
}

export default function ArtisansPageClient({ initialArtisans }: ArtisansPageClientProps) {
    // State management
    const [artisans] = useState<Artisan[]>(initialArtisans);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Latest");
    const [isLoading, setIsLoading] = useState(false);
    const [isProvinceDropdownOpen, setIsProvinceDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    
    // Refs
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    // Indonesian provinces for location filter
    const indonesianProvinces = [
        "All",
        "Aceh",
        "Sumatera Utara", 
        "Sumatera Barat",
        "Riau",
        "Kepulauan Riau",
        "Jambi",
        "Sumatera Selatan",
        "Bangka Belitung",
        "Bengkulu",
        "Lampung",
        "DKI Jakarta",
        "Banten",
        "Jawa Barat",
        "Jawa Tengah",
        "DI Yogyakarta",
        "Jawa Timur",
        "Bali",
        "Nusa Tenggara Barat",
        "Nusa Tenggara Timur",
        "Kalimantan Barat",
        "Kalimantan Tengah",
        "Kalimantan Selatan",
        "Kalimantan Timur",
        "Kalimantan Utara",
        "Sulawesi Utara",
        "Gorontalo",
        "Sulawesi Tengah",
        "Sulawesi Barat",
        "Sulawesi Selatan",
        "Sulawesi Tenggara",
        "Maluku",
        "Maluku Utara",
        "Papua",
        "Papua Barat"
    ];

    // Filter and sort artisans
    const filteredAndSortedArtisans = useMemo(() => {
        let filtered = artisans;

        // Apply search filter with improved matching
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(artisan => {
                const name = artisan.name?.toLowerCase() || '';
                const expertise = artisan.ArtisanProfile?.expertise?.toLowerCase() || '';
                const location = (artisan.ArtisanProfile?.location || artisan.location || '').toLowerCase();
                const story = artisan.ArtisanProfile?.story?.toLowerCase() || '';
                
                return name.includes(searchLower) ||
                       expertise.includes(searchLower) ||
                       location.includes(searchLower) ||
                       story.includes(searchLower);
            });
        }

        // Apply province filter with exact matching
        if (selectedFilter !== "All") {
            filtered = filtered.filter(artisan => {
                const artisanLocation = (artisan.ArtisanProfile?.location || artisan.location || '').toLowerCase();
                const selectedProvince = selectedFilter.toLowerCase();
                
                // Check if location contains the selected province
                return artisanLocation.includes(selectedProvince) ||
                       selectedProvince.includes(artisanLocation);
            });
        }

        // Apply sorting with improved logic
        switch (sortBy) {
            case "Name A-Z":
                filtered = [...filtered].sort((a, b) => {
                    const nameA = (a.name || "").toLowerCase();
                    const nameB = (b.name || "").toLowerCase();
                    return nameA.localeCompare(nameB);
                });
                break;
            case "Name Z-A":
                filtered = [...filtered].sort((a, b) => {
                    const nameA = (a.name || "").toLowerCase();
                    const nameB = (b.name || "").toLowerCase();
                    return nameB.localeCompare(nameA);
                });
                break;
            case "Most Programs":
                filtered = [...filtered].sort((a, b) => {
                    const programsA = a.ArtisanPrograms.length;
                    const programsB = b.ArtisanPrograms.length;
                    if (programsA !== programsB) {
                        return programsB - programsA;
                    }
                    // If same number of programs, sort by name
                    return (a.name || "").localeCompare(b.name || "");
                });
                break;
            case "Location":
                filtered = [...filtered].sort((a, b) => {
                    const locationA = (a.ArtisanProfile?.location || a.location || "").toLowerCase();
                    const locationB = (b.ArtisanProfile?.location || b.location || "").toLowerCase();
                    if (locationA !== locationB) {
                        return locationA.localeCompare(locationB);
                    }
                    // If same location, sort by name
                    return (a.name || "").localeCompare(b.name || "");
                });
                break;
            case "Latest":
            default:
                // Keep original order (latest first)
                break;
        }

        return filtered;
    }, [artisans, searchTerm, selectedFilter, sortBy]);

    // Handle search input with debouncing
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Clear any existing timeout
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        
        // Set new timeout for debounced search
        searchTimeout.current = setTimeout(() => {
            setSearchTerm(value);
        }, 300);
    };

    // Handle filter selection
    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
    };

    // Handle sort change
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedFilter("All");
        setSortBy("Latest");
    };
    
    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to clear filters or close dropdowns
            if (e.key === 'Escape') {
                if (isProvinceDropdownOpen || isSortDropdownOpen) {
                    setIsProvinceDropdownOpen(false);
                    setIsSortDropdownOpen(false);
                } else if (searchTerm || selectedFilter !== "All") {
                    clearFilters();
                }
            }
        };
        
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.dropdown-container')) {
                setIsProvinceDropdownOpen(false);
                setIsSortDropdownOpen(false);
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [searchTerm, selectedFilter, isProvinceDropdownOpen, isSortDropdownOpen]);

    // Loading state simulation
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);
    
    // Cleanup search timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, []);

    // Removed sticky observer (simplified toolbar)

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
            {/* Enhanced Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 text-white shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-700/20 via-transparent to-yellow-600/20"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-24 -translate-y-24 animate-pulse"></div>
                <div className="absolute top-16 right-16 w-32 h-32 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-8 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                
                {/* Subtle Patterns */}
                <div className="absolute top-24 right-1/4 w-1 h-1 bg-white/30 rounded-full"></div>
                <div className="absolute top-36 right-1/3 w-2 h-2 bg-white/20 rounded-full"></div>
                <div className="absolute top-44 right-1/2 w-1 h-1 bg-white/25 rounded-full"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                            {/* Enhanced Badge */}
                        <div className="inline-flex items-center px-6 py-3 bg-white/25 backdrop-blur-md rounded-full text-sm font-semibold mb-8 border border-white/40 shadow-xl hover:bg-white/35 transition-all duration-300 hover:scale-105">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                            {filteredAndSortedArtisans.length} Talented Artisans
                        </div>
                        
                        
                        {/* Enhanced Title */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight drop-shadow-2xl bg-gradient-to-r from-white via-orange-50 to-yellow-100 bg-clip-text text-transparent">
                            Heritage Artisans
                        </h1>
                        
                        {/* Enhanced Description */}
                        <p className="text-lg md:text-xl lg:text-2xl text-orange-50 max-w-4xl mx-auto leading-relaxed mb-10 font-medium">
                            Discover the guardians of traditional crafts, preserving Indonesia&apos;s rich cultural heritage through their skilled hands and passionate hearts
                        </p>
                        
                    </div>
                </div>
            </div>

            {/* Simple one-line toolbar: Search + Province + Sort + Reset */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-orange-100/50">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                        {/* Search */}
                        <div className="relative flex-1" role="search" aria-label="Search artisans">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search artisans..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm("")}
                                    aria-label="Clear search"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 flex items-center justify-center"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {/* Province Dropdown */}
                        <div className="relative min-w-[180px] dropdown-container">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsProvinceDropdownOpen(!isProvinceDropdownOpen);
                                    setIsSortDropdownOpen(false);
                                }}
                                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm text-left flex items-center justify-between hover:border-gray-400 transition-colors"
                            >
                                <span className="truncate">
                                    {selectedFilter === "All" ? "All Provinces" : selectedFilter}
                                </span>
                                <svg 
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProvinceDropdownOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {isProvinceDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                    <div className="py-1">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleFilterChange("All");
                                                setIsProvinceDropdownOpen(false);
                                            }}
                                            className={`w-full px-3 py-2 text-left text-sm hover:bg-orange-50 transition-colors ${
                                                selectedFilter === "All" ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-700'
                                            }`}
                                        >
                                            All Provinces
                                        </button>
                                        {indonesianProvinces.filter(p => p !== 'All').map((province) => (
                                            <button
                                                key={province}
                                                type="button"
                                                onClick={() => {
                                                    handleFilterChange(province);
                                                    setIsProvinceDropdownOpen(false);
                                                }}
                                                className={`w-full px-3 py-2 text-left text-sm hover:bg-orange-50 transition-colors ${
                                                    selectedFilter === province ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-700'
                                                }`}
                                            >
                                                {province}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative min-w-[160px] dropdown-container">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSortDropdownOpen(!isSortDropdownOpen);
                                    setIsProvinceDropdownOpen(false);
                                }}
                                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm text-left flex items-center justify-between hover:border-gray-400 transition-colors"
                            >
                                <span className="truncate flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                    </svg>
                                    {sortBy}
                                </span>
                                <svg 
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {isSortDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    <div className="py-1">
                                        {[
                                            { value: "Latest", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Latest" },
                                            { value: "Name A-Z", icon: "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4", label: "Name A-Z" },
                                            { value: "Name Z-A", icon: "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l4 4m-4-4l-4 4", label: "Name Z-A" },
                                            { value: "Most Programs", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Most Programs" },
                                            { value: "Location", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Location" }
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setSortBy(option.value);
                                                    setIsSortDropdownOpen(false);
                                                }}
                                                className={`w-full px-3 py-2 text-left text-sm hover:bg-orange-50 transition-colors flex items-center ${
                                                    sortBy === option.value ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-700'
                                                }`}
                                            >
                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
                                                </svg>
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Reset */}
                        {(searchTerm || selectedFilter !== 'All' || sortBy !== 'Latest') && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="px-3 py-2.5 text-sm font-medium text-red-600 hover:text-red-700"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Enhanced Artisans Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-3xl overflow-hidden h-full animate-pulse">
                                <div className="bg-gray-200 px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-300"></div>
                                        <div className="w-28 sm:w-32 h-5 sm:h-6 bg-gray-300 rounded mt-3 sm:mt-5"></div>
                                        <div className="w-20 sm:w-24 h-6 sm:h-8 bg-gray-300 rounded-full mt-2 sm:mt-3"></div>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full mb-3 sm:mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="w-full h-3 sm:h-4 bg-gray-300 rounded"></div>
                                        <div className="w-3/4 h-3 sm:h-4 bg-gray-300 rounded"></div>
                                    </div>
                                    <div className="flex justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-4 sm:mt-5">
                                        <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-300 rounded"></div>
                                        <div className="w-16 sm:w-20 h-3 sm:h-4 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredAndSortedArtisans.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                        {filteredAndSortedArtisans.map((artisan, index) => {
                            const profile = artisan.ArtisanProfile;
                            const activePrograms = artisan.ArtisanPrograms.length;

                            return (
                                <div
                                    key={artisan.id}
                                    className="animate-fade-in-up"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <Link href={`/artisan/${artisan.id}`} className="group block h-full">
                                        <div className="bg-white border border-gray-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
                                            {/* Enhanced Header with Avatar */}
                                            <div className="relative bg-gradient-to-br from-orange-300 via-yellow-30 to-amber-50 px-4 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5">
                                                <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-yellow-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                <div className="relative flex flex-col items-center">
                                                    {profile?.imageUrl || artisan.profileImageUrl ? (
                                                        <div className="relative">
                                                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-3 sm:ring-4 ring-white shadow-xl overflow-hidden bg-gradient-to-br from-orange-400 to-yellow-500 p-0.5 sm:p-1">
                                                                <Image
                                                                    src={profile?.imageUrl || artisan.profileImageUrl || '/default-avatar.png'}
                                                                    alt={artisan.name || 'Artisan'}
                                                                    width={96}
                                                                    height={96}
                                                                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>
                                                            {activePrograms > 0 && (
                                                                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                                                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="relative">
                                                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-orange-400 via-yellow-500 to-amber-600 flex items-center justify-center ring-3 sm:ring-4 ring-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                                                                <span className="text-xl sm:text-2xl font-bold text-white">
                                                                    {artisan.name?.charAt(0).toUpperCase() || 'A'}
                                                                </span>
                                                            </div>
                                                            {activePrograms > 0 && (
                                                                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                                                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-3 sm:mt-4 text-center line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
                                                        {artisan.name}
                                                    </h3>
                                                    
                                                    {profile?.expertise && (
                                                        <div className="mt-1.5 sm:mt-2 inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 border border-orange-200 group-hover:from-orange-200 group-hover:to-yellow-200 transition-all duration-300">
                                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                                            </svg>
                                                            {profile.expertise}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Enhanced Content */}
                                            <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                                {/* Location */}
                                                {(profile?.location || artisan.location) && (
                                                    <div className="flex items-center text-gray-500 mb-2 group-hover:text-gray-600 transition-colors duration-300">
                                                        <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center mr-2 group-hover:bg-orange-200 transition-colors duration-300">
                                                            <svg className="w-2.5 h-2.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-xs sm:text-sm font-medium truncate">{profile?.location || artisan.location}</span>
                                                    </div>
                                                )}

                                                {/* Story Preview */}
                                                {profile?.story && (
                                                    <p className="text-gray-600 text-xs sm:text-xs mb-3 line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 flex-1">
                                                        {profile.story}
                                                    </p>
                                                )}

                                                {/* Enhanced Stats */}
                                                <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                                                    <div className="flex items-center text-xs sm:text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                                                        <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-1.5 group-hover:bg-green-200 transition-colors duration-300">
                                                            <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-medium text-xs sm:text-xs">{activePrograms} Program{activePrograms !== 1 ? 's' : ''}</span>
                                                    </div>
                                                    
                                                    <div className="flex items-center text-orange-600 text-xs sm:text-xs font-semibold group-hover:text-orange-700 transition-colors duration-300">
                                                        <span className="sm:inline">View Profile</span>
                                                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3  transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                {searchTerm || selectedFilter !== "All" ? "No Results Found" : "No Artisans Found"}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {searchTerm || selectedFilter !== "All" 
                                    ? `No artisans match your search for &quot;${searchTerm}&quot; or location filter &quot;${selectedFilter}&quot;. Try adjusting your search terms or location filters.`
                                    : "We&apos;re building our community of talented artisans. Check back soon to discover amazing creators preserving traditional crafts!"
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    href="/programs" 
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Browse Programs Instead
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                                <button className="inline-flex items-center px-8 py-4 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Become an Artisan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Enhanced Call to Action Section */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-16">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Learn from the Masters?</h2>
                    <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                        Join our community and discover the art of traditional crafts from Indonesia&apos;s finest artisans
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/programs" 
                            className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Explore Programs
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                        <Link 
                            href="/getstarted" 
                            className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105"
                        >
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
