import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { SongLibraryPage, SongDetailPage } from "@/features/song-library";
import { TechniqueLibraryPage, TechniqueDetailPage } from "@/features/technique-library";
import { PracticePage } from "@/features/practice-timer";

// Lazy load knowledge pages (renamed from reference)
import { ReferencePage, ReferenceDetailPage } from "@/features/reference-library";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <SongLibraryPage /> },
      { path: "song/:songId", element: <SongDetailPage /> },
      { path: "techniques", element: <TechniqueLibraryPage /> },
      { path: "techniques/:techniqueId", element: <TechniqueDetailPage /> },
      { path: "knowledge", element: <ReferencePage /> },
      { path: "knowledge/:slug", element: <ReferenceDetailPage /> },
      { path: "practice", element: <PracticePage /> },
    ],
  },
]);
