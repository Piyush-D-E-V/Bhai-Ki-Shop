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
                href="https://github.com/Piyush-D-E-V"
                className="group flex h-12 w-12 items-center justify-center rounded-[10px] border-2 border-[#f5f5f5] bg-black shadow-[4px_4px_0px_#f5f5f5] transition-all hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#f5f5f5] active:translate-y-[4px] active:shadow-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path></svg>
              </a>

              <a
                href="https://www.linkedin.com/in/piyush-mina"
                className="group flex h-12 w-12 items-center justify-center rounded-[10px] border-2 border-[#f5f5f5] bg-black shadow-[4px_4px_0px_#f5f5f5] transition-all hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#f5f5f5] active:translate-y-[4px] active:shadow-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z"></path></svg>
              </a>

              <a
                href="#"
                className="group flex h-12 w-12 items-center justify-center rounded-[10px] border-2 border-[#f5f5f5] bg-black shadow-[4px_4px_0px_#f5f5f5] transition-all hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#f5f5f5] active:translate-y-[4px] active:shadow-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path></svg>
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