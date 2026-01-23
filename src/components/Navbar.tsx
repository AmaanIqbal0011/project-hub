import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

interface NavBarProps {
  session?: {
    user?: {
      name?: string | null;
    };
    id?: string;
  } | null;
}

const NavBar = async () => {
  const session :NavBarProps['session'] = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5XOLQHgVRT3Cbyz2O1Bi4B-5uFByrLjHocQ&s"
            alt="Logo"
            width={140}
            height={36}
            priority
          />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              {/* Create Button */}
              <Link
                href="/project/create"
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 max-sm:hidden"
              >
                + Create Project
              </Link>

              {/* User Profile */}
              <Link
                href={`/user/${session.id}`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-100"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium max-sm:hidden">
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
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:text-black"
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
                className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Login with GitHub
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
