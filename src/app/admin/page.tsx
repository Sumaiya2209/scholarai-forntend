"use client";

import Link from "next/link";
import { FileText, Clock, CircleCheck, CircleXmark, Persons } from "@gravity-ui/icons";
import { AuthGuard } from "@/components/ui/AuthGuard";
import { Container } from "@/components/ui/Container";
import { PapersByFieldChart } from "@/components/paper/PapersByFieldChart";
import { useAdminStats } from "@/hooks/useAdminPapers";

export default function AdminPage() {
  return (
    <AuthGuard requireAdmin>
      <AdminOverview />
    </AuthGuard>
  );
}

function AdminOverview() {
  const { data, isLoading } = useAdminStats();

  const cards = [
    { label: "Total papers", value: data?.totalPapers, icon: FileText, color: "text-navy" },
    { label: "Pending review", value: data?.pending, icon: Clock, color: "text-amber-dark" },
    { label: "Approved", value: data?.approved, icon: CircleCheck, color: "text-teal" },
    { label: "Rejected", value: data?.rejected, icon: CircleXmark, color: "text-red-600" },
    { label: "Registered users", value: data?.totalUsers, icon: Persons, color: "text-navy" },
  ];

  return (
    <Container className="py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="mb-1 font-display text-3xl font-semibold text-ink">Admin panel</h1>
          <p className="text-[13px] text-ink-faint">Platform overview and moderation tools.</p>
        </div>
        <Link
          href="/admin/papers"
          className="rounded-md bg-navy px-4 py-2.5 text-[13px] font-medium text-parchment hover:bg-navy-dark transition-colors"
        >
          Manage all papers →
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border border-parchment-line bg-white p-4">
            <c.icon width={18} height={18} className={c.color} />
            <div className="mt-2 font-display text-2xl font-semibold text-ink">
              {isLoading ? "—" : c.value}
            </div>
            <div className="text-[11.5px] text-ink-faint">{c.label}</div>
          </div>
        ))}
      </div>

      {data && data.pending > 0 && (
        <Link
          href="/admin/papers?status=pending"
          className="mb-8 flex items-center justify-between rounded-lg border border-amber/30 bg-amber/10 px-4 py-3 text-[13px] text-amber-dark hover:bg-amber/15 transition-colors"
        >
          <span>
            <strong>{data.pending}</strong> paper{data.pending !== 1 ? "s" : ""} waiting for review
          </span>
          <span>Review now →</span>
        </Link>
      )}

      <PapersByFieldChart />
    </Container>
  );
}