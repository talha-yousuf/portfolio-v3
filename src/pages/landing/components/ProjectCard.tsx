import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Link,
  useDisclosure,
} from "@heroui/react";
import { Github, MonitorPlay, Package, FileText, X } from "lucide-react";
import data from "../../../data";
import { useTheme } from "../../../theme/useTheme";

const useSlideshow = (images: string[], interval = 2800) => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.4 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [images.length]);

  useEffect(() => {
    if (!active || images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, images.length, interval]);

  return { index, cardRef };
};

export default function ProjectCard({
  projectData,
}: {
  projectData: (typeof data.projects)[0];
}) {
  const { t } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const allImages = [
    projectData.thumbnailUrl,
    ...(projectData.imageUrls ?? []),
  ].filter(Boolean);

  const { index: slideIndex, cardRef } = useSlideshow(allImages);

  const links = [
    {
      label: "Live Demo",
      href: projectData.liveDemoUrl,
      icon: <MonitorPlay size={13} />,
      primary: true,
    },
    {
      label: "GitHub",
      href: projectData.githubUrl,
      icon: <Github size={13} />,
      primary: false,
    },
    {
      label: "Product",
      href: projectData.productPageUrl,
      icon: <Package size={13} />,
      primary: false,
    },
    {
      label: "Docs",
      href: projectData.markdownFileUrl,
      icon: <FileText size={13} />,
      primary: false,
    },
  ].filter((l) => l.href);

  return (
    <>
      <div ref={cardRef}>
        <Card
          isPressable
          isHoverable
          onPress={onOpen}
          style={{
            backgroundColor: t.bgSecondary,
            borderColor: t.accent,
            color: t.text,
            boxShadow: t.shadow,
          }}
          className="w-[340px] border transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <CardBody className="p-0 overflow-hidden">
            {/* Thumbnail slideshow */}
            <div className="relative w-full h-[190px] overflow-hidden">
              {allImages.map((src, i) => (
                <Image
                  key={src + i}
                  src={src}
                  alt={`${projectData.name} — image ${i + 1}`}
                  removeWrapper
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    i === slideIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Slide dots */}
              {allImages.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {allImages.map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 rounded-full transition-all duration-500 ${
                        i === slideIndex ? "w-4 bg-white" : "w-1 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Domain chips overlay */}
              <div className="absolute top-2 left-2 flex gap-1 flex-wrap z-10">
                {projectData.domains.map((d) => (
                  <Chip
                    key={d}
                    size="sm"
                    style={{ backgroundColor: t.accent, color: t.bg }}
                    className="text-[10px]"
                  >
                    {d}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="px-4 pt-4 pb-2">
              <h3 className="text-base font-bold capitalize tracking-tight mb-1">
                {projectData.name}
              </h3>
              <p
                style={{ color: t.text }}
                className="text-small leading-relaxed line-clamp-2 mb-3"
              >
                {projectData.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {projectData.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    size="sm"
                    style={{
                      backgroundColor: t.bg,
                      borderColor: t.accent,
                      color: t.text,
                    }}
                    className="text-[10px] border"
                  >
                    {tech}
                  </Chip>
                ))}
              </div>
            </div>
          </CardBody>

          {/* Footer links */}
          {links.length > 0 && (
            <CardFooter className="flex gap-2 flex-wrap px-4 pt-2 pb-3">
              <Divider
                style={{ backgroundColor: t.accent }}
                className="mb-2 w-full"
              />
              {links.map((l) => (
                <Button
                  key={l.label}
                  as={Link}
                  href={l.href}
                  isExternal
                  size="sm"
                  style={{
                    backgroundColor: l.primary ? t.accent : "transparent",
                    borderColor: t.accent,
                    color: l.primary ? t.bg : t.accent,
                  }}
                  className="text-[11px] h-7 min-w-0 border transition-transform duration-200 hover:scale-105"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onPress={(e: any) => e.stopPropagation()}
                >
                  {l.label}
                </Button>
              ))}
            </CardFooter>
          )}
        </Card>
      </div>

      {/* ── Drawer ── */}
      <Drawer isOpen={isOpen} onClose={onClose} size="5xl" placement="right">
        <DrawerContent style={{ backgroundColor: t.bg, color: t.text }}>
          <DrawerHeader className="flex flex-col gap-1 capitalize">
            {projectData.name}
            <div className="flex gap-1 flex-wrap mt-1">
              {projectData.domains.map((d) => (
                <Chip
                  key={d}
                  size="sm"
                  style={{ backgroundColor: t.accent, color: t.bg }}
                  className="text-[10px]"
                >
                  {d}
                </Chip>
              ))}
            </div>
          </DrawerHeader>

          <DrawerBody className="gap-4">
            {allImages.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`${projectData.name} — image ${i + 1}`}
                    className="h-24 w-36 object-cover rounded-lg flex-shrink-0"
                    isZoomed
                  />
                ))}
              </div>
            )}

            <Divider style={{ backgroundColor: t.accent }} />

            <p className="text-small leading-relaxed">
              {projectData.description}
            </p>

            <div>
              <p
                style={{ color: t.accent }}
                className="text-tiny uppercase tracking-widest mb-2"
              >
                Technologies
              </p>
              <div className="flex flex-wrap gap-1">
                {projectData.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    size="sm"
                    style={{
                      backgroundColor: t.bgSecondary,
                      borderColor: t.accent,
                      color: t.text,
                    }}
                    className="text-[10px] border"
                  >
                    {tech}
                  </Chip>
                ))}
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter className="flex-wrap gap-2">
            {links.map((l) => (
              <Button
                key={l.label}
                as={Link}
                href={l.href}
                isExternal
                size="sm"
                style={{
                  backgroundColor: l.primary ? t.accent : "transparent",
                  borderColor: t.accent,
                  color: l.primary ? t.bg : t.accent,
                }}
                className="text-[11px] border"
              >
                {l.label}
              </Button>
            ))}
            <Button
              variant="light"
              size="sm"
              onPress={onClose}
              startContent={<X size={13} />}
              className="ml-auto"
              style={{ color: t.text }}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
