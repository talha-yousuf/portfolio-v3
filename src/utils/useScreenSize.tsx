import { useState, useEffect } from "react";

const getSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isLandscape = width > height;

  return {
    width,
    height,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024 && isLandscape,
  };
};

export function useScreenSize() {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handler = () => setSize(getSize());

    window.addEventListener("resize", handler);
    screen.orientation?.addEventListener("change", handler); // catches phone rotation

    return () => {
      window.removeEventListener("resize", handler);
      screen.orientation?.removeEventListener("change", handler);
    };
  }, []);

  return size;
}
