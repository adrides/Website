import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { blogAPI } from "../services/blogForumApi";

export const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(12);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") || "";

  const load = async () => {
    setLoading(true);
    try {
      const res = await blogAPI.listPosts({ search, category: activeCategory || undefined, page, limit, sort: "recent" });
      if (res?.success) {
        setPosts(res.data.posts || []);
        setTotal(res.data.pagination?.total || 0);
      }
      const cats = await blogAPI.listCategoriesWithCounts();
      if (cats?.success) setCategories(cats.data.categories || []);
      const rec = await blogAPI.listPosts({ page: 1, limit: 5, sort: "recent" });
      if (rec?.success) setRecent(rec.data.posts || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, activeCategory]);

  const filteredCategories = useMemo(() => (categories || []).filter((c: any) => (c.postsCount || 0) > 0), [categories]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="text-rocky-textMuted">Artículos y novedades de Rocky.</p>
        </div>
        <div className="flex gap-2">
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar…" className="border border-rocky-border rounded-rockySm px-3 py-2 text-sm bg-white" />
          <button onClick={()=>{ setPage(1); load(); }} className="px-4 py-2 rounded-rockySm bg-rocky-primary text-white text-sm font-semibold">Buscar</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-4 space-y-6">
          {(filteredCategories.length > 0 && total > 0) && (
            <div className="rounded-rockyLg border border-rocky-border bg-white p-rockyLg">
              <h3 className="font-semibold mb-3">Categorías</h3>
              <div className="space-y-2">
                {filteredCategories.map((c: any)=> (
                  <button key={c.slug} onClick={()=>{ params.set('category', c.slug); setParams(params); setPage(1); }} className={`w-full flex items-center justify-between text-left text-sm px-2 py-1 rounded-rockySm hover:bg-rocky-surface ${activeCategory===c.slug? 'bg-rocky-surface text-rocky-ink':'text-rocky-text'}`}>
                    <span>{c.name}</span>
                    <span className="text-rocky-textMuted">{c.postsCount}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-rockyLg border border-rocky-border bg-white p-rockyLg">
            <h3 className="font-semibold mb-3">Entradas recientes</h3>
            <div className="space-y-3">
              {recent.map((p)=> (
                <Link key={p.id} to={`/blog/${p.slug}`} className="block text-sm text-rocky-ink hover:underline line-clamp-2">{p.title}</Link>
              ))}
              {recent.length===0 && <div className="text-sm text-rocky-textMuted">Aún no hay entradas</div>}
            </div>
          </div>
        </aside>

        <section className="lg:col-span-8">
          {loading ? (
            <div className="text-sm text-rocky-textMuted">Cargando…</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.map((p) => (
                  <article key={p.id} className="rounded-rockyXl overflow-hidden bg-white border border-rocky-border shadow-rockyCard hover:shadow-xl transition-shadow">
                    {p.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img src={p.coverImage} alt="cover" className="w-full h-full object-cover" loading="lazy" decoding="async" />
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
              </div>
              {posts.length === 0 && (
                <div className="text-sm text-rocky-textMuted">No hay entradas.</div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1.5 rounded-rockySm border border-rocky-border disabled:opacity-50">Anterior</button>
                  <span className="text-sm text-rocky-textMuted">Página {page} de {totalPages}</span>
                  <button disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1.5 rounded-rockySm border border-rocky-border disabled:opacity-50">Siguiente</button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogListPage;
