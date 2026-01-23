import { auth } from "@/auth";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import UserProjects from "@/components/UserProjects";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[360px_1fr]">
        {/* ================= PROFILE CARD ================= */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 shadow-xl">
            {/* Decorative Icons */}
            <Icon className="absolute -top-3 -left-3 h-6 w-6 text-black dark:text-white" />
            <Icon className="absolute -top-3 -right-3 h-6 w-6 text-black dark:text-white" />
            <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white" />
            <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white" />

            {/* Avatar */}
            <EvervaultCard
              text={`@${user.username}`}
              imageUrl={user.image}
              
            />

            {/* User Info */}
            <div className="mt-6 text-center space-y-2">
  {/* Name */}
  <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
    {user.name}
  </h2>

  {/* Username */}
  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
    @{user.username}
  </p>

  {/* Bio */}
  {user.bio && (
    <p className="mx-auto mt-2 max-w-xs rounded-full border border-black/10 dark:border-white/10 px-4 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300">
      {user.bio}
    </p>
  )}
</div>
          </div>
        </div>

        {/* ================= PROJECTS ================= */}
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight text-black dark:text-white">
              {session?.id === id ? "Your Projects" : "All Projects"}
            </h3>
          </div>

          {/* Projects Grid */}
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-2">
            <Suspense
              fallback={
                <p className="text-sm text-neutral-500">Loading projects…</p>
              }
            >
              <UserProjects id={id} />
            </Suspense>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default page;
