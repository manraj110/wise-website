"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pageLinks = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Track Record", href: "/track-record" },
    { label: "Why WISE", href: "/why-wise" },
  ];

  // Contact is a section on the home page, not its own page.
  // If we're already home, just smooth-scroll there — no navigation needed.
  // If we're on another page, let the Link below navigate to "/#contact"
  // and HashScrollFix takes over from there.
  const handleContactClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("contact");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#14071A]/80" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-12 md:px-28 py-5">
        {/* LOGO — always takes you to the very top of the home page */}
        <Link
          href="/"
          className="flex items-center gap-3"
          style={{ marginLeft: "0.5rem", marginTop: "0.15rem" }}
        >
          <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/logo2.jpg"
              alt="WISE Logo"
              fill
              className="object-cover scale-[2.2]"
              style={{ objectPosition: "center center" }}
            />
          </div>
          <h1 className="text-2xl font-bold tracking-wide text-white">WISE</h1>
        </Link>

        {/* NAV LINKS */}
        <div className="flex gap-8 text-sm uppercase tracking-wider text-white/80">
          {pageLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-[#F4B942] transition-colors cursor-pointer"
            >
              {label}
            </Link>
          ))}

          <Link
            href="/#contact"
            scroll={false}
            onClick={handleContactClick}
            className="hover:text-[#F4B942] transition-colors cursor-pointer"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
