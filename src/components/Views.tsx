import { client } from "@/sanity/lib/client";
import { PROJECT_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { Eye } from "lucide-react";

const Views = async ({ id }: { id: string }) => {
  const { views } = await client
    .withConfig({ useCdn: false })
    .fetch(PROJECT_VIEWS_QUERY, { id });

  await writeClient.patch(id).set({ views: views + 1 }).commit();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="group relative flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-white shadow-lg backdrop-blur-xl transition hover:scale-105 hover:shadow-2xl">
        {/* Glow */}
        <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 blur-xl opacity-40 group-hover:opacity-70 transition" />

        {/* Icon */}
        <Eye className="h-5 w-5 text-indigo-400" />

        {/* Count */}
        <span className="text-sm font-semibold tracking-wide">
          {views?.toLocaleString()}
        </span>

        {/* Label (hidden on mobile) */}
        <span className="hidden sm:inline text-xs text-neutral-300">
          views
        </span>
      </div>
    </div>
  );
};

export default Views;
