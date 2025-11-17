import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogAPI } from "../services/blogForumApi";

export const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await blogAPI.listPosts({ search, page: 1, limit: 12, sort: "recent" });
      if (res?.success) setPosts(res.data.posts || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="text-rocky-textMuted">Artículos y novedades de Rocky.</p>
        </div>
        <div className="flex gap-2">
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar…" className="border border-rocky-border rounded-rockySm px-3 py-2 text-sm bg-white" />
          <button onClick={load} className="px-4 py-2 rounded-rockySm bg-rocky-primary text-white text-sm font-semibold">Buscar</button>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-rocky-textMuted">Cargando…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article key={p.id} className="rounded-rockyXl overflow-hidden bg-white border border-rocky-border shadow-rockyCard hover:shadow-xl transition-shadow">
              {p.coverImage && (
                <div className="h-36 overflow-hidden">
                  <img src={p.coverImage} alt="cover" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-rockyLg space-y-2">
                <h3 className="font-semibold text-lg text-rocky-ink line-clamp-2">{p.title}</h3>
                {p.excerpt && <p className="text-sm text-rocky-muted line-clamp-2">{p.excerpt}</p>}
                <div className="pt-1">
                  <Link to={`/blog/${p.slug}`} className="text-sm text-rocky-primary hover:underline font-semibold">Leer más</Link>
                </div>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <div className="text-sm text-rocky-textMuted">No hay entradas.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogListPage;

