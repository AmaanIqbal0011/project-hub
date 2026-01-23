'use client';

import Form from 'next/form';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchForm = ({ query }: { query?: string }) => {
  const router = useRouter();

  return (
    <Form
      action="/"
      scroll={false}
      className="relative mx-auto w-full max-w-xl"
    >
      <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-black/70">

        {/* Input */}
        <input
          type="text"
          name="query"
          defaultValue={query || ''}
          placeholder="Search projects, ideas, repos..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        />

        {/* ✅ Reset Button (shown only if query exists) */}
        {query && (
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex items-center justify-center rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-black"
            aria-label="Reset search"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center rounded-full bg-black p-2 text-white transition hover:scale-105 hover:bg-gray-900 active:scale-95"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;

