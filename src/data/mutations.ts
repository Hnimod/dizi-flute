// Stub mutations — admin editing will be re-wired when backend is ready
/* eslint-disable @typescript-eslint/no-explicit-any */

function stubMutation() {
  return {
    mutateAsync: async (..._args: any[]) => { throw new Error("API not connected"); },
    isPending: false,
  };
}

export function useCreateSong() { return stubMutation(); }
export function useUpdateSong() { return stubMutation(); }
export function useDeleteSong() { return stubMutation(); }
export function useCreateExercise() { return stubMutation(); }
export function useUpdateExercise() { return stubMutation(); }
export function useDeleteExercise() { return stubMutation(); }
