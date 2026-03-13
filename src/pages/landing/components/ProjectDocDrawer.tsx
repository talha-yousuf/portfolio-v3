import { useEffect, useState, useRef } from "react";
import { X, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mermaid from "mermaid";

const MermaidBlock = ({ code }: { code: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "default" });
    const id = `mermaid-${Math.random().toString(36).slice(2)}`;
    mermaid
      .render(id, code)
      .then(({ svg }) => setSvg(svg))
      .catch(() => setError(true));
  }, [code]);

  if (error)
    return <pre style={{ color: "#f87171", fontSize: 12 }}>{code}</pre>;
  if (!svg)
    return (
      <div style={{ opacity: 0.4, fontSize: 12 }}>Rendering diagram...</div>
    );
  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ overflowX: "auto" }}
    />
  );
};

const ProjectDocDrawer = ({
  docUrl,
  open,
  onClose,
}: {
  docUrl: string;
  open: boolean;
  onClose: () => void;
}) => {
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!open || !docUrl) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMarkdown("");
    setLoading(true);
    setError(false);

    fetch(docUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => {
        setMarkdown("");
        setLoading(false);
        setError(true);
      });
  }, [open, docUrl]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 1001,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "90vw",
          background: "#ffffff",
          borderLeft: "1px solid #e5e7eb",
          zIndex: 1002,
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: open ? "-8px 0 40px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid #e5e7eb",
            flexShrink: 0,
            background: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#374151",
            }}
          >
            <FileText size={16} />
            <span style={{ fontSize: 13, fontWeight: 500 }}>Documentation</span>
          </div>

          <button
            onClick={onClose}
            style={{
              color: "#6b7280",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
              background: "none",
              border: "none",
              padding: 4,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <X size={16} />
          </button>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "32px 36px",
            background: "#ffffff",
            color: "#111827",
          }}
        >
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[100, 80, 90, 60, 75, 85, 50].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 12,
                    width: `${w}%`,
                    borderRadius: 4,
                    background:
                      "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s ease infinite",
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          )}

          {error && (
            <div style={{ color: "#6b7280", fontSize: 13 }}>
              Failed to load documentation.
            </div>
          )}

          {!loading && !error && markdown && (
            <div style={{ fontSize: 14, lineHeight: 1.8, color: "#111827" }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children }) {
                    const lang = /language-(\w+)/.exec(className || "")?.[1];
                    const code = String(children).trim();
                    if (lang === "mermaid") return <MermaidBlock code={code} />;
                    return (
                      <code
                        style={{
                          background: "#f3f4f6",
                          color: "#1f2937",
                          padding: "2px 6px",
                          borderRadius: 3,
                          fontSize: 12,
                          fontFamily: "monospace",
                        }}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre({ children }) {
                    return (
                      <pre
                        style={{
                          background: "#f9fafb",
                          border: "1px solid #e5e7eb",
                          padding: 16,
                          borderRadius: 6,
                          overflowX: "auto",
                          fontSize: 12,
                          fontFamily: "monospace",
                          margin: "16px 0",
                        }}
                      >
                        {children}
                      </pre>
                    );
                  },
                  h1: ({ children }) => (
                    <h1
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        marginBottom: 12,
                        color: "#111827",
                        borderBottom: "none",
                      }}
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        marginTop: 32,
                        marginBottom: 12,
                        color: "#1f2937",
                        borderBottom: "none",
                      }}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginTop: 24,
                        marginBottom: 8,
                        color: "#374151",
                        borderBottom: "none",
                      }}
                    >
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        marginTop: 24,
                        marginBottom: 8,
                        color: "#374151",
                        borderBottom: "none",
                      }}
                    >
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p style={{ marginBottom: 14, color: "#374151" }}>
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#2563eb", textDecoration: "underline" }}
                    >
                      {children}
                    </a>
                  ),
                  hr: () => (
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid #e5e7eb",
                        margin: "24px 0",
                      }}
                    />
                  ),
                  ul: ({ children }) => (
                    <ul
                      style={{
                        paddingLeft: 30,
                        listStyleType: "disc",
                        marginBottom: 14,
                        color: "#374151",
                      }}
                    >
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol
                      style={{
                        paddingLeft: 30,
                        listStyleType: "decimal",
                        marginBottom: 14,
                        color: "#374151",
                      }}
                    >
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li style={{ marginBottom: 6 }}>{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote
                      style={{
                        borderLeft: "3px solid #d1d5db",
                        paddingLeft: 14,
                        margin: "16px 0",
                        color: "#6b7280",
                      }}
                    >
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div style={{ overflowX: "auto", margin: "16px 0" }}>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontSize: 13,
                        }}
                      >
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th
                      style={{
                        background: "#f3f4f6",
                        padding: "8px 12px",
                        textAlign: "left",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: 600,
                      }}
                    >
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td
                      style={{
                        padding: "8px 12px",
                        borderBottom: "1px solid #f3f4f6",
                      }}
                    >
                      {children}
                    </td>
                  ),
                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt}
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        margin: "0 2px",
                      }}
                    />
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDocDrawer;
