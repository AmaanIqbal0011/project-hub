"use client";

import Link from "next/link";
import { Github, Twitter, Heart } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#" },
    { label: "Templates", href: "#" },
    { label: "Showcase", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
  ],
  community: [
    { label: "Discord", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Twitter", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-white/5">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial_gradient(ellipse_at_bottom,rgba(99,102,241,0.08),transparent_50%)] dark:bg-[radial_gradient(ellipse_at_bottom,rgba(99,102,241,0.15),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/25">
                P
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">ProjectHub</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-gray-500 dark:text-neutral-400">
              Discover and share amazing Next.js projects. Learn, remix, and ship faster.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-neutral-400 transition hover:bg-gray-300 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-neutral-400 transition hover:bg-gray-300 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Product</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-neutral-400 transition hover:text-gray-900 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-neutral-400 transition hover:text-gray-900 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Community</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-neutral-400 transition hover:text-gray-900 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-neutral-400 transition hover:text-gray-900 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 dark:border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            © {new Date().getFullYear()} ProjectHub. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-neutral-500">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}