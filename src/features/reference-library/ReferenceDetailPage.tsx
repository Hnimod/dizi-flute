import { useParams, Link } from "react-router";
import { references } from "@/data";
import { MarkdownRenderer } from "@/shared/ui";

export function ReferenceDetailPage() {
  const { slug } = useParams();
  const doc = references.find((r) => r.slug === slug);

  if (!doc) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link
          to="/reference"
          className="inline-block text-sm hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          &larr; Back to Reference Library
        </Link>
        <h1 className="mt-4 text-2xl font-bold">Reference Not Found</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          No reference document matches "{slug}".
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/reference"
        className="inline-block text-sm hover:opacity-80"
        style={{ color: "var(--color-accent)" }}
      >
        &larr; Back to Reference Library
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-3xl">{doc.icon}</span>
        <h1 className="text-3xl font-bold">{doc.title}</h1>
      </div>

      <div className="mt-6">
        <MarkdownRenderer content={doc.content} />
      </div>
    </div>
  );
}
