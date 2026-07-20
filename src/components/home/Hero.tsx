"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PaperCard } from "@/components/ui/PaperCard";
import { PaperGridSkeleton } from "@/components/ui/PaperCardSkeleton";
import { usePapers } from "@/hooks/usePapers";
import image from "../../../image/8_steps_-research_paper-casestudyhelp.com_.png"
import Image from "next/image";

export function Hero() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { data, isLoading } = usePapers({ sort: "newest", limit: 4 });

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/explore${search ? `?search=${encodeURIComponent(search)}` : ""}`);
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-navy max-w-7xl mx-auto my-10 md:my-16 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
        <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-6">
          <Container className="py-14 md:py-20 px-6 md:px-10 lg:px-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-light/30 bg-teal-light/10 px-3 py-1.5 font-mono text-[12px] font-medium tracking-wide text-teal-light">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-light" />
              SA — OPEN RESEARCH ARCHIVE
            </div>

            <h1 className="mb-5 max-w-xl font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.1] tracking-tight text-parchment">
              Where student research{" "}
              <span className="rounded-md bg-amber px-2 py-0.5 text-navy">
                finds its readers.
              </span>
            </h1>

            <p className="mb-9 max-w-md text-[16px] leading-relaxed text-[#B9C2CB]">
              Upload your paper, get it reviewed, and let an AI reader summarize,
              extract key points, and answer questions about it — for anyone who visits.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex w-full max-w-lg items-center gap-2 rounded-xl border border-parchment-line bg-white p-1.5 pl-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search papers by title, author, or field"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
              />
              <Button type="submit" size="md" className="shrink-0">
                Search
              </Button>
            </form>

            
          </Container>

          <div className="relative hidden h-full min-h-[420px] items-center justify-center px-8 py-10 lg:flex">
            {/* blend gradient so the image edge doesn't look pasted on */}
            <div className="pointer-events-none absolute inset-0 z-10  from-navy via-navy/10 to-transparent" />
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <Image
                src={image}
                alt="8 steps to writing a research paper"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface StatProps {
  value: string | number;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <div>
      <div className="font-display text-[22px] font-semibold text-parchment leading-none">
        {value}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-wide text-[#8A93A0]">
        {label}
      </div>
    </div>
  );
}