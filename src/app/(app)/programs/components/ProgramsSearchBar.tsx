"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProgramsSearchBarProps {
  search: string;
  category: string;
  categories: string[];
}

const ProgramsSearchBar = ({ search, category, categories }: ProgramsSearchBarProps) => {
  const [searchValue, setSearchValue] = useState(search || "");
  const [categoryValue, setCategoryValue] = useState(category || "All Program");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search-program" className="block text-sm font-medium text-gray-700 mb-2">Search Programs</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search-program"
              type="text"
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value);
                updateQuery(e.target.value, categoryValue);
              }}
              placeholder="Search by title or description..."
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              autoComplete="off"
            />
            {searchValue && (
              <button
                type="button"
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => {
                  setSearchValue("");
                  updateQuery("", categoryValue);
                }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-48">
          <label htmlFor="category-program" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            id="category-program"
            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
            value={categoryValue}
            onChange={e => {
              setCategoryValue(e.target.value);
              updateQuery(searchValue, e.target.value);
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProgramsSearchBar; 