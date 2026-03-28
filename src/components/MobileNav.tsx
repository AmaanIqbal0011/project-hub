"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "@/auth";
import { Menu, X, Plus, User, LogOut, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface MobileNavProps {
  session: {
    user?: {
      name?: string | null;
      id: string;
    };
  } | null;
}

export function MobileNav({ session }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white transition hover:bg-white/10"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl dark:bg-slate-950/95">
          <div className="flex flex-col items-center justify-center gap-8 pt-24">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 text-lg font-medium text-white"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            {session?.user ? (
              <>
                <Link
                  href="/project/create"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                  Create Project
                </Link>
                <Link
                  href={`/user/${session.user.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-lg font-medium text-white"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-lg font-medium text-white"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:scale-105"
              >
                Login with GitHub
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}