import { Link } from "react-router-dom";
import LandingPlanCard from "../components/LandingPlanCard";

export function HomePage() {
  return (
    <section className="grid gap-rockyXl md:grid-cols-2 items-center">
      {/* Texto principal */}
      <div className="space-y-rockyMd">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-rocky-textMuted">
          Para personas con perro
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-rocky-primary leading-tight">
          Planes tranquilos
          <br />
          para perros sociables.
        </h1>

        <p className="text-rocky-textMuted text-lg max-w-xl">
          Rocky conecta a personas con perro para organizar paseos, quedadas y
          actividades en entornos seguros y cuidados, con requisitos claros para
          cada plan.
        </p>

        <div className="flex flex-wrap gap-rockySm">
          <a
            href="#"
            className="inline-flex items-center justify-center px-rockyLg py-rockySm rounded-rockyLg bg-rocky-buttonBg text-white text-sm font-semibold shadow-rockyCard"
          >
            Descargar la app
          </a>
          <Link
            to="/how-it-works"
            className="inline-flex items-center justify-center px-rockyLg py-rockySm rounded-rockyLg border border-rocky-border bg-rocky-surface text-sm font-semibold text-rocky-primary hover:bg-rocky-card hover:border-rocky-cardShadow"
          >
            Ver cómo funciona
          </Link>
        </div>

        <p className="text-xs text-rocky-textMuted">
          Empezamos en Madrid y pronto en más ciudades.
        </p>
      </div>

      {/* Nueva tarjeta con formato real */}
      <div className="relative flex justify-center">
        <LandingPlanCard />
      </div>
    </section>
  );
}