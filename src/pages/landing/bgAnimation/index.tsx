import { useTheme } from "../../../theme/useTheme";
import Aurora from "./Aurora";
import InfiniteGradient from "./InfiniteGradient";
import SoftAurora from "./SoftAurora";

export default function BgAnimation({ type }: { type: number }) {
  const { t } = useTheme();

  const elements = [
    <Aurora
      colorStops={[t.accent, t.accent, t.accent]}
      blend={1}
      amplitude={0.7}
      speed={1}
    />,
    <SoftAurora
      speed={0.6}
      scale={1.5}
      brightness={1}
      color1={t.accent}
      color2={t.text}
      noiseFrequency={2.5}
      noiseAmplitude={1}
      bandHeight={0.5}
      bandSpread={1}
      octaveDecay={0.1}
      layerOffset={0}
      colorSpeed={1}
      enableMouseInteraction
      mouseInfluence={0.25}
    />,
    <InfiniteGradient colors={[t.bgSecondary, t.accent + "70"]} />,
  ];
  return type > -1 ? elements[type] : null;
}
