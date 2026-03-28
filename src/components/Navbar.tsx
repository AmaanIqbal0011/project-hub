import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

interface NavBarProps {
  session?: {
    user?: {
      name?: string | null;
      id:string
    };
    id?: string;
  } | null;
}

const NavBar = async () => {
  const session :NavBarProps['session'] = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
            P
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white max-sm:hidden">ProjectHub</span>
        </Link>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          {session?.user ? (
            <>
              {/* Create Button */}
              <Link
                href="/project/create"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              >
                + Create Project
              </Link>

              {/* User Profile */}
              <Link
                href={`/user/${session.user.id}`}
                className="flex items-center gap-3 rounded-full bg-gray-100 dark:bg-white/5 px-3 py-2 transition hover:bg-gray-200 dark:hover:bg-white/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {session.user.name}
                </span>
              </Link>

              {/* Logout */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="rounded-full px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-neutral-300 transition hover:text-gray-900 dark:hover:text-white"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              >
                Login with GitHub
              </button>
            </form>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNav session={session} />
      </nav>
    </header>
  );
};

export default NavBar;
