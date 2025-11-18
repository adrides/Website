import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { forumAPI } from "../services/blogForumApi";

export const ForumTopicPage: React.FC = () => {
  const { slug } = useParams();
  const [topic, setTopic] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const resTopic = await forumAPI.getTopic(slug);
        if (resTopic?.success) {
          setTopic(resTopic.data.topic);
          const resPosts = await forumAPI.listPosts(resTopic.data.topic.id, { page: 1, limit: 100 });
          if (resPosts?.success) setPosts(resPosts.data.posts || []);
        }
        const rec = await forumAPI.listTopics({ page: 1, limit: 5, sort: "active" });
        if (rec?.success) setRecent(rec.data.topics || []);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [slug]);

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

  if (loading) {
    return <div className="text-sm text-rocky-textMuted">Cargando…</div>;
  }

  if (!topic) {
    return <div className="text-sm text-rocky-textMuted">Tema no encontrado.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <article className="lg:col-span-8 space-y-4">
        <nav className="text-sm text-rocky-textMuted">
          <Link to="/foro" className="hover:underline">
            Foro
          </Link>
          {topic.category && (
            <>
              <span className="mx-1">›</span>
              <Link
                to={`/foro/c/${topic.category.slug}`}
                className="hover:underline"
              >
                {topic.category.name}
              </Link>
            </>
          )}
          <span className="mx-1">›</span>
          <span className="text-rocky-ink">{topic.title}</span>
        </nav>

        <div className="flex items-start gap-2">
          {topic.pinned && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-rockySm text-xs font-semibold bg-rocky-primary text-white">
              📌 Fijado
            </span>
          )}
          {topic.status === 'CLOSED' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-rockySm text-xs font-semibold bg-gray-500 text-white">
              🔒 Cerrado
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold">{topic.title}</h1>
        <div className="text-sm text-rocky-textMuted">
          {topic.createdBy?.name && <span>Por {topic.createdBy.name}</span>}
          {topic.createdAt && (
            <span> · {new Date(topic.createdAt).toLocaleDateString()}</span>
          )}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((p: any, idx: number) => (
            <div
              key={p.id}
              className="rounded-rockyLg border border-rocky-border bg-white p-rockyLg"
            >
              <div className="flex items-start gap-rockyMd">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {p.user?.avatar ? (
                    <img
                      src={p.user.avatar}
                      alt={p.user?.name || 'Usuario'}
                      className="w-10 h-10 rounded-full object-cover border-2 border-rocky-border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-rocky-primary bg-opacity-10 flex items-center justify-center border-2 border-rocky-border">
                      <svg className="w-5 h-5 text-rocky-textMuted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-rocky-text">
                        {p.user?.name || 'Anónimo'}
                      </span>
                      {idx === 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-rockySm text-xs bg-rocky-primary text-white">
                          Autor
                        </span>
                      )}
                      <span className="text-xs text-rocky-textMuted">
                        · {formatTimeAgo(p.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: p.content }}
                      className="text-rocky-text leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <div className="text-sm text-rocky-textMuted">
              No hay respuestas aún.
            </div>
          )}
        </div>
      </article>

      <aside className="lg:col-span-4 space-y-6">
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
        <Link
          to="/foro"
          className="inline-block text-sm text-rocky-primary hover:underline"
        >
          ← Volver al foro
        </Link>
      </aside>
    </div>
  );
};

export default ForumTopicPage;
