import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { forumAPI } from "../services/blogForumApi";

export const ForumTopicPage: React.FC = () => {
  const { slug } = useParams();
  const [topic, setTopic] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
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
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rocky-primary"></div>
        <p className="text-rocky-textMuted mt-2 text-sm">Cargando tema...</p>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-rocky-textMuted opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-rocky-textMuted mt-4 font-medium">Tema no encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <nav className="text-sm mb-rockySm">
          <Link to="/foro" className="text-rocky-primary hover:underline">Foro</Link>
          {topic.category && (
            <>
              <span className="mx-2 text-rocky-textMuted">›</span>
              <Link to={`/foro/c/${topic.category.slug}`} className="text-rocky-primary hover:underline">
                {topic.category.name}
              </Link>
            </>
          )}
          <span className="mx-2 text-rocky-textMuted">›</span>
          <span className="text-rocky-text">Tema</span>
        </nav>

        {/* Topic Title */}
        <div className="flex items-start justify-between gap-rockyMd">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
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
            <h1 className="text-2xl font-bold">{topic.title}</h1>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-rockySm">
        {posts.map((p: any, idx: number) => (
          <div key={p.id} className="rounded-rockyXl border border-rocky-border bg-white shadow-rockyCard hover:shadow-xl transition-shadow">
            <div className="flex gap-rockyMd p-rockyLg">
              {/* User sidebar */}
              <div className="flex-shrink-0 w-24 text-center">
                {p.user?.avatar ? (
                  <img
                    src={p.user.avatar}
                    alt={p.user?.name || 'Usuario'}
                    className="w-12 h-12 rounded-full mx-auto object-cover border-2 border-rocky-border"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full mx-auto bg-rocky-primary bg-opacity-10 flex items-center justify-center border-2 border-rocky-border">
                    <svg className="w-6 h-6 text-rocky-textMuted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div className="mt-2">
                  <p className="font-semibold text-sm text-rocky-text">
                    {p.user?.name || 'Anónimo'}
                  </p>
                  {idx === 0 && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-rockySm text-xs bg-rocky-primary text-white">
                      Autor
                    </span>
                  )}
                </div>
              </div>

              {/* Post content */}
              <div className="flex-1 min-w-0">
                {/* Post header */}
                <div className="flex items-center justify-between mb-rockySm pb-2 border-b border-rocky-border">
                  <div className="text-sm text-rocky-textMuted">
                    {formatTimeAgo(p.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-rocky-card rounded-rockySm transition-colors" title="Compartir">
                      <svg className="w-4 h-4 text-rocky-textMuted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-rocky-card rounded-rockySm transition-colors" title="Reportar">
                      <svg className="w-4 h-4 text-rocky-textMuted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Post body */}
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
          <div className="text-center py-12 rounded-rockyXl border border-rocky-border bg-white shadow-rockyCard">
            <svg className="w-16 h-16 mx-auto text-rocky-textMuted opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-rocky-textMuted mt-4 font-medium">No hay respuestas aún</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumTopicPage;
