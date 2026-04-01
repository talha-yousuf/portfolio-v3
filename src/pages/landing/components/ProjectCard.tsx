import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, FileText, Monitor, Image } from "lucide-react";
import { useTheme } from "../../../theme/useTheme";
import { getProjectUrls, type PortfolioDataType } from "../../../data";
import ProjectDocDrawer from "./ProjectDocDrawer";
import ProjectImageDrawer from "./ProjectImageDrawer";

const WaveformThumbnail = ({
  name,
  style = {},
}: {
  name: string;
  style?: React.CSSProperties;
}) => {
  const { t } = useTheme();

  const W = 400;
  const H = 225;

  const hashStr = (str: string): number => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  const seededRandom = (seed: number) => {
    let s = seed;
    return () => {
      s = Math.imul(1664525, s) + 1013904223;
      return (s >>> 0) / 0xffffffff;
    };
  };

  const rand = seededRandom(hashStr(name));

  const waves = Array.from({ length: 5 }, () => ({
    amplitude: 18 + rand() * 28,
    frequency: 1.2 + rand() * 3.5,
    phase: rand() * Math.PI * 2,
    opacity: 0.12 + rand() * 0.2,
    strokeWidth: 0.8 + rand() * 1.2,
  }));

  const hero = {
    amplitude: 28 + rand() * 20,
    frequency: 1.4 + rand() * 1,
    phase: rand() * Math.PI * 2,
  };

  const buildPath = (amp: number, freq: number, phase: number): string => {
    const cy = H / 2;
    const points = Array.from({ length: 121 }, (_, i) => {
      const x = (i / 120) * W;
      const y = cy + amp * Math.sin((i / 120) * Math.PI * 2 * freq + phase);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    });
    return `M ${points.join(" L ")}`;
  };

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        position: "relative",
        overflow: "hidden",
        background: t.bgSecondary,
        ...style,
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0 }}
      >
        {waves.map((w, i) => (
          <path
            key={i}
            d={buildPath(w.amplitude, w.frequency, w.phase)}
            stroke={t.accent}
            strokeWidth={w.strokeWidth}
            strokeOpacity={w.opacity}
            fill="none"
          />
        ))}

        <path
          d={buildPath(hero.amplitude, hero.frequency, hero.phase)}
          stroke={t.accent}
          strokeWidth="1.5"
          strokeOpacity="0.7"
          fill="none"
        />

        <path
          d={`${buildPath(hero.amplitude, hero.frequency, hero.phase)} L ${W},${H} L 0,${H} Z`}
          fill={t.accent}
          fillOpacity="0.04"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 30%, ${t.bg}cc 100%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

