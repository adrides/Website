/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
// import Rocky1 from "../assets/Rocky1.png";
// import Rocky2 from "../assets/Rocky2.png";
import Rocky3 from "../assets/Rocky3.png";

const baseLink =
  "px-3 py-2 rounded-rockySm text-sm font-medium transition-colors";
const inactiveLink =
  "text-rocky-textMuted hover:bg-rocky-card hover:text-rocky-text";
const activeLink =
  "bg-rocky-card text-rocky-primary shadow-rockyCard border border-rocky-border";

const mobileLinkBase =
  "block px-rockyMd py-rockySm text-base font-medium transition-colors rounded-rockySm";
const mobileInactive =
  "text-rocky-textMuted hover:bg-rocky-card hover:text-rocky-text";
const mobileActive =
  "bg-rocky-card text-rocky-primary border border-rocky-border";

export function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logo = Rocky3; // swap to Rocky1 if you prefer the lighter palette

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-rocky-background text-rocky-text">
      {/* NAVBAR */}
      <header className="border-b border-rocky-border bg-rocky-navigator/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-rockyLg py-rockySm flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="heyrocky logo"
              className="h-8 w-auto select-none"
            />
            <span className="text-xl font-bold tracking-tight text-rocky-primary">
              Rocky
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Funcionalidades
            </NavLink>
            <NavLink
              to="/how-it-works"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Cómo funciona
            </NavLink>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              FAQ
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/foro"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Foro
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-rockySm text-rocky-textMuted hover:bg-rocky-card hover:text-rocky-text transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            <a
              href="#"
              className="text-sm font-medium text-rocky-primary hover:underline hidden sm:block"
            >
              Descargar app
            </a>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
      </header>
{isMobileMenuOpen && (
  <div className="md:hidden fixed inset-0 z-[60]">
    <div className="absolute inset-0 bg-black/40" onClick={closeMobileMenu} aria-hidden />
    <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-rocky-navigator border-l border-rocky-border shadow-2xl">
      <nav className="px-rockyLg py-rockyMd space-y-1 overflow-y-auto h-full">
        <NavLink to="/" end onClick={closeMobileMenu} className={({ isActive }) => `${mobileLinkBase} ${isActive ? mobileActive : mobileInactive}`}>
          Inicio
        </NavLink>
        <NavLink to="/features" onClick={closeMobileMenu} className={({ isActive }) => `${mobileLinkBase} ${isActive ? mobileActive : mobileInactive}`}>
          Funcionalidades
        </NavLink>
        <NavLink to="/how-it-works" onClick={closeMobileMenu} className={({ isActive }) => `${mobileLinkBase} ${isActive ? mobileActive : mobileInactive}`}>
          Cómo funciona
        </NavLink>
        <NavLink to="/faq" onClick={closeMobileMenu} className={({ isActive }) => `${mobileLinkBase} ${isActive ? mobileActive : mobileInactive}`}>
          FAQ
        </NavLink>
        <NavLink to="/blog" onClick={closeMobileMenu} className={({ isActive }) => `${mobileLinkBase} ${isActive ? mobileActive : mobileInactive}`}>
          Blog
        </NavLink>
        <NavLink to="/foro" onClick={closeMobileMenu} className={({ isActive }) => `${mobileLinkBase} ${isActive ? mobileActive : mobileInactive}`}>
          Foro
        </NavLink>
        <div className="pt-rockyMd">
          <a href="#" className="block w-full text-center px-rockyLg py-rockySm rounded-rockyLg bg-rocky-primary text-white font-semibold shadow-rockyCard hover:opacity-90 transition-opacity">
            Descargar app
          </a>
        </div>
      </nav>
    </div>
  </div>
)}

      {/* MAIN */}
      {/* MAIN: ocupa todo el espacio libre */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-rockyLg py-rockyXl">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-rocky-border mt-rockyXl bg-rocky-navigator">
        <div className="mx-auto max-w-6xl px-rockyLg py-rockyMd flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-rocky-textMuted">
          <p className="flex items-center gap-2">
            Año {new Date().getFullYear()} Rocky. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-4">
            <a href="/legal" className="hover:text-rocky-primary">
              Legal
            </a>
            <a href="/privacy" className="hover:text-rocky-primary">
              Privacidad
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


