import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { references } from "@/data";
import { MarkdownRenderer, extractHeadings, type HeadingEntry } from "@/shared/ui";

function TableOfContents({ headings }: { headings: HeadingEntry[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.slug ?? null);

  useEffect(() => {
    if (headings.length === 0) return;
    const ids = headings.map((h) => h.slug);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        let topId: string | null = null;
        let topY = Number.POSITIVE_INFINITY;
        for (const id of visible.keys()) {
          const el = document.getElementById(id);
          if (!el) continue;
          const y = el.getBoundingClientRect().top;
          if (y < topY) {
            topY = y;
            topId = id;
          }
        }
        if (topId) setActive(topId);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: [0, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-4 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2"
    >
      <p
        className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-text-secondary)" }}
      >
        On this page
      </p>
      <ul className="space-y-1 border-l" style={{ borderColor: "var(--color-border)" }}>
        {headings.map((h) => {
          const isActive = h.slug === active;
          return (
            <li key={h.slug}>
              <a
                href={`#${h.slug}`}
                onClick={(e) => {
                  const el = document.getElementById(h.slug);
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", `#${h.slug}`);
                    setActive(h.slug);
                  }
                }}
                className={`block border-l-2 py-1 text-sm leading-snug transition-colors ${
                  h.level === 3 ? "pl-6" : "pl-3"
                } ${isActive ? "font-medium" : "hover:opacity-80"}`}
                style={{
                  marginLeft: "-1px",
                  borderColor: isActive ? "var(--color-accent)" : "transparent",
                  color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ReferenceDetailPage() {
  const { slug } = useParams();
  const doc = references.find((r) => r.slug === slug);

  const headings = useMemo(
    () => (doc ? extractHeadings(doc.content) : []),
    [doc],
  );

  if (!doc) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link
          to="/knowledge"
          className="inline-block text-sm hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          &larr; Back to Knowledge
        </Link>
        <h1 className="mt-4 text-xl font-bold md:text-2xl">Reference Not Found</h1>
        <p className="mt-2 text-sm text-(--color-text-secondary) md:text-base">
          No reference document matches "{slug}".
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-10">
      <article className="min-w-0 max-w-3xl">
        <Link
          to="/knowledge"
          className="inline-block text-sm hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          &larr; Back to Knowledge
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl md:text-3xl">{doc.icon}</span>
          <h1 className="text-2xl font-bold md:text-3xl">{doc.title}</h1>
        </div>

        <div className="mt-5 md:mt-6">
          <MarkdownRenderer content={doc.content} />
        </div>
      </article>

      <aside className="hidden lg:block">
        <TableOfContents headings={headings} />
      </aside>
    </div>
  );
}