const Thumbnail = ({
  src,
  style = {},
}: {
  src: string;
  style?: React.CSSProperties;
}) => {
  const { t } = useTheme();

  const [cachedSrc, setCachedSrc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    let objectUrl: string;

    if (src) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCachedSrc("");
      setLoading(true);
      setError(false);

      setTimeout(() => {
        fetch(src)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch");
            }

            return res.blob();
          })
          .then((blob) => {
            if (!blob.type.startsWith("image/")) {
              throw new Error("Failed to fetch");
            }

            objectUrl = URL.createObjectURL(blob);

            setCachedSrc(objectUrl);
            setLoading(false);
            setError(false);
          })
          .catch(() => {
            setCachedSrc("");
            setLoading(false);
            setError(true);
          });
      }, 1000);
    } else {
      setCachedSrc("");
      setLoading(false);
      setError(true);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {loading && !error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${t.bgSecondary} 0%, ${t.accent}18 50%, ${t.bgSecondary} 100%)`,
            backgroundSize: "200% 200%",
            animation: "shimmer 2s ease infinite",
            filter: "url(#noise)",
          }}
        >
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" mode="overlay" result="blend" />
              <feComposite in="blend" in2="SourceGraphic" operator="in" />
            </filter>
          </svg>
        </div>
      )}

      {!loading && !error && (
        <>
          <img
            src={cachedSrc}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
              opacity: hovered ? 0 : 1,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {error && <WaveformThumbnail name={src} />}
    </div>
  );
};

const ProjectCard = ({
  project: projectProps,
}: {
  project: PortfolioDataType["projects"]["0"];
}) => {
  const { t } = useTheme();

  const [hovered, setHovered] = useState<boolean>(false);
  const [project, setProject] = useState<typeof projectProps>(projectProps);
  const [docDrawerOpen, setDocDrawerOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const loaded = useRef<boolean>(false);

  useEffect(() => {
    if (!loaded.current) {
      getProjectUrls(project.folderName).then((urls) => {
        setProject({
          ...project,
          docUrl: urls.doc,
          thumbnailUrl: urls.thumb,
          assetsUrls: urls.assets,
        });
        loaded.current = true;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    !project.hidden && (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? t.bgSecondary : t.bg,
          border: `1px solid ${t.text + "30"}`,
          borderRadius: 4,
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
          boxShadow: hovered ? t.shadow : "none",
          cursor: "default",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "relative" }}>
          <Thumbnail src={project.thumbnailUrl} />
          {project.featured && (
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: `${t.accent}cc`,
                backdropFilter: "blur(8px)",
                color: "#fff",
                fontSize: 10,
                letterSpacing: 2,
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 20,
              }}
            >
              Featured
            </div>
          )}
        </div>

        <div
          style={{
            padding: "24px 28px 28px",
            display: "flex",
            flexDirection: "column",
            flex: "1",
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 12,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 400,
                color: t.text,
                letterSpacing: "-0.02em",
              }}
            >
              {project.name}
            </h3>

            <div style={{ display: "flex", gap: 10, paddingTop: 3 }}>
              {[
                {
                  href: project.githubUrl,
                  Icon: Github,
                  label: "GitHub Repo",
                },
                {
                  href: project.demoUrl,
                  Icon: Monitor,
                  label: "Live Demo",
                },
                {
                  href: project.productPageUrl,
                  Icon: ExternalLink,
                  label: "Product Page",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  target="_blank"
                  key={label}
                  href={href}
                  title={label}
                  onClick={!href ? (e) => e.preventDefault() : undefined}
                  style={{
                    color: t.text,
                    opacity: href ? 0.4 : 0.2,
                    transition: "opacity 0.2s",
                    cursor: href ? "pointer" : "not-allowed",
                    pointerEvents: href ? "auto" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!href) return;
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.color = t.accent;
                  }}
                  onMouseLeave={(e) => {
                    if (!href) return;
                    e.currentTarget.style.opacity = "0.4";
                    e.currentTarget.style.color = t.text;
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div
            style={{ height: 1, background: t.bgSecondary, marginBottom: 14 }}
          />
          <p
            style={{
              margin: "0 0 20px",
              fontSize: 14,
              color: t.text,
              opacity: 0.65,
              lineHeight: 1.65,
            }}
          >
            {project.shortDescription}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 14,
            }}
          >
            {project.stack.slice(0, 10).map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 11,
                  padding: "3px 8px",
                  border: `1px solid ${t.accent}55`,
                  color: t.accent,
                  borderRadius: 2,
                  fontFamily: "monospace",
                  letterSpacing: 1,
                }}
              >
                {s}
              </span>
            ))}
            {project.stack.length > 10 && (
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 7px",
                  color: t.text,
                  opacity: 0.35,
                }}
              >
                +{project.stack.length - 10}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
              marginBottom: 14,
            }}
          >
            {project.domains.slice(0, 4).map((d) => (
              <span
                key={d}
                style={{
                  fontSize: 11,
                  padding: "2px 7px",
                  background: t.bgSecondary,
                  border: `1px solid ${t.text}55`,
                  color: t.text,
                  opacity: 0.6,
                  borderRadius: 2,
                }}
              >
                {d}
              </span>
            ))}
            {project.domains.length > 4 && (
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 7px",
                  color: t.text,
                  opacity: 0.35,
                }}
              >
                +{project.domains.length - 4}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
              minHeight: 0,
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              {[
                {
                  content: project.docUrl,
                  Icon: FileText,
                  label: "Documentation",
                  onClick: () => {
                    setDocDrawerOpen(true);
                  },
                },
                {
                  content: project.assetsUrls,
                  Icon: Image,
                  label: project.assetsUrls.length + " Images",
                  onClick: () => {
                    setGalleryOpen(true);
                  },
                },
              ].map(({ content, Icon, label, onClick }) => (
                <button
                  key={label}
                  title={label}
                  onClick={(e) => {
                    e.preventDefault();
                    onClick();
                  }}
                  style={{
                    color: t.text,
                    opacity: content && content.length ? 0.8 : 0.7,
                    transition: "opacity 0.2s",
                    cursor:
                      content && content.length ? "pointer" : "not-allowed",
                    pointerEvents: content && content.length ? "auto" : "none",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 12,
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (content && content.length) {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.color = t.accent;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (content && content.length) {
                      e.currentTarget.style.opacity = "0.4";
                      e.currentTarget.style.color = t.text;
                    }
                  }}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <ProjectDocDrawer
          docUrl={project.docUrl}
          open={docDrawerOpen}
          onClose={() => setDocDrawerOpen(false)}
        />
        <ProjectImageDrawer
          urls={project.assetsUrls}
          open={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      </div>
    )
  );
};

export default ProjectCard;
