/* Minimal client for Blog & Forum public endpoints */

const API_BASE = import.meta.env.VITE_API_URL || "https://rocky-dog-collab-api.fly.dev/api";

function qs(params: Record<string, any>) {
  const cleaned: Record<string, any> = {};
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== "") cleaned[k] = v;
  });
  const s = new URLSearchParams(cleaned).toString();
  return s ? `?${s}` : "";
}

export const blogAPI = {
  listPosts: async (params?: { search?: string; category?: string; tag?: string; page?: number; limit?: number; sort?: string }) => {
    const resp = await fetch(`${API_BASE}/blog/posts${qs(params || {})}`);
    return resp.json();
  },
  getPost: async (slug: string) => {
    const resp = await fetch(`${API_BASE}/blog/posts/${slug}`);
    return resp.json();
  },
  listComments: async (postId: string, params?: { page?: number; limit?: number }) => {
    const resp = await fetch(`${API_BASE}/blog/posts/${postId}/comments${qs(params || {})}`);
    return resp.json();
  },
  listCategoriesWithCounts: async () => {
    const resp = await fetch(`${API_BASE}/blog/categories-with-counts`);
    return resp.json();
  },
};

export const forumAPI = {
  listCategories: async () => {
    const resp = await fetch(`${API_BASE}/forum/categories`);
    return resp.json();
  },
  listCategoriesWithCounts: async () => {
    const resp = await fetch(`${API_BASE}/forum/categories-with-counts`);
    return resp.json();
  },
  listTopics: async (params?: { categoryId?: string; search?: string; page?: number; limit?: number; sort?: string }) => {
    const resp = await fetch(`${API_BASE}/forum/topics${qs(params || {})}`);
    return resp.json();
  },
  getTopic: async (slug: string) => {
    const resp = await fetch(`${API_BASE}/forum/topics/${slug}`);
    return resp.json();
  },
  listPosts: async (topicId: string, params?: { page?: number; limit?: number }) => {
    const resp = await fetch(`${API_BASE}/forum/topics/${topicId}/posts${qs(params || {})}`);
    return resp.json();
  },
};
