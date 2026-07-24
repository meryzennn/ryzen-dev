import { loadContent } from "@/lib/content";

export default function Home() {
  const content = loadContent();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-[1200px]">
        {/* Profile Section */}
        <section className="flex flex-col items-center text-center gap-4 mb-12">
          <div className="w-[120px] h-[120px] rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
            {content.profile.name.charAt(0)}
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{content.profile.name}</h1>
            <p className="text-base text-muted-foreground max-w-[600px]">
              {content.profile.bio}
            </p>
            {content.profile.location && (
              <p className="text-sm text-muted-foreground">
                📍 {content.profile.location}
              </p>
            )}
          </div>
        </section>

        {/* Cards Grid - Placeholder */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.cards
            .filter((card) => card.visible)
            .sort((a, b) => a.position - b.position)
            .map((card) => (
              <div
                key={card.id}
                className="p-6 bg-card border border-border rounded-[24px] hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {card.title || card.type}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {card.description || `${card.type} card`}
                </p>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
}
