import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { forumAPI } from "../services/blogForumApi";

export const ForumCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const res = await forumAPI.listCategoriesWithCounts();
        const items = (res?.success ? (res.data.categories || []) : []) as any[];
        setCategories(items.filter((c: any) => (c.topicsCount || 0) > 0));
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">Foro</h1>
          <p className="text-rocky-textMuted">
            Explora categorías y conecta con otros amantes de los perros
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-rocky-textMuted">Cargando…</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((c: any) => (
              <article
                key={c.id}
                className="rounded-rockyXl overflow-hidden bg-white border border-rocky-border shadow-rockyCard hover:shadow-xl transition-shadow"
              >
                <div className="p-rockyLg space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-rocky-primary bg-opacity-10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-rocky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-rocky-ink line-clamp-2">
                        {c.name}
                      </h3>
                    </div>
                  </div>
                  {c.description && (
                    <p className="text-sm text-rocky-muted line-clamp-2">
                      {c.description}
                    </p>
                  )}
                  <div className="pt-1">
                    <Link
                      to={`/foro/c/${c.slug}`}
                      className="text-sm text-rocky-primary hover:underline font-semibold"
                    >
                      Ver {c.topicsCount || 0} {(c.topicsCount || 0) === 1 ? 'tema' : 'temas'}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {categories.length === 0 && (
            <div className="text-sm text-rocky-textMuted">
              No hay categorías.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ForumCategoriesPage;
