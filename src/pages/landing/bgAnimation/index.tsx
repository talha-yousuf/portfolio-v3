import { useTheme } from "../../../theme/useTheme";
import Aurora from "./Aurora";
import SoftAurora from "./SoftAurora";

export default function BgAnimation({ type }: { type: number }) {
  const { t } = useTheme();

  const elements = [
    <Aurora
      colorStops={[t.bgSecondary, t.accent, t.text]}
      blend={0.5}
      amplitude={1.0}
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
  ];
  return type > -1 ? elements[type] : null;
}
