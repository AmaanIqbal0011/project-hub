"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { urlFor } from "@/sanity/lib/sanityImage";
import { Eye, ExternalLink } from "lucide-react";

interface ThreeDCardDemoProps {
  post: {
    title: string;
    description?: string;
    slug: { current: string };
    imageUrl?: { asset?: { url: string } };
    vercelLink?: string;
    author?: {
      name: string;
      username: string;
      _id: string;
    };
    _id: string;
    _createdAt: string;
    views: number;
    category: string;
  };
}

export function ThreeDCardDemo({ post }: ThreeDCardDemoProps) {
  const { _id, title, description, imageUrl, author, category, views, vercelLink } = post;

const imageurl = imageUrl ? urlFor(imageUrl) : undefined;

  return (
    <CardContainer className="inter-var">
      <CardBody
        className="
          relative w-full max-w-[22rem] rounded-3xl border 
          bg-white dark:bg-white/5
          border-gray-200 dark:border-white/10
          p-4 sm:p-5
          transition-all duration-300
          hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20
          group
        "
      >
        {/* Image */}
        <CardItem translateZ="100" className="relative mb-4">
          <Link href={`/project/${_id}`}>
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={imageurl || "https://placehold.co/600x400"}
                width={600}
                height={400}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>
        </CardItem>

        {/* Content */}
        <div className="space-y-3">
          {/* Category + Views */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
              {category || "Project"}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-neutral-500">
              <Eye className="h-3.5 w-3.5" />
              {views?.toLocaleString() ?? 0}
            </div>
          </div>

          {/* Title */}
          <CardItem
            translateZ="40"
            as={Link}
            href={`/project/${_id}`}
            className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {title}
          </CardItem>

          {/* Description */}
          <CardItem
            as="p"
            translateZ="50"
            className="text-sm text-gray-500 dark:text-neutral-400 line-clamp-2"
          >
            {description}
          </CardItem>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            {/* Author */}
            <CardItem
              translateZ={20}
              as={Link}
              href={`/user/${author?._id}`}
              className="flex items-center gap-2 text-xs text-gray-600 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-[10px] font-semibold text-white">
                {author?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{author?.name}</span>
            </CardItem>

            {/* CTA */}
            <CardItem translateZ={30} className="flex items-center gap-2">
            <Link
              href={`/project/${_id}`}
              className="inline-flex items-center gap-1 rounded-full bg-gray-900 dark:bg-white px-4 py-2 text-xs font-semibold text-white dark:text-gray-900 hover:scale-105 transition-transform"
            >
              View
            </Link>

            {vercelLink && (
              <Link
                href={vercelLink}
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-white/20 p-2 text-gray-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}