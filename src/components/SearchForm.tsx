'use client';

import Form from 'next/form';
import { Search, X, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SearchForm = ({ query }: { query?: string }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const popularSearches = ['Next.js', 'AI', 'Dashboard', 'Portfolio', 'SaaS'];

  return (
    <div className="w-full">
      <Form
        action="/"
        scroll={false}
        className="relative mx-auto w-full max-w-xl"
      >
        <div className="relative flex items-center gap-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-2 py-2 shadow-lg dark:shadow-2xl backdrop-blur-sm transition-all focus-within:ring-2 focus-within:ring-indigo-500/50">

          {/* Search Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white">
            <Search className="h-5 w-5" />
          </div>

          {/* Input */}
          <input
            type="text"
            name="query"
            defaultValue={query || ''}
            placeholder="Search projects, ideas, repos..."
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-neutral-400"
          />

          {/* Reset Button */}
          {query && mounted && (
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex items-center justify-center rounded-full p-2 text-gray-400 dark:text-neutral-400 transition hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
              aria-label="Reset search"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center rounded-xl bg-gray-900 dark:bg-white px-5 py-2.5 text-sm font-semibold text-white dark:text-gray-900 transition-all hover:scale-105 hover:shadow-lg"
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </Form>

      {/* Popular Searches */}
      {!query && mounted && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-gray-500 dark:text-neutral-500">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => router.push(`/?query=${encodeURIComponent(term)}`)}
              className="rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-1 text-xs text-gray-600 dark:text-neutral-300 transition hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;

