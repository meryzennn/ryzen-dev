import { BaseCard } from "./BaseCard";
import * as Icons from "lucide-react";

interface SocialCardProps {
  platform: string;
  username: string;
  url: string;
  icon?: string;
  followers?: string;
}

export function SocialCard({ platform, username, url, icon, followers }: SocialCardProps) {
  const IconComponent = icon ? (Icons as any)[icon] : Icons.Share2;

  return (
    <BaseCard href={url}>
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 bg-social-light rounded-xl flex items-center justify-center text-social">
          {IconComponent && <IconComponent className="w-6 h-6" />}
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">{platform}</p>
          <p className="text-lg font-bold mb-2">{username}</p>
          {followers && (
            <div className="inline-block bg-social text-social-foreground px-3 py-1 rounded-lg text-xs font-semibold">
              {followers} followers
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
}
