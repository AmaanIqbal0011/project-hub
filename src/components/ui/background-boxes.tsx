"use client";
import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const COLORS = [
  "#93c5fd",
  "#f9a8d4",
  "#86efac",
  "#fde047",
  "#fca5a5",
  "#d8b4fe",
  "#93c5fd",
  "#a5b4fc",
  "#c4b5fd",
];

const BOX_COUNT = 40;

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const boxes = useMemo(
    () =>
      Array.from({ length: BOX_COUNT }, (_, index) => ({
        id: index,
        color: COLORS[index % COLORS.length],
        rotation: (index % 4) * 5,
      })),
    [],
  );

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      <motion.div
        className="grid h-full w-full max-w-5xl grid-cols-8 gap-2"
        animate={{
          rotate: [0, 1.25, -1.25, 0],
          scale: [1, 1.02, 0.98, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      >
        {boxes.map((box) => (
          <motion.div
            key={`box-${box.id}`}
            className="relative h-12 w-full rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_120px_rgba(15,23,42,0.45)] backdrop-blur"
            initial={{ opacity: 0.6 }}
            animate={{
              opacity: [0.6, 0.95, 0.7, 0.9],
              backgroundColor: box.color,
              rotate: box.rotation,
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
