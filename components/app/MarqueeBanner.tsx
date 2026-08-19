export function MarqueeBanner() {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap border-y-4 border-border bg-foreground py-10 text-background">
      {/* Injecting the custom keyframes directly to keep the component self-contained */}
      <style>{`
        @keyframes custom-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-inline {
          animation: custom-marquee 20s linear infinite;
          display: inline-block;
        }
      `}</style>

      <div className="animate-marquee-inline">
        {[...Array(4)].map((_, index) => (
          <span 
            key={index} 
            className="pr-12 text-6xl font-black uppercase tracking-tight md:text-8xl"
          >
            NEW ARRIVALS • TRENDING STUFF • UP TO 50% OFF • BHAI KI SHOPE •{" "}
          </span>
        ))}
      </div>
    </div>
  );
}