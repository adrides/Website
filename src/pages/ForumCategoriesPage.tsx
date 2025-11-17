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
      <h1 className="text-2xl font-bold">Foro</h1>
      {loading ? (
        <div className="text-sm text-rocky-textMuted">Cargando…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <Link key={c.id} to={`/foro/c/${c.slug}`} className="block rounded-rockyLg border border-rocky-border bg-white p-rockyLg hover:shadow-rockyCard">
              <div className="font-semibold">{c.name}</div>
              {c.description && <div className="text-sm text-rocky-textMuted mt-1 line-clamp-2">{c.description}</div>}
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
