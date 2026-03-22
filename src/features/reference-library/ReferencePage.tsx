import { Link } from "react-router";
import { references } from "@/data";

export function ReferencePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reference Library</h1>
        <p className="mt-2 text-(--color-text-secondary)">
          Quick-reference documents for fingerings, notation, ornamentation, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {references.map((doc) => (
          <Link
            key={doc.slug}
            to={`/reference/${doc.slug}`}
            className="group rounded-xl border border-(--color-border) p-5 transition-all hover:border-(--color-accent) hover:shadow-md"
          >
            <span className="text-2xl">{doc.icon}</span>
            <h2 className="mt-3 text-lg font-semibold group-hover:text-(--color-accent)">
              {doc.title}
            </h2>
            <p className="mt-1 text-sm text-(--color-text-secondary)">
              {doc.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
