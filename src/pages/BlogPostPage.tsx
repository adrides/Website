import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogAPI } from "../services/blogForumApi";

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await blogAPI.getPost(slug);
        if (res?.success) setPost(res.data.post);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [slug]);

  if (loading) return <div className="text-sm text-rocky-textMuted">Cargando…</div>;
  if (!post) return <div className="text-sm text-rocky-textMuted">Entrada no encontrada.</div>;

  return (
    <article className="space-y-4">
      <Link to="/blog" className="text-sm text-rocky-primary hover:underline">← Volver al blog</Link>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.coverImage && (
        <div className="rounded-rockyLg overflow-hidden border border-rocky-border">
          <img src={post.coverImage} alt="cover" className="w-full h-auto" />
        </div>
      )}
      {post.excerpt && <p className="text-rocky-textMuted">{post.excerpt}</p>}
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
};

export default BlogPostPage;

