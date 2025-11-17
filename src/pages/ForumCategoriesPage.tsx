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
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Foro</h1>
          <p className="text-rocky-textMuted">Explora categorías con temas activos.</p>
        </div>
      </div>
      {loading ? (
        <div className="text-sm text-rocky-textMuted">Cargando…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c: any) => (
            <Link key={c.id} to={`/foro/c/${c.slug}`} className="group block rounded-rockyLg border border-rocky-border bg-white p-rockyLg hover:shadow-rockyCard transition">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-rocky-ink group-hover:text-rocky-primary">{c.name}</div>
                <span className="inline-flex items-center px-2 py-1 rounded-rockySm text-xs border border-rocky-border text-rocky-textMuted bg-rocky-surface">{c.topicsCount}</span>
              </div>
              {c.description && <div className="text-sm text-rocky-textMuted mt-2 line-clamp-2">{c.description}</div>}
            </Link>
          ))}
          {categories.length === 0 && (
            <div className="text-sm text-rocky-textMuted">No hay categorías.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForumCategoriesPage;
