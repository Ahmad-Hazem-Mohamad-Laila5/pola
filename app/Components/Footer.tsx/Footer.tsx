"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Footer */}
      <footer className="bg-black text-white">
        {/* Main Footer Content */}
        <div className="px-[5%] lg:px-[10%] py-16 lg:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              {/* Logo */}
              <Link
                href="/"
                aria-label="Pola homepage"
                className="group relative flex items-center gap-3"
              >
                <div className="hidden leading-none min-[400px]:block">
                  <h1 className="text-[24px] font-black tracking-[0.2em] text-white">
                    POLA
                  </h1>

                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.38em] text-neutral-400">
                    Modern Essentials
                  </span>
                </div>
              </Link>

              {/* Contact */}
              <div className="space-y-4 mt-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                    <Icon
                      icon="tabler:map-pin"
                      width={20}
                      height={20}
                      className="text-white"
                    />
                  </div>
                  <p className="text-gray-300 text-sm">
                    17 Irving Pl, New York, NY 10003
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                    <Icon
                      icon="heroicons-outline:mail"
                      width={20}
                      height={20}
                      className="text-white"
                    />
                  </div>
                  <Link
                    href="mailto:hello@pola.com"
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    hello@pola.com
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                    <Icon
                      icon="solar:phone-calling-bold"
                      width={20}
                      height={20}
                      className="text-white"
                    />
                  </div>
                  <Link
                    href="tel:+1234567890"
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    +1 (234) 567-890
                  </Link>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* SHOP */}
              <div>
                <h2 className="text-sm font-bold tracking-wider mb-5 text-white uppercase">
                  Shop
                </h2>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/men"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Men Clothing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/women"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Women Clothing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shoes"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Shoes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/outlet"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Outlet
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Collections */}
              <div>
                <h2 className="text-sm font-bold tracking-wider mb-5 text-white uppercase">
                  Collections
                </h2>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/sports"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/new-arrivals"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      New Arrivals
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/best-sellers"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Best Sellers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sale"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Sale
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Help */}
              <div>
                <h2 className="text-sm font-bold tracking-wider mb-5 text-white uppercase">
                  Help
                </h2>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/faq"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/returns"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social & Apps */}
              <div>
                <h2 className="text-sm font-bold tracking-wider mb-5 text-white uppercase">
                  Follow Us
                </h2>
                <div className="flex gap-3 mb-6">
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Icon icon="mdi:facebook" width={20} height={20} />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Icon icon="mdi:twitter" width={20} height={20} />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Icon icon="mdi:instagram" width={20} height={20} />
                  </Link>
                  <Link
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Icon icon="mdi:pinterest" width={20} height={20} />
                  </Link>
                </div>

                {/* App Download */}
                <h2 className="text-sm font-bold tracking-wider mb-4 text-white uppercase">
                  Download App
                </h2>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-2 px-3 py-2.5 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                    <Icon
                      icon="mdi:apple"
                      width={28}
                      height={28}
                      className="text-white"
                    />
                    <div className="text-left">
                      <p className="text-gray-400 text-xs">Download on the</p>
                      <p className="text-white text-sm font-semibold">
                        App Store
                      </p>
                    </div>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2.5 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                    <Icon
                      icon="mdi:google-play"
                      width={28}
                      height={28}
                      className="text-white"
                    />
                    <div className="text-left">
                      <p className="text-gray-400 text-xs">Get it on</p>
                      <p className="text-white text-sm font-semibold">
                        Google Play
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-[5%] lg:px-[10%] py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright - في المنتصف */}
            <p className="text-gray-500 text-sm text-center w-full">
              © {currentYear} Pola. All Rights Reserved by{" "}
              <Link
                href="https://github.com/Ahmad-Hazem-Mohamad-Laila5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white transition-colors"
              >
                Ahmad Hazem
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
