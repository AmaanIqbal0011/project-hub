"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EvervaultCardProps {
  text?: string;
  imageUrl?: string;
  className?: string;
}

export const EvervaultCard = ({
  text,
  imageUrl,
  className,
}: EvervaultCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");
  const lastUpdate = useRef(0);

  useEffect(() => {
    setRandomString(generateRandomString(1200));
  }, []);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const now = Date.now();
    if (now - lastUpdate.current < 80) return; // throttle

    lastUpdate.current = now;

    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);

    setRandomString(generateRandomString(800));
  }

  return (
    <div
      className={cn(
        "relative aspect-square w-full flex items-center justify-center",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center"
      >
        <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />

        {/* Avatar */}
        <div className="relative z-10 h-44 w-44 rounded-full overflow-hidden flex items-center justify-center shadow-xl">
          <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md" />

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="profile"
              fill
              className="object-cover z-10"
            />
          ) : (
            <span className="z-10 text-3xl font-bold text-black dark:text-white">
              {text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

function CardPattern({ mouseX, mouseY, randomString }: any) {
  const maskImage = useMotionTemplate`
    radial-gradient(280px at ${mouseX}px ${mouseY}px, white, transparent)
  `;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 opacity-0 group-hover/card:opacity-100 transition duration-500"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      />

      <motion.pre
        className="absolute inset-0 text-xs font-mono text-white opacity-0 group-hover/card:opacity-60 break-words p-4"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        {randomString}
      </motion.pre>
    </div>
  );
}

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateRandomString(length: number) {
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

/* Decorative Icon */
export const Icon = ({ className, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);
