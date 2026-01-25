import { Boxes } from "@/components/ui/background-boxes";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, PROJECT_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { formateDate } from "@/lib/utils";
import Views from "@/components/Views";
import { ThreeDCardDemo } from "@/components/threeDCard";

const md = markdownit();
export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

const [post , {select : editorPost}] = await Promise.all([
  client.fetch(PROJECT_BY_ID_QUERY , {id}),
  client.fetch(PLAYLIST_BY_SLUG_QUERY , {slug : 'editor-picks'}),

]);

 const {
    _id,
    title,
    description,
    image,
    author,
    category,
    views,
  } = post;


  if (!post) return notFound();

  const parsedContent = md.render(post?.details || "");

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-slate-950 px-6">
        <div className="pointer-events-none absolute inset-0 z-20 [mask-image:radial-gradient(circle_at_center,transparent_30%,black)]" />
        <Boxes />

        <div className="relative z-30 mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs text-neutral-300">
            {formateDate(post._createdAt)}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            {post.title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm text-neutral-400 md:text-base line-clamp-3">
            {post.description}
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        {/* Cover Image */}
        <div className="relative mb-12 overflow-hidden rounded-2xl">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={700}
            priority
            className="w-full object-cover"
          />
        </div>

        {/* Author + Category */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <Link
            href={`/user/${author?._id}`}
            className="flex items-center gap-4"
          >
          {post.author?.image && (
  <Image
    src={post.author.image}
    alt={post.author.name || "Author"}
    width={56}
    height={56}
    className="rounded-full drop-shadow-lg object-cover"
  />
)}

            <div>
              <p className="text-lg font-semibold text-gray-900">
                {post?.author?.name}
              </p>
              <p className="text-sm text-gray-500">
                @{post?.author?.username}
              </p>
            </div>
          </Link>

          <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600">
            {post.category}
          </span>
        </div>

        {/* Markdown */}
        {parsedContent ? (
          <article
            className="
              prose 
              prose-lg 
              max-w-none 
              font-work-sans 
              prose-headings:scroll-mt-24
              prose-a:text-indigo-600
              prose-img:rounded-xl
            "
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        ) : (
          <p className="text-center text-gray-500">
            No details provided.
          </p>
        )}

        {/* Divider */}
        <hr className="my-16 border-gray-200" />


      {editorPost?.length > 0 && (
  <section className="mx-auto mt-24 max-w-6xl">

    {/* Header */}
    <div className="mb-12 text-center">
      <h2 className="text-4xl font-extrabold tracking-tight">
        ✨ Editor Picks
      </h2>
      <p className="mt-3 text-sm text-neutral-500">
        Hand-picked projects curated by our editors
      </p>

      {/* Gradient divider */}
      <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
    </div>

    {/* Cards */}
    <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {editorPost.map((post: any) => (
        <li
          key={post._id}
          className="transition-all duration-300 hover:-translate-y-2"
        >
          <ThreeDCardDemo {...post} post={post} />
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
