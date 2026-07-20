import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Paper } from "@/types";

export interface AdminStats {
  totalPapers: number;
  pending: number;
  approved: number;
  rejected: number;
  totalUsers: number;
  fieldBreakdown: { field: string; count: number }[];
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => api.get<AdminStats>("/api/admin/stats"),
  });
}

export function usePendingPapers() {
  return useQuery({
    queryKey: ["papers", "pending"],
    queryFn: () => api.get<{ papers: Paper[] }>("/api/admin/papers/pending"),
  });
}

export function useAllPapersAdmin(status: string, page: number) {
  return useQuery({
    queryKey: ["admin", "papers", status, page],
    queryFn: () =>
      api.get<{ papers: Paper[]; pagination: { total: number; page: number; totalPages: number } }>(
        `/api/admin/papers?status=${status}&page=${page}&limit=15`
      ),
  });
}

export function useApprovePaper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paperId: string) => api.patch(`/api/admin/papers/${paperId}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["papers"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function useRejectPaper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ paperId, reason }: { paperId: string; reason: string }) =>
      api.patch(`/api/admin/papers/${paperId}/reject`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["papers"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}