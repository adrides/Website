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

  if (loading) return <div className="text-sm text-rocky-textMuted">Cargando…</div>;
  if (!topic) return <div className="text-sm text-rocky-textMuted">Tema no encontrado.</div>;

  return (
    <div className="space-y-4">
      <nav className="text-sm text-rocky-textMuted">
        <Link to="/foro" className="hover:underline">Foro</Link>
        <span className="mx-1">›</span>
        <span className="text-rocky-ink">{topic.title}</span>
      </nav>
      <h1 className="text-2xl font-bold">{topic.title}</h1>

      <div className="space-y-3">
        {posts.map((p: any) => (
          <div key={p.id} className="rounded-rockyLg border border-rocky-border bg-white p-rockyLg">
            <div className="flex items-center gap-3 mb-2">
              {p.user?.avatar && (
                <img src={p.user.avatar} alt={p.user?.name || 'usuario'} className="w-7 h-7 rounded-full object-cover" />
              )}
              <div className="text-sm text-rocky-textMuted">
                {p.user?.name && <span className="text-rocky-ink mr-1">{p.user.name}</span>}
                <span>{new Date(p.createdAt).toLocaleString()}</span>
              </div>
            </div>
            <div className="prose max-w-none"><div dangerouslySetInnerHTML={{ __html: p.content }} /></div>
          </div>
        ))}
        {posts.length === 0 && <div className="text-sm text-rocky-textMuted">No hay respuestas aún.</div>}
      </div>
    </div>
  );
};

export default ForumTopicPage;
