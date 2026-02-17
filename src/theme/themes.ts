import {
  Gem,
  Moon,
  Flame,
  Leaf,
  Waves,
  Stars,
  Sun,
  type LucideIcon,
} from "lucide-react";

export const themes: {
  name: string;
  bg: string;
  text: string;
  accent: string;
  bgSecondary: string;
  shadow: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Cobalt",
    bg: "#020c1b",
    text: "#e8e8ea",
    accent: "#f56038",
    bgSecondary: "#0F2747",
    shadow: "0 12px 34px rgba(0,0,0,0.55)",
    icon: Flame,
  },
  {
    name: "Amethyst",
    bg: "#0c0812",
    text: "#F5EDFF",
    accent: "#B26BFF",
    bgSecondary: "#1A1226",
    shadow: "0 12px 32px rgba(0,0,0,0.55)",
    icon: Gem,
  },
  {
    name: "Indigo",
    bg: "#140A2A",
    text: "#F8FAFF",
    accent: "#FF4D6D",
    bgSecondary: "#20103D",
    shadow: "0 12px 32px rgba(0,0,0,0.5)",
    icon: Stars,
  },

  {
    name: "Emerald",
    bg: "#041712",
    text: "#ECFFF8",
    accent: "#19D38A",
    bgSecondary: "#0A2A22",
    shadow: "0 12px 32px rgba(0,0,0,0.55)",
    icon: Leaf,
  },
  {
    name: "Oceanic",
    bg: "#0A1220",
    text: "#F1F6FF",
    accent: "#4FD1FF",
    bgSecondary: "#121C2E",
    shadow: "0 12px 32px rgba(0,0,0,0.5)",
    icon: Waves,
  },
  {
    name: "Midnight",
    bg: "#02030A",
    text: "#F5F7FF",
    accent: "#7C83FF",
    bgSecondary: "#0C1022",
    shadow: "0 12px 36px rgba(0,0,0,0.75)",
    icon: Moon,
  },
  {
    name: "Light",
    bg: "#F7F9FC",
    text: "#111318",
    accent: "#2563EB",
    bgSecondary: "#FFFFFF",
    shadow: "0 10px 24px rgba(0,0,0,0.08)",
    icon: Sun,
  },
];
