import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { HomePage } from "@/features/course-navigation";
import { LevelPage } from "@/features/lesson-viewer";
import { ReferencePage, ReferenceDetailPage } from "@/features/reference-library";
import { PracticePage } from "@/features/practice-timer";
import { SongLibraryPage, SongDetailPage } from "@/features/song-library";
import { AdminLoginPage } from "@/features/auth";
import { AdminSongDetailPage } from "@/features/admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "level/:id", element: <LevelPage /> },
      { path: "reference", element: <ReferencePage /> },
      { path: "reference/:slug", element: <ReferenceDetailPage /> },
      { path: "practice", element: <PracticePage /> },
      { path: "library", element: <SongLibraryPage /> },
      { path: "library/:songId", element: <SongDetailPage /> },
      { path: "admin/login", element: <AdminLoginPage /> },
      { path: "admin/song/:songId", element: <AdminSongDetailPage /> },
    ],
  },
]);
