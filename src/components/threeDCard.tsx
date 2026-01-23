"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";



interface ThreeDCardDemoProps {
  post: {
    title: string;
    description?: string;
    slug: { current: string };
    image?: string;
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

export function ThreeDCardDemo({ post }: ThreeDCardDemoProps ) {
  const {
    _id,
    title,
    description,
    image,
    author,
    category,
    views,
  } = post;

  return (
    <CardContainer className="inter-var">
      <CardBody
        className="
          relative w-[22rem] rounded-2xl border 
          bg-gray-100 dark:bg-black
          border-neutral-200 dark:border-white/10
          p-5
          transition-all
          hover:shadow-2xl hover:shadow-emerald-500/10
        "
      >
        {/* Category + Views */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-00 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            {category || "Project"}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            👁 {views ?? 0}
          </span>
        </div>

        {/* Title */}
        <CardItem
          translateZ="40"
          className="text-lg font-semibold text-neutral-800 dark:text-white line-clamp-1"
        >
          {title}
        </CardItem>

        {/* Description */}
        <CardItem
          as="p"
          translateZ="50"
          className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2"
        >
          {description}
        </CardItem>

        {/* Image */}
        <CardItem translateZ="100" className="mt-4">
          <Link href={`/project/${_id}`}>
            <Image
              src={image || "https://placehold.co/600x400"}
              width={600}
              height={400}
              alt={title}
              className="
                h-44 w-full rounded-xl object-cover
                transition-transform duration-300
                group-hover/card:scale-[1.02]
              "
            />
          </Link>
        </CardItem>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          {/* Author */}
          <CardItem
            translateZ={20}
            as={Link}
            href={`/user/${author?._id}`}
            className="flex flex-col text-xs text-neutral-600 dark:text-neutral-300"
          >
            <span className="font-medium">{author?.name}</span>
            <span className="text-neutral-400">@{author?.username}</span>
          </CardItem>

          {/* CTA */}
          <CardItem translateZ={30}>
            <Link
              href={`/project/${_id}`}
              className="
                inline-flex items-center gap-1
                rounded-lg bg-black px-4 py-2
                text-xs font-semibold text-white
                dark:bg-white dark:text-black
                hover:opacity-90 transition
              "
            >
              View Details →
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
