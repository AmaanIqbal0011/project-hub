import { client } from '@/sanity/lib/client';
import { PROJECT_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import { ThreeDCardDemo } from './threeDCard';

const UserProjects = async ({ id }: { id: string }) => {
  const projects = await client.fetch(PROJECT_BY_AUTHOR_QUERY, { id });

  if (!projects || projects.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center mb-4">
          📂
        </div>
        <h3 className="text-lg font-semibold">No Projects Found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
          This user hasn&apos;t published any projects yet.
        </p>
      </div>
    );
  }

  return (
    <>
      {projects.map((post: any) => (
        <li key={post._id} className="list-none flex justify-center">
          <ThreeDCardDemo post={post} />
        </li>
      ))}
    </>
  );
};

export default UserProjects;
