import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogAPI } from "../services/blogApi";

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await blogAPI.getPost(slug);
        if (res?.success) setPost(res.data.post);
        const rec = await blogAPI.listPosts({
          page: 1,
          limit: 5,
          sort: "recent",
        });
        if (rec?.success) setRecent(rec.data.posts || []);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [slug]);

  // Hooks must not be conditional. Normalize content for all renders.
  const htmlContent = useMemo(() => {
    const c = post?.content;
    if (typeof c === "string") return c;
    if (c && typeof c === "object") {
      if (typeof c.html === "string") return c.html;
      if (typeof c.content === "string") return c.content;
      try {
        return JSON.stringify(c);
      } catch {
        return "";
      }
    }
    return "";
  }, [post?.content]);

  const readingTime = useMemo(() => {
    try {
      const plain = htmlContent.replace(/<[^>]+>/g, " ");
      const words = plain.trim().split(/\s+/).filter(Boolean).length;
      return Math.max(1, Math.round(words / 200));
    } catch {
      return 1;
    }
  }, [htmlContent]);

  // Minimal client-side sanitizer (remove scripts, event handlers, and javascript: URLs)
  const sanitizeHtml = (html: string): string => {
    try {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html || "";

      // Remove potentially dangerous nodes
      wrapper
        .querySelectorAll(
          'script, iframe, object, embed, link[rel="import"], meta[http-equiv]'
        )
        .forEach((el) => el.remove());

      // Strip on* attributes and javascript/data URLs
      const walk = (node: Element) => {
        // Remove event handlers
        [...node.attributes].forEach((attr) => {
          const name = attr.name.toLowerCase();
          const value = attr.value || "";
          if (name.startsWith("on")) {
            node.removeAttribute(attr.name);
          }
          if (
            (name === "href" || name === "src") &&
            /^\s*javascript:/i.test(value)
          ) {
            node.removeAttribute(attr.name);
          }
          if ((name === "src" || name === "href") && /^\s*data:/i.test(value)) {
            // Allow only data:image with common formats
            if (!/^\s*data:image\/(png|jpeg|jpg|webp|gif);/i.test(value)) {
              node.removeAttribute(attr.name);
            }
          }
        });
        // Recurse
        node.childNodes.forEach((child) => {
          if (child.nodeType === 1) walk(child as Element);
        });
      };
      wrapper.querySelectorAll("*").forEach((el) => walk(el));

      return wrapper.innerHTML;
    } catch {
      return "";
    }
  };

  const safeHtml = useMemo(() => sanitizeHtml(htmlContent), [htmlContent]);

  if (loading)
    return <div className="text-sm text-rocky-textMuted">Cargando…</div>;
  if (!post)
    return (
      <div className="text-sm text-rocky-textMuted">Entrada no encontrada.</div>
    );

  const primaryCategory =
    post.categories && post.categories[0] ? post.categories[0] : null;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <article className="lg:col-span-8 space-y-4">
        <nav className="text-sm text-rocky-textMuted">
          <Link to="/blog" className="hover:underline">
            Blog
          </Link>
          {primaryCategory && (
            <>
              <span className="mx-1">›</span>
              <Link
                to={`/blog?category=${primaryCategory.slug}`}
                className="hover:underline"
              >
                {primaryCategory.name}
              </Link>
            </>
          )}
          <span className="mx-1">›</span>
          <span className="text-rocky-ink">{post.title}</span>
        </nav>

        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="text-sm text-rocky-textMuted">
          {post.author?.name && <span>Por {post.author.name}</span>}
          {post.publishedAt && (
            <span> · {new Date(post.publishedAt).toLocaleDateString()}</span>
          )}
          <span> · {readingTime} min de lectura</span>
        </div>

        {post.coverImage && (
          <div className="rounded-rockyLg overflow-hidden border border-rocky-border">
            <img src={post.coverImage} alt="cover" className="w-full h-auto" />
          </div>
        )}

        {post.excerpt && <p className="text-rocky-textMuted">{post.excerpt}</p>}

        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <span className="text-sm text-rocky-textMuted">Compartir:</span>
          <a
            className="text-sm text-rocky-primary hover:underline"
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              shareUrl
            )}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <a
            className="text-sm text-rocky-primary hover:underline"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            className="text-sm text-rocky-primary hover:underline"
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              post.title + " " + shareUrl
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <button
            className="text-sm text-rocky-primary hover:underline"
            onClick={() => {
              navigator.clipboard?.writeText(shareUrl);
            }}
          >
            Copiar enlace
          </button>
        </div>
      </article>

      <aside className="lg:col-span-4 space-y-6">
        <div className="rounded-rockyLg border border-rocky-border bg-white p-rockyLg">
          {" "}
          <h3 className="font-semibold mb-3">Entradas recientes</h3>{" "}
          <ul className="-my-2 divide-y divide-rocky-border">
            {" "}
            {recent.map((p) => (
              <li key={p.id} className="py-2">
                {" "}
                <Link
                  to={`/blog/${p.slug}`}
                  className="flex items-start gap-3 group"
                >
                  {" "}
                  <div className="min-w-0 flex-1">
                    {" "}
                    <div className="text-sm text-rocky-ink group-hover:underline line-clamp-2">
                      {p.title}
                    </div>{" "}
                    <div className="text-xs text-rocky-textMuted">
                      {p.publishedAt
                        ? new Date(p.publishedAt).toLocaleDateString()
                        : ""}
                    </div>{" "}
                  </div>{" "}
                </Link>{" "}
              </li>
            ))}{" "}
            {recent.length === 0 && (
              <li className="py-2 text-sm text-rocky-textMuted">
                Aún no hay entradas
              </li>
            )}{" "}
          </ul>{" "}
        </div>
        <Link
          to="/blog"
          className="inline-block text-sm text-rocky-primary hover:underline"
        >
          ← Volver al blog
        </Link>
      </aside>
    </div>
  );
};

export default BlogPostPage;
