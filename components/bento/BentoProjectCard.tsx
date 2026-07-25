import Image from "next/image";
import { BentoCard } from "./BentoGrid";
import type { ProjectCard as ProjectCardType } from "@/types/content";

export function BentoProjectCard({ card }: { card: ProjectCardType }) {
  return (
    <BentoCard size={card.size} href={card.url}>
      <div className="relative h-full w-full overflow-hidden">
        {/* Image section */}
        {card.image && (
          <div className="relative w-full h-32 bg-project-light">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
          </div>
        )}

        {/* Content section */}
        <div className="p-6 flex flex-col h-[calc(100%-8rem)]">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 leading-tight">
              {card.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {card.description}
            </p>
          </div>

          {/* Tags */}
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {card.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-project-light text-project text-xs font-medium rounded-lg"
                >
                  {tag}
                </span>
              ))}
              {card.tags.length > 3 && (
                <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-lg">
                  +{card.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
