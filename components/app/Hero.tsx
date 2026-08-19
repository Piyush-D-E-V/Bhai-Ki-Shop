import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center gap-12 px-4 py-16 px-5 sm:px-6 lg:flex-row lg:px-8">
      
      {/* Left Content / Logo Area */}
      <div className="flex-1 min-w-[300px]">
        <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-tighter text-foreground md:text-8xl md:leading-[0.9]">
          RAW<br />
          URBAN<br />
          <span className="text-red-900">THREADS.</span>
        </h1>
        <p className="mt-6 max-w-md text-xl font-bold uppercase text-muted-foreground">
          Hype that lives up to the name. Your armor for the urban jungle.
        </p>
      </div>

      {/* Right Image Grid (Recreating your original college project HTML) */}
      <div className="relative grid w-full flex-1 min-w-[300px] grid-cols-3 gap-4">
        
        {/* Decorative Circle (Recreating .crcl2 from your CSS) */}
        <div className="absolute -left-20 -top-20 h-50 w-50 rounded-full border-2 border-border bg-yellow-400 shadow-[4px_4px_0px_var(--border)] z-0 mix-blend-multiply dark:mix-blend-normal"></div>

        {/* Image 1 */}
        <div className="group relative z-10 h-40 overflow-hidden rounded-[20px] border-2 border-border bg-card shadow-[4px_4px_0px_var(--border)] transition-all hover:scale-[1.05] md:h-52">
          <Image
            src="/images/boy.png"
            alt="Hero Image 1"
            fill
            className="object-cover grayscale transition-all group-hover:grayscale-0"
          />
        </div>

        {/* Image 2 */}
        <div className="group relative z-10 h-40 overflow-hidden rounded-[20px] border-2 border-border bg-card shadow-[4px_4px_0px_var(--border)] transition-all hover:scale-[1.05] md:h-52">
          <Image
            src="/images/one.jpg"
            alt="Hero Image 2"
            fill
            className="object-cover grayscale transition-all group-hover:grayscale-0"
          />
        </div>

        {/* Image 3 */}
        <div className="group relative z-10 h-40 overflow-hidden rounded-[20px] border-2 border-border bg-card shadow-[4px_4px_0px_var(--border)] transition-all hover:scale-[1.05] md:h-52">
          <Image
            src="/images/car2.jpg"
            alt="Hero Image 3"
            fill
            className="object-cover grayscale transition-all group-hover:grayscale-0"
          />
        </div>

        {/* Image 4 (Spans 2 columns, replicating #himg4) */}
        <div className="group relative z-10 col-span-2 h-40 overflow-hidden rounded-[20px] border-2 border-border bg-card shadow-[4px_4px_0px_var(--border)] transition-all hover:scale-[1.05] md:h-52">
          <Image
            src="/images/car.jpg"
            alt="Hero Image 4"
            fill
            className="object-cover grayscale transition-all group-hover:grayscale-0 scale-115"
          />
        </div>

        {/* Image 5 */}
        <div className="group relative z-10 h-40 overflow-hidden rounded-[20px] border-2 border-border bg-card shadow-[4px_4px_0px_var(--border)] transition-all hover:scale-[1.05] md:h-52">
          <Image
            src="/images/shoes.png"
            alt="Hero Image 5"
            fill
            className="object-cover grayscale transition-all group-hover:grayscale-0"
          />
        </div>

        {/* Decorative Circle 2 (Recreating .crcl from your CSS) */}
        <div className="absolute -bottom-10 -right-10 h-25 w-25 rounded-full border-2 border-border bg-blue-500 shadow-[4px_4px_0px_var(--border)] z-0 mix-blend-multiply dark:mix-blend-normal"></div>
      </div>
      
    </section>
  );
}