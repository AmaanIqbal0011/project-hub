import { Metadata } from "next";
import SearchForm from "@/components/SearchForm";
import { ThreeDCardDemo } from "@/components/threeDCard";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { PROJECT_QUERY, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth";
import { TrendingUp, ArrowRight, Award } from "lucide-react";
import { EditorPickCard } from "@/components/EditorPickCard";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ query?: string }> }): Promise<Metadata> {
  const query = (await searchParams).query;

  const title = query
    ? `Search Results for "${query}" | Project Hub`
    : "Project Hub - Discover & Share Next.js Projects";

  const description = query
    ? `Discover Next.js projects matching "${query}". Browse real-world examples and find inspiration for your next project.`
    : "Discover and share amazing Next.js projects. Browse real-world examples, learn from code, and showcase your creations.";

  const keywords = query
    ? ['Next.js', 'projects', 'development', query, 'web development']
    : ['Next.js', 'projects', 'development', 'web development', 'open source', 'tutorials'];

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: query
        ? `https://nextjs-project-hub.vercel.app/?query=${encodeURIComponent(query)}`
        : "https://nextjs-project-hub.vercel.app/",
      title,
      description,
      siteName: "Project Hub",
      images: [
        {
          url: query
            ? `https://nextjs-project-hub.vercel.app/api/og?query=${encodeURIComponent(query)}`
            : "https://nextjs-project-hub.vercel.app/og-image.jpg", // Replace with your actual OG image
          width: 1200,
          height: 630,
          alt: query ? `Search Results for ${query} | Project Hub` : "Project Hub - Discover & Share Next.js Projects",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [query
        ? `https://nextjs-project-hub.vercel.app/api/og?query=${encodeURIComponent(query)}`
        : "https://nextjs-project-hub.vercel.app/twitter-image.jpg"], // Replace with your actual Twitter image
    },
    alternates: {
      canonical: query
        ? `https://nextjs-project-hub.vercel.app/?query=${encodeURIComponent(query)}`
        : "https://nextjs-project-hub.vercel.app/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();

  const [{ data: posts }, { data: editorPicks }] = await Promise.all([
    sanityFetch({ query: PROJECT_QUERY, params }),
    sanityFetch({ query: PLAYLIST_BY_SLUG_QUERY, params: { slug: "editor-picks" } }),
  ]);

  const editorPickPosts = editorPicks?.select ?? [];

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

      {/* ================= EDITOR PICKS ================= */}
      {editorPickPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          {/* Section Header */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <span className="rounded-full bg-amber-100 dark:bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                  Curated
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Editor&apos;s Picks
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                Hand-picked projects by our team for outstanding quality & creativity
              </p>
            </div>
          </div>

          {/* Featured Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            {/* Featured Card - first item */}
            <div className="lg:col-span-3">
              <EditorPickCard post={editorPickPosts[0]} variant="featured" />
            </div>

            {/* Compact Cards - remaining items */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              {editorPickPosts.slice(1, 4).map((post: typeof editorPickPosts[number]) => (
                <EditorPickCard key={post._id} post={post} variant="compact" />
              ))}
            </div>
          </div>

          {/* Extra picks row (5th onward) */}
          {editorPickPosts.length > 4 && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {editorPickPosts.slice(4, 7).map((post: typeof editorPickPosts[number]) => (
                <EditorPickCard key={post._id} post={post} variant="compact" />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Divider */}
      {editorPickPosts.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        </div>
      )}

      {/* ================= PROJECTS ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {query ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Search Results
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                  Showing results for "{query}"
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Trending Projects
                  </h2>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                  Discover what developers are building
                </p>
              </>
            )}
          </div>

          <button className="group flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 transition hover:text-indigo-500 dark:hover:text-indigo-300">
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Content */}
        {posts?.length > 0 ? (
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post : any) => (
              <li key={post._id}>
                <ThreeDCardDemo {...post} post={post}/>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-3xl mb-4">
              🔍
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              No projects found
            </p>
            <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-neutral-400">
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

