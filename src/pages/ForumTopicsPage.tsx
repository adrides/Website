import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { forumAPI } from "../services/blogForumApi";

export const ForumTopicsPage: React.FC = () => {
  const { slug } = useParams();
  const [topics, setTopics] = useState<any[]>([]);
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

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <nav className="text-sm mb-rockySm">
          <Link to="/foro" className="text-rocky-primary hover:underline">Foro</Link>
          {categoryName && (
            <>
              <span className="mx-2 text-rocky-textMuted">›</span>
              <span className="text-rocky-text font-semibold">{categoryName}</span>
            </>
          )}
        </nav>

        <div>
          <h1 className="text-2xl font-bold">
            {categoryName || "Todos los temas"}
          </h1>
          <p className="text-rocky-textMuted">
            {topics.length} {topics.length === 1 ? 'tema' : 'temas'}
          </p>
        </div>

        {/* Search */}
        <div className="mt-rockySm flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && load()}
            placeholder="Buscar temas..."
            className="flex-1 border border-rocky-border rounded-rockySm px-3 py-2 text-sm bg-white"
          />
          <button
            onClick={load}
            className="px-4 py-2 rounded-rockySm bg-rocky-primary text-white text-sm font-semibold"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Topics List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rocky-primary"></div>
          <p className="text-rocky-textMuted mt-2 text-sm">Cargando temas...</p>
        </div>
      ) : (
        <div className="space-y-rockySm">
          {topics.map((t: any) => (
            <Link
              key={t.id}
              to={`/foro/t/${t.slug}`}
              className="group block rounded-rockyXl border border-rocky-border bg-white shadow-rockyCard hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-rockyMd p-rockyLg">
                {/* Icon Section */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-12">
                  <div className="w-10 h-10 rounded-full bg-rocky-primary bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20 transition-colors">
                    <svg className="w-5 h-5 text-rocky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    {t.pinned && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-rockySm text-xs font-semibold bg-rocky-primary text-white">
                        📌 Fijado
                      </span>
                    )}
                    {t.status === 'CLOSED' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-rockySm text-xs font-semibold bg-gray-500 text-white">
                        🔒 Cerrado
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-rocky-text group-hover:text-rocky-primary transition-colors line-clamp-2">
                    {t.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-rocky-textMuted">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t.author?.name || 'Anónimo'}
                    </span>
                    <span>•</span>
                    <span>{formatTimeAgo(t.lastActivityAt || t.createdAt)}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center text-center min-w-[60px]">
                  <div className="text-xl font-bold text-rocky-text">
                    {Math.max(0, (t.postsCount || 0) - 1)}
                  </div>
                  <div className="text-xs text-rocky-textMuted">
                    {Math.max(0, (t.postsCount || 0) - 1) === 1 ? 'respuesta' : 'respuestas'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {topics.length === 0 && (
            <div className="text-center py-12 rounded-rockyXl border border-rocky-border bg-white shadow-rockyCard">
              <svg className="w-16 h-16 mx-auto text-rocky-textMuted opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-rocky-textMuted mt-4 font-medium">No hay temas en esta categoría</p>
              <p className="text-sm text-rocky-textMuted mt-2">Sé el primero en crear uno</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForumTopicsPage;
