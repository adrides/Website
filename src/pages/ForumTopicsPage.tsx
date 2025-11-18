import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { forumAPI } from "../services/blogForumApi";

export const ForumTopicsPage: React.FC = () => {
  const { slug } = useParams();
  const [topics, setTopics] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [categoryName, setCategoryName] = useState<string>("");

  const load = async () => {
    setLoading(true);
    try {
      const bySlug = async () => {
        const cats = await forumAPI.listCategories();
        if (cats?.success) {
          const found = (cats.data.categories || []).find((c: any) => c.slug === slug);
          setCategoryId(found?.id);
          setCategoryName(found?.name || "");
          return found?.id;
        }
      };
      const cid = categoryId || (slug ? await bySlug() : undefined);
      const res = await forumAPI.listTopics({ categoryId: cid, search, page: 1, limit: 20, sort: "active" });
      if (res?.success) setTopics(res.data.topics || []);

      const cats = await forumAPI.listCategoriesWithCounts();
      if (cats?.success) setCategories(cats.data.categories || []);

      const rec = await forumAPI.listTopics({ page: 1, limit: 5, sort: "active" });
      if (rec?.success) setRecent(rec.data.topics || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [slug]);

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (diff < 60) return 'hace un momento';
    if (diff < 3600) return `hace ${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `hace ${Math.floor(diff / 86400)}d`;
    return then.toLocaleDateString();
  };

  const filteredCategories = useMemo(
    () => (categories || []).filter((c: any) => (c.topicsCount || 0) > 0),
    [categories]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-2">
        <div>
          <nav className="text-sm mb-2">
            <Link to="/foro" className="text-rocky-primary hover:underline">Foro</Link>
            {categoryName && (
              <>
                <span className="mx-2 text-rocky-textMuted">›</span>
                <span className="text-rocky-text font-semibold">{categoryName}</span>
              </>
            )}
          </nav>
          <h1 className="text-2xl font-bold">
            {categoryName || "Todos los temas"}
          </h1>
          <p className="text-rocky-textMuted">
            {topics.length} {topics.length === 1 ? 'tema' : 'temas'}
          </p>
        </div>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && load()}
            placeholder="Buscar…"
            className="border border-rocky-border rounded-rockySm px-3 py-2 text-sm bg-white"
          />
          <button
            onClick={load}
            className="px-4 py-2 rounded-rockySm bg-rocky-primary text-white text-sm font-semibold"
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-4 space-y-6">
          {filteredCategories.length > 0 && topics.length > 0 && (
            <div className="rounded-rockyLg border border-rocky-border bg-white p-rockyLg">
              <h3 className="font-semibold mb-3">Categorías</h3>
              <div className="space-y-2">
                {filteredCategories.map((c: any) => (
                  <Link
                    key={c.slug}
                    to={`/foro/c/${c.slug}`}
                    className={`w-full flex items-center justify-between text-left text-sm px-2 py-1 rounded-rockySm hover:bg-rocky-surface ${
                      categoryName === c.name
                        ? "bg-rocky-surface text-rocky-ink"
                        : "text-rocky-text"
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-rocky-textMuted">{c.topicsCount}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-rockyLg border border-rocky-border bg-white p-rockyLg">
            <h3 className="font-semibold mb-3">Temas recientes</h3>
            <ul className="-my-2 divide-y divide-rocky-border">
              {recent.map((t) => (
                <li key={t.id} className="py-2">
                  <Link
                    to={`/foro/t/${t.slug}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-rocky-ink group-hover:underline line-clamp-2">
                        {t.title}
                      </div>
                      <div className="text-xs text-rocky-textMuted">
                        {formatTimeAgo(t.lastActivityAt || t.createdAt)}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
              {recent.length === 0 && (
                <li className="py-2 text-sm text-rocky-textMuted">
                  Aún no hay temas
                </li>
              )}
            </ul>
          </div>
        </aside>

        <section className="lg:col-span-8">
          {loading ? (
            <div className="text-sm text-rocky-textMuted">Cargando…</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {topics.map((t: any) => (
                  <article
                    key={t.id}
                    className="rounded-rockyXl overflow-hidden bg-white border border-rocky-border shadow-rockyCard hover:shadow-xl transition-shadow"
                  >
                    <div className="p-rockyLg space-y-2">
                      <div className="flex items-start gap-2 mb-1">
                        {t.pinned && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-rockySm text-xs font-semibold bg-rocky-primary text-white">
                            📌
                          </span>
                        )}
                        {t.status === 'CLOSED' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-rockySm text-xs font-semibold bg-gray-500 text-white">
                            🔒
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg text-rocky-ink line-clamp-2">
                        {t.title}
                      </h3>
                      <div className="text-xs text-rocky-textMuted">
                        <span>{t.author?.name || 'Anónimo'}</span>
                        <span> · </span>
                        <span>{formatTimeAgo(t.lastActivityAt || t.createdAt)}</span>
                      </div>
                      <div className="pt-1">
                        <Link
                          to={`/foro/t/${t.slug}`}
                          className="text-sm text-rocky-primary hover:underline font-semibold"
                        >
                          {Math.max(0, (t.postsCount || 0) - 1)} {Math.max(0, (t.postsCount || 0) - 1) === 1 ? 'respuesta' : 'respuestas'}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {topics.length === 0 && (
                <div className="text-sm text-rocky-textMuted">
                  No hay temas en esta categoría.
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default ForumTopicsPage;
