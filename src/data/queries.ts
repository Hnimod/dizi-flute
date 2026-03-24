import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Song, Exercise } from "@/shared/types";
import { fetchSongs, fetchExercises } from "./api";
import { buildLevels } from "./levels";

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

export function useLevels() {
  const { data: songs, isLoading: songsLoading } = useSongs();
  const { data: exercises, isLoading: exercisesLoading } = useExercises();
  const isLoading = songsLoading || exercisesLoading;
  const levels = useMemo(
    () => (songs && exercises ? buildLevels(songs, exercises) : []),
    [songs, exercises],
  );
  return { levels, isLoading };
}
