import SearchForm from "@/components/SearchForm";
import { ThreeDCardDemo } from "@/components/threeDCard";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();

  const { data: posts } = await sanityFetch({
    query: PROJECT_QUERY,
    params,
  });

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-slate-950">
        {/* Mask */}
        <div className="pointer-events-none absolute inset-0 z-20 [mask-image:radial-gradient(circle_at_center,transparent_25%,black)]" />

        {/* Animated BG */}
        <Boxes />

        {/* Content */}
        <div className="relative z-30 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <span className="mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-neutral-300">
            🚀 Build • Share • Discover
          </span>

          <h1
            className={cn(
              "text-4xl font-extrabold tracking-tight text-white md:text-6xl"
            )}
          >
            Discover &
            <span className="block bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Trendy Projects
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm text-neutral-400 md:text-base">
            Explore real-world projects built with Next.js, Tailwind CSS,
            Framer Motion, and modern tooling. Learn, remix, and ship faster.
          </p>

          {/* Search */}
          <div className="mt-10 w-full max-w-xl">
            <SearchForm query={query} />
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {query? (<h2 className="text-2xl font-semibold text-gray-900">
              Showing results for:{" "}
              <span className="font-medium text-gray-800">
                “{query}”
              </span>
            </h2>) : ( <h2 className="text-2xl font-semibold text-gray-900">
              🔥 Trending Projects
            </h2>) }
           
          </div>

          <button className="text-sm font-medium text-indigo-600 hover:underline">
            View all
          </button>
        </div>

        {/* Content */}
        {posts?.length > 0 ? (
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post : any) => (
              <li key={post._id}>
                <ThreeDCardDemo {...post} post={post}/>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
            <p className="text-lg font-medium text-gray-700">
              No projects found
            </p>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Try a different keyword or clear the search to explore all
              projects.
            </p>
          </div>
        )}
      </section>

      <SanityLive />
    </>
  );
}

