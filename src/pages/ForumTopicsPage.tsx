import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { forumAPI } from "../services/blogForumApi";

export const ForumTopicsPage: React.FC = () => {
  const { slug } = useParams();
  const [topics, setTopics] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const load = async () => {
    setLoading(true);
    try {
      const bySlug = async () => {
        // Simple fetch all categories to resolve slug → id (minimal client-side workaround)
        const cats = await forumAPI.listCategories();
        if (cats?.success) {
          const found = (cats.data.categories || []).find((c: any) => c.slug === slug);
          setCategoryId(found?.id);
          return found?.id;
        }
      };
      const cid = categoryId || (slug ? await bySlug() : undefined);
      const res = await forumAPI.listTopics({ categoryId: cid, search, page: 1, limit: 20, sort: "active" });
      if (res?.success) setTopics(res.data.topics || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [slug]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">Foro</h1>
          <p className="text-rocky-textMuted">Temas recientes</p>
        </div>
        <div className="flex gap-2">
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar temas…" className="border border-rocky-border rounded-rockySm px-3 py-2 text-sm bg-white" />
          <button onClick={load} className="px-4 py-2 rounded-rockySm bg-rocky-primary text-white text-sm font-semibold">Buscar</button>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-rocky-textMuted">Cargando…</div>
      ) : (
        <div className="rounded-rockyLg border border-rocky-border bg-white overflow-hidden">
          {topics.map((t: any) => (
            <Link key={t.id} to={`/foro/t/${t.slug}`} className="flex items-center justify-between p-rockyLg hover:bg-rocky-surface border-b border-rocky-border last:border-b-0">
              <div>
                <div className="font-semibold text-rocky-ink">{t.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  {t.pinned && <span className="inline-flex items-center px-2 py-0.5 rounded-rockySm text-xs border border-rocky-border bg-rocky-surface">Fijado</span>}
                  {t.status === 'CLOSED' && <span className="inline-flex items-center px-2 py-0.5 rounded-rockySm text-xs border border-rocky-border bg-rocky-surface">Cerrado</span>}
                  <span className="text-xs text-rocky-textMuted">Última actividad: {new Date(t.lastActivityAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-rocky-ink">{Math.max(0,(t.postsCount||0)-1)} respuestas</div>
              </div>
            </Link>
          ))}
          {topics.length === 0 && (
            <div className="p-rockyLg text-sm text-rocky-textMuted">No hay temas.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForumTopicsPage;
