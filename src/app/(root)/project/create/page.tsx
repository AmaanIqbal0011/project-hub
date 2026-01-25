import { auth } from "@/auth";
import ProjectForm from "@/components/ProjectForm";
import { redirect } from "next/navigation";
import React from "react";

const Create = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <>
      {/* HERO / HEADER */}
      <section className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-900">
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Submit Your Project 🚀
          </h1>
          <p className="mt-3 text-sm text-neutral-300 sm:text-base">
            Share what you&apos;ve built with the community. Add details, links, and
            screenshots to showcase your work.
          </p>
        </div>
      </section>

      {/* FORM CONTAINER */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 shadow-xl sm:p-10">
          <ProjectForm />
        </div>
      </section>
    </>
  );
};

export default Create;
