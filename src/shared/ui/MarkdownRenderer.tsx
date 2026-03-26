import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { JianpuRenderer } from "./jianpu/JianpuRenderer";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const components: Components = {
  code({ className, children, ...props }) {
    const isJianpu = className?.includes("jianpu");
    const isBlock = String(children).includes("\n");

    if (isJianpu) {
      return (
        <div
          className="rounded-lg p-4 overflow-x-auto my-4"
          style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
        >
          <JianpuRenderer content={String(children).trim()} />
        </div>
      );
    }

    if (isBlock) {
      return (
        <pre
          className="rounded-lg p-4 overflow-x-auto text-sm my-4"
          style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
        >
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    }

    return (
      <code
        className="rounded px-1.5 py-0.5 text-sm"
        style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-accent)" }}
        {...props}
      >
        {children}
      </code>
    );
  },
  h1({ children }) {
    return <h1 className="text-3xl font-bold mb-4 mt-6" style={{ color: "var(--color-text)" }}>{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="text-2xl font-bold mb-3 mt-5" style={{ color: "var(--color-text)" }}>{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="text-xl font-semibold mb-2 mt-4" style={{ color: "var(--color-text)" }}>{children}</h3>;
  },
  p({ children }) {
    return <p className="mb-3 leading-relaxed" style={{ color: "var(--color-text)" }}>{children}</p>;
  },
  ul({ children }) {
    return <ul className="list-disc pl-6 mb-3 space-y-1" style={{ color: "var(--color-text)" }}>{children}</ul>;
  },
  ol({ children }) {
    return <ol className="list-decimal pl-6 mb-3 space-y-1" style={{ color: "var(--color-text)" }}>{children}</ol>;
  },
  blockquote({ children }) {
    return (
      <blockquote
        className="pl-4 my-3 italic"
        style={{ borderLeft: "3px solid var(--color-accent)", color: "var(--color-text-secondary)" }}
      >
        {children}
      </blockquote>
    );
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm" style={{ borderColor: "var(--color-border)" }}>
          {children}
        </table>
      </div>
    );
  },
  th({ children }) {
    return (
      <th
        className="text-left px-3 py-2 font-semibold"
        style={{ borderBottom: "2px solid var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}
      >
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="px-3 py-2" style={{ borderBottom: "1px solid var(--color-border)" }}>
        {children}
      </td>
    );
  },
  a({ href, children }) {
    return (
      <a href={href} className="underline hover:opacity-80" style={{ color: "var(--color-accent)" }}>
        {children}
      </a>
    );
  },
};

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
