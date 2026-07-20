"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bars, Xmark } from "@gravity-ui/icons";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

const loggedOutLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const loggedInLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/papers/add", label: "Add paper" },
  { href: "/dashboard/manage", label: "Manage papers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";
  const links = session
    ? isAdmin
      ? [...loggedInLinks, { href: "/admin", label: "Admin panel" }]
      : loggedInLinks
    : loggedOutLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-parchment-line bg-white">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold text-navy" onClick={() => setMobileOpen(false)}>
          ScholarAI
        </Link>

        <nav className="hidden items-center gap-7 text-[16px] font-medium text-ink-muted md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "text-amber-dark" : "hover:text-navy transition-colors"}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-parchment-line" />
          ) : session ? (
            <>
              <span className="hidden text-[15px] font-medium text-ink-muted sm:inline">{session.user.name}</span>
              <Button
                variant="ghost"
                size="md"
                onClick={async () => {
                  await signOut();
                  router.push("/");
                  router.refresh();
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="md" href="/login">
                Log in
              </Button>
              <Button variant="primary" size="md" href="/register">
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-navy md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <Xmark width={22} height={22} /> : <Bars width={22} height={22} />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-parchment-line bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2.5 text-[15px] font-medium ${pathname === link.href ? "bg-navy/5 text-amber-dark" : "text-ink-muted"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-parchment-line pt-3">
              {isPending ? null : session ? (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={async () => {
                    await signOut();
                    setMobileOpen(false);
                    router.push("/");
                    router.refresh();
                  }}
                >
                  Log out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="md" href="/login" onClick={() => setMobileOpen(false)}>
                    Log in
                  </Button>
                  <Button variant="primary" size="md" href="/register" onClick={() => setMobileOpen(false)}>
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}