import { BaseCard } from "./BaseCard";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  tags?: string[];
}

export function ProjectCard({ title, description, url, image, tags }: ProjectCardProps) {
  return (
    <BaseCard href={url} className="col-span-2">
      <div className="flex flex-col gap-4">
        {image && (
          <div className="relative w-full h-32 rounded-lg overflow-hidden bg-muted">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-muted text-xs font-medium rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
}
