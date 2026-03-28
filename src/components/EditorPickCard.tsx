"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, ExternalLink, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/sanityImage";

interface EditorPickCardProps {
  post: {
    _id: string;
    title: string;
    description?: string;
    slug?: { current: string };
    imageUrl?: { asset?: { url: string } };
    vercelLink?: string;
    author?: {
      name: string;
      username: string;
      _id: string;
      image?: string;
    };
    views: number;
    category: string;
    _createdAt: string;
  };
  variant?: "featured" | "compact";
}

export function EditorPickCard({ post, variant = "compact" }: EditorPickCardProps) {
  const { _id, title, description, imageUrl, author, category, views, vercelLink } = post;
  const imageurl = imageUrl ? urlFor(imageUrl) : undefined;

  if (variant === "featured") {
    return (
      <Link href={`/project/${_id}`} className="group relative block h-full">
        <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20">
          {/* Image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
            <Image
              src={imageurl || "https://placehold.co/800x600"}
              width={800}
              height={600}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Badge */}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/90 px-3 py-1 text-xs font-bold text-amber-950 backdrop-blur-sm">
                ⭐ Editor&apos;s Pick
              </span>
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {category}
              </span>
            </div>

            {/* Bottom overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <h3 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl line-clamp-2 mb-2 group-hover:text-indigo-200 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-white/70 line-clamp-2 max-w-lg mb-4">
                {description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {author?.image ? (
                    <Image
                      src={author.image}
                      alt={author.name || "Author"}
                      width={32}
                      height={32}
                      className="rounded-full object-cover ring-2 ring-white/20"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-bold text-white ring-2 ring-white/20">
                      {author?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">{author?.name}</p>
                    <p className="text-xs text-white/50">@{author?.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-white/60">
                    <Eye className="h-3.5 w-3.5" />
                    {views?.toLocaleString() ?? 0}
                  </span>
                  {vercelLink && (
                    <a
                      href={vercelLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/project/${_id}`} className="group block">
      <div className="flex gap-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-3 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-500/30">
        {/* Thumbnail */}
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
          <Image
            src={imageurl || "https://placehold.co/200x200"}
            width={200}
            height={200}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between py-0.5 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">
                {category}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-neutral-500">
                <Eye className="h-3 w-3" />
                {views?.toLocaleString() ?? 0}
              </span>
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {title}
            </h4>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-neutral-400 line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-[8px] font-bold text-white">
                {author?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-[11px] font-medium text-gray-600 dark:text-neutral-300">
                {author?.name}
              </span>
            </div>

            <ArrowUpRight className="h-4 w-4 text-gray-400 dark:text-neutral-500 transition-all group-hover:text-indigo-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
