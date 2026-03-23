import { useState } from "react";
import { useSongLibraryStore } from "./store";

export function AddSongForm({ onClose }: { onClose: () => void }) {
  const addSong = useSongLibraryStore((s) => s.addSong);
  const [titleEnglish, setTitleEnglish] = useState("");
  const [titleChinese, setTitleChinese] = useState("");
  const [titleVietnamese, setTitleVietnamese] = useState("");
  const [key, setKey] = useState("C");
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [tempo, setTempo] = useState("");
  const [jianpu, setJianpu] = useState("");
  const [description, setDescription] = useState("");
  const [origin, setOrigin] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titleEnglish.trim() || !jianpu.trim()) return;

    addSong({
      titleEnglish: titleEnglish.trim(),
      titleChinese: titleChinese.trim() || undefined,
      titleVietnamese: titleVietnamese.trim() || undefined,
      key: key.trim() || "C",
      timeSignature: timeSignature.trim() || "4/4",
      tempo: tempo ? Number(tempo) : undefined,
      jianpu: jianpu.trim(),
      description: description.trim() || undefined,
      origin: origin.trim() || undefined,
    });
    onClose();
  }

  const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none";
  const inputStyle = {
    backgroundColor: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">
            Title (English) *
          </label>
          <input
            type="text"
            value={titleEnglish}
            onChange={(e) => setTitleEnglish(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="Song title"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Origin</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="e.g. Chinese folk"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">
            Title (Chinese)
          </label>
          <input
            type="text"
            value={titleChinese}
            onChange={(e) => setTitleChinese(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">
            Title (Vietnamese)
          </label>
          <input
            type="text"
            value={titleVietnamese}
            onChange={(e) => setTitleVietnamese(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Key</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Time</label>
          <input
            type="text"
            value={timeSignature}
            onChange={(e) => setTimeSignature(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Tempo</label>
          <input
            type="number"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="BPM"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">
          Jianpu Notation *
        </label>
        <textarea
          value={jianpu}
          onChange={(e) => setJianpu(e.target.value)}
          className={`${inputClass} font-mono`}
          style={{ ...inputStyle, minHeight: "120px" }}
          placeholder={`1 2 3 4 | 5 - - - |\n5 3 2 1 | 6 - - - ||`}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-(--color-text-secondary)">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          style={inputStyle}
          placeholder="Optional notes about this song"
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!titleEnglish.trim() || !jianpu.trim()}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-40"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Add Song
        </button>
      </div>
    </form>
  );
}
