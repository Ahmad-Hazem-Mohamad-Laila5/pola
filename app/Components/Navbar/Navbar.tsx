"use client";

import { useCart } from "@/app/Pages/Cart/CartContext";
import { useWishlist } from "@/app/Pages/Wishlist/WhislistContext";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type FormEvent, type MouseEvent } from "react";



type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Men's", href: "/Pages/MensProducts" },
  { label: "Women's", href: "/Pages/WomensProduct" },
  { label: "Shoes", href: "/Pages/ShoesProduct" },
  { label: "Collections", href: "/Pages/Collections" },
  { label: "Blogs", href: "/Pages/Blogs" },
];

const normalizePath = (path: string) => {
  const cleanPath = path.split("?")[0].replace(/\/+$/, "");
  return cleanPath || "/";
};

const Navbar = () => {
  const pathname = usePathname();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const isMenuOpen = open;
  const menuId = "mobile-navigation";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const shouldLockBody = open || showModal;

    document.body.style.overflow = shouldLockBody ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, showModal]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isActiveLink = (href: string) => {
    const currentPath = normalizePath(pathname);
    const linkPath = normalizePath(href);

    if (linkPath === "/") {
      return currentPath === "/";
    }

    return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
  };

  const openLoginModal = () => {
    setIsLogin(true);
    setOpen(false);
    setShowModal(true);
  };

  const openRegisterModal = () => {
    setIsLogin(false);
    setOpen(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleModalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed left-0 top-0 z-50 w-full px-4 transition-all duration-200 sm:px-6 lg:px-10 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <div
          className={`mx-auto max-w-[1500px] transition-all duration-200 will-change-transform ${
            scrolled
              ? "rounded-2xl bg-white/85 px-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-md"
              : "px-1"
          }`}
        >
          <div className="relative flex h-[68px] items-center justify-between">
            {/* ================= LOGO ================= */}
            <Link
              href="/"
              aria-label="Pola homepage"
              className="group relative flex items-center gap-3"
            >
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] bg-black">
                <div className="absolute -inset-5 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 blur-md transition-all duration-700 group-hover:translate-x-10 group-hover:opacity-100" />

                <span className="relative text-xl font-black tracking-[-0.08em] text-white">
                  P
                </span>
              </div>

              <div className="hidden leading-none min-[400px]:block">
                <h1 className="text-[24px] font-black tracking-[0.2em] text-black">
                  POLA
                </h1>

                <span className="mt-1 block text-[7px] font-semibold uppercase tracking-[0.38em] text-neutral-400">
                  Modern Essentials
                </span>
              </div>
            </Link>

            {/* ================= DESKTOP NAV ================= */}
            <nav
              aria-label="Main navigation"
              className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-black/[0.06] bg-white/60 p-1.5 shadow-sm backdrop-blur-xl lg:flex"
            >
              {navLinks.map((link) => {
                const active = isActiveLink(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                      active
                        ? "bg-black text-white shadow-md"
                        : "text-neutral-600 hover:bg-black/[0.05] hover:text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ================= ACTIONS ================= */}
            <div className="flex items-center gap-2">
              {/* Account */}
              <button
                type="button"
                onClick={openLoginModal}
                aria-label="Open account login"
                className="group hidden h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-white/60 transition-all duration-300 hover:border-black hover:bg-black hover:text-white sm:flex"
              >
                <Icon
                  icon="solar:user-linear"
                  width={21}
                  height={21}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </button>

              {/* Wishlist */}
              <Link
                href="/Pages/Wishlist"
                aria-label={`Wishlist, ${wishlistCount} items`}
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-white/60 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
              >
                <Icon
                  icon="solar:heart-linear"
                  width={21}
                  height={21}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <CountBadge count={wishlistCount} variant="heart" />
              </Link>

              {/* Cart */}
              <Link
                href="/Pages/Cart"
                aria-label={`Cart, ${cartCount} items`}
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-white/60 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
              >
                <Icon
                  icon="solar:bag-3-linear"
                  width={21}
                  height={21}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <CountBadge count={cartCount} variant="cart" />
              </Link>

              {/* Mobile Menu */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open navigation menu"
                aria-controls={menuId}
                aria-expanded={isMenuOpen}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:scale-105 lg:hidden"
              >
                <Icon icon="solar:hamburger-menu-linear" width={23} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <div
        id={menuId}
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <aside
          aria-label="Mobile navigation"
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-[390px] flex-col bg-[#fafafa] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-5">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-2xl font-black tracking-[0.2em]"
            >
              POLA
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform hover:rotate-90"
            >
              <Icon icon="solar:close-linear" width={23} />
            </button>
          </div>

          {/* Mobile Links */}
          <nav
            aria-label="Mobile navigation links"
            className="flex flex-1 flex-col px-6 py-8"
          >
            <span className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
              Navigation
            </span>

            <div className="space-y-2">
              {navLinks.map((link, index) => {
                const active = isActiveLink(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-300 ${
                      active
                        ? "bg-black text-white shadow-lg"
                        : "text-neutral-700 hover:bg-white hover:text-black"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`text-[10px] ${
                          active ? "text-white/50" : "text-neutral-300"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-base font-medium">
                        {link.label}
                      </span>
                    </span>

                    <Icon
                      icon="solar:arrow-right-up-linear"
                      width={19}
                      className={`transition-all duration-300 ${
                        active
                          ? "opacity-100"
                          : "opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Account */}
            <div className="mt-auto space-y-3">
              <button
                type="button"
                onClick={openLoginModal}
                className="flex w-full items-center justify-between rounded-2xl bg-black px-5 py-4 text-left text-white transition-transform hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <Icon icon="solar:user-linear" width={20} />
                  </span>

                  <span className="text-sm font-semibold">My Account</span>
                </span>

                <Icon icon="solar:arrow-right-up-linear" width={20} />
              </button>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/Pages/Wishlist"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-3 text-xs font-semibold text-black"
                >
                  <Icon icon="solar:heart-linear" width={17} />
                  Wishlist
                  <span className="rounded-full bg-black px-1.5 py-0.5 text-[10px] text-white">
                    {wishlistCount}
                  </span>
                </Link>

                <Link
                  href="/Pages/Cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-3 text-xs font-semibold text-black"
                >
                  <Icon icon="solar:bag-3-linear" width={17} />
                  Cart
                  <span className="rounded-full bg-black px-1.5 py-0.5 text-[10px] text-white">
                    {cartCount}
                  </span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-black/[0.06] px-6 py-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              POLA — Modern Essentials
            </p>
          </div>
        </aside>
      </div>

      {/* ================= AUTH MODAL ================= */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xl"
          onClick={handleBackdropClick}
        >
          <div className="relative w-full max-w-[430px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
            {/* Top Decoration */}
            <div className="absolute left-0 top-0 h-1 w-full bg-black" />

            {/* Close */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close authentication modal"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-all hover:bg-black hover:text-white"
            >
              <Icon icon="solar:close-linear" width={19} />
            </button>

            <div className="p-7 sm:p-9">
              {/* Brand */}
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-xl font-black text-white">
                  P
                </div>

                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                  Welcome to POLA
                </p>

                <h2
                  id="auth-modal-title"
                  className="text-2xl font-bold tracking-tight text-black sm:text-3xl"
                >
                  {isLogin ? "Welcome back." : "Create your account."}
                </h2>

                <p className="mt-2 text-sm text-neutral-500">
                  {isLogin
                    ? "Sign in to continue your shopping experience."
                    : "Join POLA and discover our latest collections."}
                </p>
              </div>

              {/* Form */}
              <form
                className="flex flex-col gap-4"
                onSubmit={handleModalSubmit}
              >
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="full-name"
                      className="mb-2 block text-xs font-semibold text-neutral-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="full-name"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-neutral-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                      required
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-neutral-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-neutral-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                    required
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold text-neutral-700"
                    >
                      Password
                    </label>

                    {isLogin && (
                      <button
                        type="button"
                        className="text-xs font-medium text-neutral-500 hover:text-black"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-neutral-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-xl hover:shadow-black/10 active:scale-[0.98]"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                  <Icon icon="solar:arrow-right-linear" width={18} />
                </button>
              </form>

              {/* Switch */}
              <p className="mt-6 text-center text-sm text-neutral-500">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin((current) => !current)}
                  className="font-bold text-black hover:underline"
                >
                  {isLogin ? "Create one" : "Sign in"}
                </button>
              </p>

              {/* Terms */}
              <p className="mt-7 border-t border-neutral-100 pt-5 text-center text-[10px] leading-5 text-neutral-400">
                By continuing, you agree to our{" "}
                <Link
                  href="/"
                  onClick={closeModal}
                  className="font-semibold text-neutral-700 hover:text-black"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  href="/"
                  onClick={closeModal}
                  className="font-semibold text-neutral-700 hover:text-black"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

type CountBadgeProps = {
  count: number;
  variant: "heart" | "cart";
};

const CountBadge = ({ count, variant }: CountBadgeProps) => {
  if (count <= 0) {
    return null;
  }

  return (
    <span
      aria-hidden="true"
      className={`absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white shadow-sm ${
        variant === "heart" ? "bg-rose-500" : "bg-black"
      }`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default Navbar;
