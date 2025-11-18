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
      {/* Header */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">Foro</h1>
          <p className="text-rocky-textMuted">
            Explora categorías y conecta con otros amantes de los perros
          </p>
        </div>
      </div>

      {/* Categories */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rocky-primary"></div>
          <p className="text-rocky-textMuted mt-2 text-sm">Cargando categorías...</p>
        </div>
      ) : (
        <div className="space-y-rockySm">
          {categories.map((c: any) => (
            <Link
              key={c.id}
              to={`/foro/c/${c.slug}`}
              className="group block rounded-rockyXl border border-rocky-border bg-white shadow-rockyCard hover:shadow-xl transition-shadow p-rockyLg"
            >
              <div className="flex items-center gap-rockyMd">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rocky-primary bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20 transition-colors">
                  <svg className="w-6 h-6 text-rocky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-rocky-text group-hover:text-rocky-primary transition-colors">
                    {c.name}
                  </h3>
                  {c.description && (
                    <p className="text-sm text-rocky-textMuted mt-1 line-clamp-2">
                      {c.description}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="flex-shrink-0 text-right">
                  <div className="text-2xl font-bold text-rocky-text">{c.topicsCount}</div>
                  <div className="text-xs text-rocky-textMuted uppercase">temas</div>
                </div>
              </div>
            </Link>
          ))}
          {categories.length === 0 && (
            <div className="text-center py-12 rounded-rockyXl border border-rocky-border bg-white shadow-rockyCard">
              <svg className="w-16 h-16 mx-auto text-rocky-textMuted opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-rocky-textMuted mt-4">No hay categorías disponibles</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForumCategoriesPage;
