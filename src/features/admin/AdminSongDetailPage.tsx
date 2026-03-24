import { useCallback, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useContentStore } from "@/data";
import { VideoEmbed, JianpuEditor } from "@/shared/ui";
import { updateSong, deleteSong } from "@/data/api";
import type { Song } from "@/shared/types";

export function AdminSongDetailPage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const songs = useContentStore((s) => s.songs);
  const refreshSongs = useContentStore((s) => s.refreshSongs);

  const song = useMemo(
    () => songs.find((s) => s.id === songId),
    [songId, songs],
  );

  // Editable fields
  const [titleEnglish, setTitleEnglish] = useState(song?.titleEnglish ?? "");
  const [titleChinese, setTitleChinese] = useState(song?.titleChinese ?? "");
  const [titleVietnamese, setTitleVietnamese] = useState(song?.titleVietnamese ?? "");
  const [key, setKey] = useState(song?.key ?? "D");
  const [timeSignature, setTimeSignature] = useState(song?.timeSignature ?? "4/4");
  const [tempo, setTempo] = useState(song?.tempo?.toString() ?? "");
  const [origin, setOrigin] = useState(song?.origin ?? "");
  const [description, setDescription] = useState(song?.description ?? "");
  const [videoUrls, setVideoUrls] = useState<string[]>(
    song?.videoUrls?.length ? song.videoUrls : song?.videoUrl ? [song.videoUrl] : [""],
  );
  const [levelId, setLevelId] = useState(song?.levelId?.toString() ?? "1");
  const [jianpu, setJianpu] = useState(song?.jianpu ?? "");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleJianpuChange = useCallback((value: string) => {
    setJianpu(value);
    setSaved(false);
  }, []);

  // Track if anything changed
  const hasChanges = song
    ? titleEnglish !== song.titleEnglish ||
      titleChinese !== (song.titleChinese ?? "") ||
      titleVietnamese !== (song.titleVietnamese ?? "") ||
      key !== song.key ||
      timeSignature !== song.timeSignature ||
      tempo !== (song.tempo?.toString() ?? "") ||
      origin !== (song.origin ?? "") ||
      description !== (song.description ?? "") ||
      JSON.stringify(videoUrls.filter(Boolean)) !== JSON.stringify(song.videoUrls ?? []) ||
      levelId !== song.levelId.toString() ||
      jianpu !== song.jianpu
    : false;

  async function handleSave() {
    if (!song) return;
    setSaving(true);
    setError("");
    try {
      await updateSong(song.id, {
        titleEnglish: titleEnglish.trim(),
        titleChinese: titleChinese.trim() || undefined,
        titleVietnamese: titleVietnamese.trim() || undefined,
        key: key.trim() || "D",
        timeSignature: timeSignature.trim() || "4/4",
        tempo: tempo ? Number(tempo) : undefined,
        origin: origin.trim() || undefined,
        description: description.trim() || undefined,
        videoUrls: videoUrls.filter((u) => u.trim()),
        levelId: Number(levelId),
        jianpu: jianpu.trim(),
      } as Partial<Song>);
      await refreshSongs();
      setSaved(true);
    } catch {
      setError("Failed to save. Are you logged in as admin?");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!song || !confirm("Delete this song permanently?")) return;
    setSaving(true);
    try {
      await deleteSong(song.id);
      await refreshSongs();
      navigate("/library");
    } catch {
      setError("Failed to delete");
      setSaving(false);
    }
  }

  if (!song) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
          Song not found
        </h1>
        <Link to="/library" className="underline hover:opacity-80" style={{ color: "var(--color-accent)" }}>
          Back to Song Library
        </Link>
      </div>
    );
  }

  const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
  const inputStyle = {
    backgroundColor: "var(--color-bg-secondary)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
  };
  const labelClass = "block text-[11px] font-medium mb-1 text-(--color-text-secondary)";

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          &larr; Back
        </button>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Editing
        </span>
      </div>

      {/* Titles */}
      <header className="mb-6">
        <div className="space-y-2">
          <div>
            <label className={labelClass}>Title (English) *</label>
            <input
              type="text"
              value={titleEnglish}
              onChange={(e) => { setTitleEnglish(e.target.value); setSaved(false); }}
              className={`${inputClass} text-xl font-bold`}
              style={inputStyle}
              placeholder="Song title"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Title (Chinese)</label>
              <input
                type="text"
                value={titleChinese}
                onChange={(e) => { setTitleChinese(e.target.value); setSaved(false); }}
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div>
              <label className={labelClass}>Title (Vietnamese)</label>
              <input
                type="text"
                value={titleVietnamese}
                onChange={(e) => { setTitleVietnamese(e.target.value); setSaved(false); }}
                className={inputClass}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Metadata row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-3">
          <div>
            <label className={labelClass}>Key</label>
            <input
              type="text"
              value={key}
              onChange={(e) => { setKey(e.target.value); setSaved(false); }}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass}>Time</label>
            <input
              type="text"
              value={timeSignature}
              onChange={(e) => { setTimeSignature(e.target.value); setSaved(false); }}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass}>Tempo</label>
            <input
              type="number"
              value={tempo}
              onChange={(e) => { setTempo(e.target.value); setSaved(false); }}
              className={inputClass}
              style={inputStyle}
              placeholder="BPM"
            />
          </div>
          <div>
            <label className={labelClass}>Level</label>
            <select
              value={levelId}
              onChange={(e) => { setLevelId(e.target.value); setSaved(false); }}
              className={inputClass}
              style={inputStyle}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>Lv.{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Origin</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => { setOrigin(e.target.value); setSaved(false); }}
              className={inputClass}
              style={inputStyle}
              placeholder="e.g. Folk"
            />
          </div>
        </div>
      </header>

      {/* Description */}
      <div className="mb-4">
        <label className={labelClass}>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => { setDescription(e.target.value); setSaved(false); }}
          className={inputClass}
          style={inputStyle}
          placeholder="Optional notes about this song"
        />
      </div>

      {/* Video URLs */}
      <div className="mb-4">
        <label className={labelClass}>Videos</label>
        <div className="space-y-2">
          {videoUrls.map((url, i) => (
            <div key={i}>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    const next = [...videoUrls];
                    next[i] = e.target.value;
                    setVideoUrls(next);
                    setSaved(false);
                  }}
                  className={`${inputClass} flex-1`}
                  style={inputStyle}
                  placeholder="https://youtube.com/..."
                />
                {videoUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setVideoUrls(videoUrls.filter((_, j) => j !== i));
                      setSaved(false);
                    }}
                    className="shrink-0 px-2 text-red-500 hover:opacity-70 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              {url.trim() && <VideoEmbed url={url} className="mt-1" />}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setVideoUrls([...videoUrls, ""])}
          className="mt-2 flex items-center gap-1 text-xs hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add video
        </button>
      </div>

      {/* Jianpu notation — always in edit mode on admin page */}
      <div className="my-4">
        <JianpuEditor
          value={jianpu}
          onChange={handleJianpuChange}
          timeSignature={timeSignature}
          alwaysEdit
        />
      </div>

      {/* Save bar */}
      <div
        className="-mx-4 mt-6 px-4 py-3 flex flex-wrap items-center gap-2 sm:gap-3 border-t"
        style={{
          backgroundColor: "var(--color-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges || !titleEnglish.trim() || !jianpu.trim()}
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity disabled:opacity-40"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
        </button>
        {hasChanges && !saved && (
          <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
            Unsaved changes
          </span>
        )}
        {saved && (
          <span className="text-xs text-green-500">Changes saved to database</span>
        )}
        {error && <span className="text-xs text-red-500">{error}</span>}
        <div className="flex-1" />
        <button
          onClick={handleDelete}
          disabled={saving}
          className="text-xs text-red-500 hover:opacity-70"
        >
          Delete Song
        </button>
      </div>
    </div>
  );
}
