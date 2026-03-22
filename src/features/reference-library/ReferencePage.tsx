import { Link } from "react-router";
import { references } from "@/data";

export function ReferencePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Reference Library</h1>
        <p className="mt-1.5 text-sm text-(--color-text-secondary) md:mt-2 md:text-base">
          Quick-reference documents for fingerings, notation, ornamentation, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
        {references.map((doc) => (
          <Link
            key={doc.slug}
            to={`/reference/${doc.slug}`}
            className="group rounded-xl border border-(--color-border) bg-(--color-bg-secondary) p-4 shadow-sm transition-all hover:border-(--color-accent) hover:shadow-md active:scale-[0.98] md:p-5"
          >
            <span className="text-2xl">{doc.icon}</span>
            <h2 className="mt-2.5 text-base font-semibold group-hover:text-(--color-accent) md:mt-3 md:text-lg">
              {doc.title}
            </h2>
            <p className="mt-1 text-sm text-(--color-text-secondary) leading-snug">
              {doc.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
