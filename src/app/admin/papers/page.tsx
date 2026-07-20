"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthGuard } from "@/components/ui/AuthGuard";
import { Container } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Pagination } from "@/components/ui/Pagination";
import { citationId } from "@/lib/paperDisplay";
import { useAllPapersAdmin, useApprovePaper, useRejectPaper } from "@/hooks/useAdminPapers";
import { useDeletePaper } from "@/hooks/usePaperActions";
import { PaperStatus } from "@/types";

type FilterStatus = "all" | PaperStatus;

const STATUS_TABS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function AdminPapersPage() {
  return (
    <AuthGuard requireAdmin>
      <Suspense fallback={<Container className="py-10">Loading…</Container>}>
        <AdminPapersContent />
      </Suspense>
    </AuthGuard>
  );
}

function AdminPapersContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<FilterStatus>((searchParams.get("status") as FilterStatus) || "all");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAllPapersAdmin(status, page);
  const approvePaper = useApprovePaper();
  const rejectPaper = useRejectPaper();
  const deletePaper = useDeletePaper();

  function handleStatusChange(value: FilterStatus) {
    setStatus(value);
    setPage(1);
  }

  return (
    <Container className="py-10">
      <h1 className="mb-6 font-display text-3xl font-semibold text-ink">Manage all papers</h1>

      <div className="mb-6 flex gap-1 border-b border-parchment-line">
        {STATUS_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => handleStatusChange(t.value)}
            className={`px-4 py-2.5 text-[13px] font-medium transition-colors ${
              status === t.value ? "border-b-2 border-amber text-ink" : "text-ink-faint hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-parchment-line/60" />
          ))}
        </div>
      ) : !data || data.papers.length === 0 ? (
        <div className="rounded-lg border border-dashed border-parchment-line py-16 text-center">
          <p className="text-[14px] text-ink-faint">No papers in this category.</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border border-parchment-line bg-white">
            <table className="w-full text-left text-[13px]">
              <thead className="border-b border-parchment-line bg-parchment/50 text-[11px] uppercase tracking-wide text-ink-faint">
                <tr>
                  <th className="px-4 py-3 font-medium">Paper</th>
                  <th className="px-4 py-3 font-medium">Submitted by</th>
                  <th className="px-4 py-3 font-medium">Field</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.papers.map((paper) => (
                  <tr key={paper._id} className="border-b border-parchment-line last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-mono text-[11px] text-ink-faint">[{citationId(paper._id)}]</div>
                      <div className="font-medium text-ink">{paper.title}</div>
                    </td>
                    <td className="px-4 py-3 text-ink-muted">
                      {typeof paper.uploadedBy === "object" ? paper.uploadedBy.name : "—"}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{paper.field}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={paper.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3">
                        {paper.status === "approved" && (
                          <Link href={`/papers/${paper._id}`} className="text-navy hover:underline">
                            View
                          </Link>
                        )}
                        {paper.status === "pending" && (
                          <>
                            <button
                              onClick={() => approvePaper.mutate(paper._id)}
                              disabled={approvePaper.isPending}
                              className="text-teal hover:underline"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt("Reason for rejection (optional):") || "";
                                rejectPaper.mutate({ paperId: paper._id, reason });
                              }}
                              className="text-amber-dark hover:underline"
                            >
                              Reject
                            </button>
                          </>
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

          <Pagination page={page} totalPages={data.pagination.totalPages} onPageChange={setPage} />
        </>
      )}
    </Container>
  );
}