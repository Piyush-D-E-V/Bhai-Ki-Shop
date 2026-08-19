import { Skeleton } from "@/components/ui/skeleton";

export function CategoryTilesSkeleton() {
  // We use exactly 6 blocks to form one complete, perfect bento grid pattern while loading.
  const bentoPatterns = [
    "sm:col-span-2 sm:row-span-2", // Index 0: Giant 2x2 block
    "sm:col-span-2 sm:row-span-1", // Index 1: Wide rectangle
    "sm:col-span-1 sm:row-span-2", // Index 2: Tall vertical block
    "sm:col-span-1 sm:row-span-1", // Index 3: Standard square
    "sm:col-span-2 sm:row-span-1", // Index 4: Wide rectangle
    "sm:col-span-1 sm:row-span-1", // Index 5: Standard square
  ];

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      {/* 
        Matches the grid layout of the CategoryTiles component exactly 
      */}
      <div className="grid grid-cols-1 grid-flow-dense auto-rows-[200px] gap-4 sm:grid-cols-2 md:auto-rows-[250px] lg:grid-cols-4 lg:gap-6">
        
        {bentoPatterns.map((spanClass, i) => (
          <div
            key={i}
            className={`relative flex h-full w-full overflow-hidden rounded-[20px] border-2 border-border bg-card shadow-[4px_4px_0px_var(--border)] ${spanClass}`}
          >
            {/* The actual pulsing skeleton inside the brutalist frame */}
            <Skeleton className="h-full w-full rounded-none opacity-50" />
          </div>
        ))}
        
      </div>
    </div>
  );
}