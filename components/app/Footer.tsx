import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-border bg-black pb-10 pt-16 text-[#f5f5f5]">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          
          {/* Section 1: Logo & Social Media */}
          <div className="flex flex-col gap-6 md:col-span-2">
            <Link
              href="/"
              className="inline-block w-max transition-transform hover:-translate-y-1"
            >
              <Image
                src="/images/logo-footer.png"
                alt="Street Ready Gear Logo"
                width={150}
                height={150}
                className="object-contain"
              />
            </Link>

            <p className="max-w-md text-lg font-bold uppercase leading-relaxed text-zinc-400">
              Wear your obsession. Hype that lives up to the name.
            </p>

            {/* Social Buttons */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="group flex h-12 w-12 items-center justify-center rounded-[10px] border-2 border-[#f5f5f5] bg-black shadow-[4px_4px_0px_#f5f5f5] transition-all hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#f5f5f5] active:translate-y-[4px] active:shadow-none"
              >
                <span className="h-6 w-6 stroke-[2.5] text-[#f5f5f5] transition-transform group-hover:scale-110" />
              </a>

              <a
                href="#"
                className="group flex h-12 w-12 items-center justify-center rounded-[10px] border-2 border-[#f5f5f5] bg-black shadow-[4px_4px_0px_#f5f5f5] transition-all hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#f5f5f5] active:translate-y-[4px] active:shadow-none"
              >
                <span className="h-6 w-6 stroke-[2.5] text-[#f5f5f5] transition-transform group-hover:scale-110" />
              </a>

              <a
                href="#"
                className="group flex h-12 w-12 items-center justify-center rounded-[10px] border-2 border-[#f5f5f5] bg-black shadow-[4px_4px_0px_#f5f5f5] transition-all hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#f5f5f5] active:translate-y-[4px] active:shadow-none"
              >
                <span className="h-6 w-6 stroke-[2.5] text-[#f5f5f5] transition-transform group-hover:scale-110" />
              </a>

              <a
                href="https://github.com/Piyush"
                className="group flex h-12 w-12 items-center justify-center rounded-[10px] border-2 border-[#f5f5f5] bg-black shadow-[4px_4px_0px_#f5f5f5] transition-all hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#f5f5f5] active:translate-y-[4px] active:shadow-none"
              >
                <span className="h-6 w-6 stroke-[2.5] text-[#f5f5f5] transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Section 2: Shop */}
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#f5f5f5]">
              Shop
            </h3>

            <ul className="flex flex-col gap-4 font-bold uppercase text-zinc-400">
              <li>
                <Link
                  href="/"
                  className="inline-block transition-transform hover:translate-x-2 hover:text-[#f5f5f5]"
                >
                  All Products
                </Link>
              </li>

              {/* Category filter links */}
              <li>
                <Link
                  href="/?category=t-shirts"
                  className="inline-block transition-transform hover:translate-x-2 hover:text-[#f5f5f5]"
                >
                  T-Shirts
                </Link>
              </li>

              <li>
                <Link
                  href="/?category=hoodies"
                  className="inline-block transition-transform hover:translate-x-2 hover:text-[#f5f5f5]"
                >
                  Hoodies
                </Link>
              </li>

              <li>
                <Link
                  href="/?category=shoes"
                  className="inline-block transition-transform hover:translate-x-2 hover:text-[#f5f5f5]"
                >
                  Shoes
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Legal - Non-clickable filler */}
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#f5f5f5]">
              Legal
            </h3>

            <div className="flex flex-col gap-4 font-bold uppercase text-zinc-400">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Return Policy</span>
              <span>Contact Us</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t-4 border-white pt-8 sm:flex-row">
          <p className="text-sm font-black uppercase tracking-tight text-zinc-400">
            © {new Date().getFullYear()} Piyush. All rights reserved.
          </p>

          <div className="mt-4 flex gap-6 sm:mt-0">
            <span className="text-sm font-black uppercase tracking-tight text-zinc-400">
              Stay Hype.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}