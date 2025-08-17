"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface ProgramsSearchBarProps {
  search: string;
  category: string;
  categories: string[];
}

const ProgramsSearchBar = ({ search, category, categories }: ProgramsSearchBarProps) => {
  const [searchValue, setSearchValue] = useState(search || "");
  const [categoryValue, setCategoryValue] = useState(category || "All Program");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Update state if props change (for SSR navigation)
  useEffect(() => {
    setSearchValue(search || "");
  }, [search]);
  useEffect(() => {
    setCategoryValue(category || "All Program");
  }, [category]);

  function updateQuery(newSearch: string, newCategory: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (newSearch) params.set("search", newSearch);
    else params.delete("search");
    if (newCategory && newCategory !== "All Program") params.set("category", newCategory);
    else params.delete("category");
    router.replace(`${pathname}?${params.toString()}`);
  }

  // Handle search with debouncing
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    searchTimeout.current = setTimeout(() => {
      updateQuery(value, categoryValue);
    }, 300);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsCategoryDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-orange-100/50">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1" role="search" aria-label="Search programs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search programs..."
            value={searchValue}
            onChange={handleSearch}
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => {
                setSearchValue("");
                updateQuery("", categoryValue);
              }}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative min-w-[180px] dropdown-container">
          <button
            type="button"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm text-left flex items-center justify-between hover:border-gray-400 transition-colors"
          >
            <span className="truncate flex items-center">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {categoryValue}
            </span>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isCategoryDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="py-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategoryValue(cat);
                      updateQuery(searchValue, cat);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-orange-50 transition-colors ${
                      categoryValue === cat ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reset Button */}
        {(searchValue || categoryValue !== 'All Program') && (
          <button
            type="button"
            onClick={() => {
              setSearchValue("");
              setCategoryValue("All Program");
              updateQuery("", "All Program");
            }}
            className="px-3 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default ProgramsSearchBar; 