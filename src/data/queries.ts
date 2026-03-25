import { useQuery } from "@tanstack/react-query";
import type { Song, Exercise } from "@/shared/types";
import { fetchSongs, fetchExercises } from "./api";

export function useSongs() {
  return useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: () => fetchSongs(),
    staleTime: 30_000,
  });
}

export function useExercises() {
  return useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: () => fetchExercises(),
    staleTime: 30_000,
  });
}
