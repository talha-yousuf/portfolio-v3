import { useEffect, useState } from "react";
import { useTheme } from "../../../utils/useTheme";
import BgAnimation from "../bgAnimation";
import portFolioData from "../../../data";
import { useScreenSize } from "../../../utils/useScreenSize";

const PHRASES = ["init...", "loading assets...", "compiling..."];

const TOTAL_DURATION = 1000; // ms

interface SplashScreenProps {
  children?: React.ReactNode;
}

const hasVisited = () => sessionStorage.getItem("hasVisited");
const markVisited = () => sessionStorage.setItem("hasVisited", "true");

const SplashScreen: React.FC<SplashScreenProps> = (props) => {
  const { t } = useTheme();
  const { isDesktop } = useScreenSize();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressIntervalTime = TOTAL_DURATION / 100;

    const bar = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100; // stop at 100%
        return p + 1;
      });
    }, progressIntervalTime);

    return () => {
      clearInterval(bar);
    };
  }, []);

  useEffect(() => {
    if (progress <= 100) markVisited();
  }, [progress]);

  const show = () => progress < 100 && !hasVisited();

  return show() ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        zIndex: 1004,
        background: t.bg,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            top: 0,
            left: 0,
            zIndex: 1005,
            opacity: 0.5,
          }}
        >
          <BgAnimation type={0} />
        </div>

        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            bottom: 0,
            left: 0,
            zIndex: 1006,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: isDesktop ? "400px" : "70%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                margin: 0,
                lineHeight: 1.1,
                background: t.text,
                color: t.bg,
                borderRadius: "100%",
                padding: "1rem",
                marginBottom: 64,
              }}
            >
              {portFolioData.personalInfo.name
                .split(" ")
                .map((x) => x.charAt(0))
                .join("")}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "monospace",
                fontSize: 16,
                color: t.text,
                letterSpacing: ".12em",
                width: "100%",
              }}
            >
              <span>
                {PHRASES.map((x, i) => {
                  const gap = Math.floor(100 / PHRASES.length);
                  const enter = gap * i < progress;
                  const exit = gap * (i + 1) < progress;
                  return (
                    enter &&
                    !exit && (
                      <div style={{ animation: "fadeUp 0.25s ease forwards" }}>
                        {"> "}
                        {x}
                      </div>
                    )
                  );
                })}
              </span>
              <span>{progress}%</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 8,
                background: t.text + 50,
                overflow: "hidden",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: t.text + 90,
                  backgroundSize: "300% auto",
                  animation: "barGlow 1s linear infinite",
                  transition: "width .08s linear",
                  borderRadius: 8,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    props.children
  );
};

export default SplashScreen;
