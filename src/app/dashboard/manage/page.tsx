"use client";

import Link from "next/link";
import { AuthGuard } from "@/components/ui/AuthGuard";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { citationId } from "@/lib/paperDisplay";
import { useSession } from "@/lib/auth-client";
import { useMyPapers } from "@/hooks/useMyPapers";
import { useDeletePaper } from "@/hooks/usePaperActions";

export default function ManagePapersPage() {
  return (
    <AuthGuard>
      <ManageContent />
    </AuthGuard>
  );
}

function ManageContent() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";

  return (
    <Container className="py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold text-ink">Manage papers</h1>
        {isAdmin && (
          <Link href="/admin" className="text-[13px] font-medium text-navy hover:underline">
            Go to admin panel →
          </Link>
        )}
      </div>

      <MyPapersTable />
    </Container>
  );
}

function MyPapersTable() {
  const { data, isLoading } = useMyPapers();
  const deletePaper = useDeletePaper();

  if (isLoading) return <TableSkeleton />;

  if (!data || data.papers.length === 0) {
    return (
      <EmptyState message="You haven't submitted any papers yet." ctaLabel="Submit your first paper" ctaHref="/papers/add" />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-parchment-line bg-white">
      <table className="w-full text-left text-[13px]">
        <thead className="border-b border-parchment-line bg-parchment/50 text-[11px] uppercase tracking-wide text-ink-faint">
          <tr>
            <th className="px-4 py-3 font-medium">Paper</th>
            <th className="px-4 py-3 font-medium">Field</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Views</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.papers.map((paper) => (
            <tr key={paper._id} className="border-b border-parchment-line last:border-0">
              <td className="px-4 py-3">
                <div className="font-mono text-[11px] text-ink-faint">[{citationId(paper._id)}]</div>
                <div className="font-medium text-ink">{paper.title}</div>
                {paper.status === "rejected" && paper.rejectionReason && (
                  <div className="mt-0.5 text-[11px] text-red-600">Reason: {paper.rejectionReason}</div>
                )}
              </td>
              <td className="px-4 py-3 text-ink-muted">{paper.field}</td>
              <td className="px-4 py-3"><StatusBadge status={paper.status} /></td>
              <td className="px-4 py-3 text-ink-muted">{paper.views}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  {paper.status === "approved" && (
                    <Link href={`/papers/${paper._id}`} className="text-navy hover:underline">View</Link>
                  )}
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${paper.title}"? This can't be undone.`)) {
                        deletePaper.mutate(paper._id);
                      }
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ message, ctaLabel, ctaHref }: { message: string; ctaLabel?: string; ctaHref?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-parchment-line py-16 text-center">
      <p className="mb-4 text-[14px] text-ink-faint">{message}</p>
      {ctaLabel && ctaHref && <Button href={ctaHref}>{ctaLabel}</Button>}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-lg bg-parchment-line/60" />
      ))}
    </div>
  );
}