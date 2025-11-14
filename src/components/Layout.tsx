import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

const baseLink =
  "px-3 py-2 rounded-rockySm text-sm font-medium transition-colors";
const inactiveLink =
  "text-rocky-textMuted hover:bg-rocky-card hover:text-rocky-text";
const activeLink =
  "bg-rocky-card text-rocky-primary shadow-rockyCard border border-rocky-border";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-rocky-background text-rocky-text">
      {/* NAVBAR */}
      <header className="border-b border-rocky-border bg-rocky-navigator/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-rockyLg py-rockySm flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-rocky-primary">
              hey<strong className="text-rocky-text">rocky</strong>
            </span>
          </Link>

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
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-sm font-medium text-rocky-primary hover:underline"
            >
              Descargar app
            </a>
          </div>
        </div>
      </header>

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
          <p>
            © {new Date().getFullYear()} heyrocky. Todos los derechos
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
