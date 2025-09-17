'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Nav = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className='w-full h-[74px] bg-[#1C1E4C] flex items-center justify-between px-8'>
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/nabakui.png"
            alt="nabaku logo"
            width={90}
            height={32}
            className="object-contain"
          />
        </Link>
      </div>
      {/* Center: Menu */}
      <div className="hidden md:flex gap-8 text-white text-[18px] font-normal">
          <Link href="/about-us" aria-label="About Us">About Us</Link>
          <Link href="/contact"  aria-label="Contact">Contact</Link>
          <Link href="/search" aria-label="Search">Search</Link>
        </div>
      {/* Right: Buttons */}
      <div className="flex gap-3 items-center">
        <Link href="/login" className="px-5 py-1 rounded-full border border-white text-white bg-transparent hover:bg-white hover:text-[#12175B] transition">Sign in</Link>
        <Link href="/register" className="px-5 py-1 rounded-full bg-white text-[#12175B] font-semibold hover:bg-[#12175B] hover:text-white border-1 hover:border-white transition">Sign up as an organization</Link>
      </div>
    </nav>
  );
};

export default Nav;