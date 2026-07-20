import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Paper } from "@/types";

export interface CreatePaperInput {
  title: string;
  abstract: string;
  authors: string;
  field: string;
  file: File;
}

export function useCreatePaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePaperInput) => {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("abstract", input.abstract);
      formData.append("authors", input.authors);
      formData.append("field", input.field);
      formData.append("file", input.file);
      return api.post<{ paper: Paper }>("/api/papers", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["papers", "mine"] });
      queryClient.invalidateQueries({ queryKey: ["papers"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function useDeletePaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paperId: string) => api.delete(`/api/papers/${paperId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["papers", "mine"] });
      queryClient.invalidateQueries({ queryKey: ["papers"] });
    },
  });
}