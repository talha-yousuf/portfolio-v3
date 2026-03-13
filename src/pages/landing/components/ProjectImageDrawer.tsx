import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLinkIcon } from "lucide-react";

const isImage = (url: string) =>
  /\.(png|jpe?g|gif|webp|svg|bmp)(\?.*)?$/i.test(url);

const isVideo = (url: string) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

const ProjectImageDrawer = ({
  urls,
  open,
  onClose,
}: {
  urls: string[];
  open: boolean;
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + urls.length) % urls.length);
  }, [urls.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % urls.length);
  }, [urls.length]);

  useEffect(() => {
    // Reset on close
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrent(0);
      setZoom(1);
      setImgLoaded(false);
      setImgError(false);
    } else {
      const isNotPreviewable =
        !isImage(urls[current]) && !isVideo(urls[current]);

      // On image change
      if (isNotPreviewable) {
        setImgLoaded(true);
        setImgError(false);
        setZoom(1);
      } else {
        setImgLoaded(false);
        setImgError(false);
        setZoom(1);
      }
    }
  }, [open, current, urls]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, prev, next, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll to zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.min(4, Math.max(1, z - e.deltaY * 0.001)));
  };

  return (
    <>
    

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 1002,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1003,
          display: "flex",
          flexDirection: "column",
          background: "rgba(5, 5, 10, 0.97)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Static noise overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            opacity: 0.6,
            pointerEvents: "none",
            animation: "staticNoise 0.08s steps(1) infinite",
            zIndex: 0,
          }}
        />

        {/* Header */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            flexShrink: 0,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              fontFamily: "monospace",
            }}
          >
            {urls.length > 0 ? `${current + 1} / ${urls.length}` : "—"}
          </span>

          <div style={{ display: "flex", gap: "5px" }}>
            <a
              href={urls[current]}
              target="_blank"
              style={{
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                padding: 4,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              <ExternalLinkIcon size={18} />
            </a>

            <button
              onClick={onClose}
              style={{
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                padding: 4,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image area */}
        <div
          onWheel={handleWheel}
          style={{
            flex: 1,
            minHeight: 0,
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Loader */}
          {!imgLoaded && !imgError && (
            <div
              style={{
                position: "absolute",
                inset: "10%",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {/* Shimmer layer */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s ease infinite",
                }}
              />
              {/* Static noise on loader */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
                  backgroundSize: "128px 128px",
                  animation: "staticNoise 0.1s steps(1) infinite",
                  mixBlendMode: "overlay",
                }}
              />
              {/* Blur vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
                }}
              />
              {/* Skeleton lines */}
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {[60, 40].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: 8,
                      width: `${w}%`,
                      borderRadius: 4,
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s ease infinite",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {urls[current] && (
            <>
              {isImage(urls[current]) && (
                <img
                  key={`${open}-${urls[current]}`}
                  src={urls[current]}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  style={{
                    maxWidth: "90%",
                    maxHeight: "90%",
                    objectFit: "contain",
                    borderRadius: 6,
                    transform: `scale(${zoom})`,
                    transformOrigin: "center center",
                    transition: imgLoaded ? "transform 0.1s ease" : "none",
                    opacity: imgLoaded ? 1 : 0,
                    boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                    cursor: zoom > 1 ? "grab" : "default",
                  }}
                />
              )}

              {isVideo(urls[current]) && (
                <video
                  key={`${open}-${urls[current]}`}
                  src={urls[current]}
                  controls
                  onLoadedData={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  style={{
                    maxWidth: "90%",
                    maxHeight: "90%",
                    borderRadius: 6,
                    opacity: imgLoaded ? 1 : 0,
                    boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                  }}
                />
              )}

              {!isImage(urls[current]) && !isVideo(urls[current]) && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span
                    style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}
                  >
                    This file cannot be previewed.
                  </span>
                  <a
                    href={urls[current]}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 13,
                      textDecoration: "underline",
                    }}
                  >
                    Open in new tab
                  </a>
                </div>
              )}
            </>
          )}

          {imgError && (
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
              Failed to load image.
            </div>
          )}

          {/* Prev button */}
          {urls.length > 1 && (
            <button
              onClick={prev}
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                padding: "10px 8px",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s, color 0.2s",
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next button */}
          {urls.length > 1 && (
            <button
              onClick={next}
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                padding: "10px 8px",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s, color 0.2s",
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Dot indicators */}
        {urls.length > 1 && (
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              gap: 6,
              padding: "16px 24px",
              flexShrink: 0,
            }}
          >
            {urls.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === current ? "#fff" : "rgba(255,255,255,0.25)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.2s ease, background 0.2s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectImageDrawer;
