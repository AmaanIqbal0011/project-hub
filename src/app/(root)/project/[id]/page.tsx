import { Metadata } from "next";
import { Boxes } from "@/components/ui/background-boxes";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  PROJECT_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { formateDate, getAbsoluteImageUrl } from "@/lib/utils";
import Views from "@/components/Views";
import { ThreeDCardDemo } from "@/components/threeDCard";
import { urlFor } from "@/sanity/lib/sanityImage";
import { Calendar, User, ExternalLink, Share2, Heart } from "lucide-react";

const md = markdownit();
export const experimental_ppr = true;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const id = (await params).id;

  const post = await client.fetch(PROJECT_BY_ID_QUERY, { id });

  if (!post) {
    return {};
  }

  const { title, description, imageUrl, author, category, _createdAt } = post;
  const absoluteImageUrl = getAbsoluteImageUrl(imageUrl);

  return {
    title: `${title} | Project Hub`,
    description: description || `Learn about ${title} - a featured project on Project Hub built with Next.js and modern web technologies.`,
    keywords: [
      'Next.js',
      'project',
      category,
      title,
      'web development',
      'open source',
      author?.name || 'author',
      'tutorial'
    ],
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://nextjs-project-hub.vercel.app/project/${id}`,
      title: `${title} | Project Hub`,
      description: description || `Learn about ${title} - a featured project on Project Hub built with Next.js and modern web technologies.`,
      siteName: "Project Hub",
      authors: [author?.name || 'Unknown Author'],
      publishedTime: _createdAt,
      tags: [category, 'Next.js', 'web development', 'open source'],
      images: absoluteImageUrl ? [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : [
        {
          url: "https://nextjs-project-hub.vercel.app/og-article-default.jpg", // Default image if no project image
          width: 1200,
          height: 630,
          alt: "Default Project Hub Article Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Project Hub`,
      description: description || `Learn about ${title} - a featured project on Project Hub built with Next.js and modern web technologies.`,
      images: absoluteImageUrl ? [absoluteImageUrl] : ["https://nextjs-project-hub.vercel.app/twitter-article-default.jpg"],
      creator: author?.username ? `@${author.username}` : "@projecthub",
    },
    alternates: {
      canonical: `https://nextjs-project-hub.vercel.app/project/${id}`,
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

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPost }] = await Promise.all([
    client.fetch(PROJECT_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);

  if (!post) return notFound();

  const {
    _id,
    title,
    description,
    imageUrl,
    author,
    category,
    vercelLink,
    _createdAt,
    details,
  } = post;

  const parsedContent = md.render(details || "");
  const imageurl = imageUrl ? urlFor(imageUrl) : undefined;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-slate-950 px-6">
        <div className="pointer-events-none absolute inset-0 z-20 [mask-image:radial-gradient(circle_at_center,transparent_30%,black)]" />
        <Boxes />

        <div className="relative z-30 mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs text-neutral-300">
            {formateDate(_createdAt)}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm text-neutral-400 md:text-base line-clamp-3">
            {description}
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        {/* Cover */}
        {imageUrl && (
          <div className="relative mb-12 overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={title}
              width={1200}
              height={700}
              priority
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Author + Category + Vercel */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href={`/user/${author?._id}`} className="flex items-center gap-4 group">
            {author?.image ? (
              <Image
                src={author.image}
                alt={author.name || "Author"}
                width={56}
                height={56}
                className="rounded-full object-cover shadow-lg ring-2 ring-white/10 group-hover:ring-indigo-500/50 transition-all"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xl font-bold text-white shadow-lg ring-2 ring-white/10">
                {author?.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {author?.name}
              </p>
              <p className="text-sm text-neutral-500">@{author?.username}</p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-300">
              {category}
            </span>

            {vercelLink && (
              <Link
                href={vercelLink}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-white/20 bg-white dark:bg-white/5 px-5 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Link>
            )}
          </div>
        </div>

        {/* Markdown */}
        {parsedContent ? (
         <article
  className="
    prose prose-lg max-w-none
    prose-headings:scroll-mt-24
    prose-headings:font-extrabold
    prose-h2:text-3xl
    prose-h3:text-2xl
    prose-p:text-neutral-700
    prose-strong:text-black
    prose-a:text-indigo-600 prose-a:font-semibold
    prose-blockquote:border-l-indigo-500
    prose-blockquote:bg-indigo-50
    prose-blockquote:px-6 prose-blockquote:py-4
    prose-blockquote:rounded-xl
    prose-img:rounded-2xl prose-img:shadow-xl
    leading-relaxed
    bg-white/70 backdrop-blur
    p-8 rounded-3xl shadow-sm
  "
  dangerouslySetInnerHTML={{ __html: parsedContent }}
/>

        ) : (
          <p className="text-center text-gray-500">No details provided.</p>
        )}

        <hr className="my-20 border-neutral-200" />

        {/* ================= EDITOR PICKS ================= */}
       {editorPost?.length > 0 && (
  <section className="mx-auto mt-32 max-w-7xl">

    {/* Header */}
    <div className="mb-16 text-center">
      <span className="text-sm font-semibold tracking-widest text-indigo-500">
        CURATED
      </span>

      <h2 className="mt-3 text-4xl font-extrabold tracking-tight">
        ✨ Editor Picks
      </h2>

      <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
        Top projects selected by our editors for quality, creativity & impact.
      </p>

      <div className="mx-auto mt-6 h-[3px] w-28 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
    </div>

    {/* Cards */}
    <ul className="grid grid-cols-1 gap-40 sm:grid-cols-2 lg:grid-cols-3">
      {editorPost.map((item: any) => (
        <li
          key={item._id}
          className="
            group relative
            transition-all duration-300
            hover:-translate-y-3
          "
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-xl opacity-0 group-hover:opacity-100 transition" />

          <div className="relative">
            <ThreeDCardDemo {...item}  post={item} />
          </div>
        </li>
      ))}
    </ul>
  </section>
)}
      </section>

      {/* ================= VIEWS ================= */}
      <Suspense fallback={null}>
        <Views id={id} />
      </Suspense>
    </>
  );
};

export default Page;