import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Song, Exercise } from "@/shared/types";
import {
  createSong,
  updateSong,
  deleteSong,
  createExercise,
  updateExercise,
  deleteExercise,
} from "./api";

// ── Song mutations ──

export function useCreateSong() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Song>) => createSong(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["songs"] }),
  });
}

export function useUpdateSong() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Song> }) =>
      updateSong(id, updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["songs"] }),
  });
}

export function useDeleteSong() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSong(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["songs"] }),
  });
}

// ── Exercise mutations ──

export function useCreateExercise() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Exercise>) => createExercise(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exercises"] }),
  });
}

export function useUpdateExercise() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Exercise> }) =>
      updateExercise(id, updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exercises"] }),
  });
}

export function useDeleteExercise() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExercise(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exercises"] }),
  });
}
