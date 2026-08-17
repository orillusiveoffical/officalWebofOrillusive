import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Archive,
  Search,
  Loader2,
  X,
  Sparkles
} from 'lucide-react';

export const AdminBlogPage: React.FC = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [tags, setTags] = useState('React, TypeScript, SaaS');
  const [status, setStatus] = useState('DRAFT');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error('[ADMIN BLOG ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setTitle('');
    setContent('');
    setSummary('');
    setCategory('Engineering');
    setTags('Software, Cloud, Architecture');
    setStatus('DRAFT');
    setSeoTitle('');
    setSeoDescription('');
    setModalOpen(true);
  };

  const handleOpenEdit = (post: any) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setSummary(post.summary || '');
    setCategory(post.category || 'Engineering');
    setTags(Array.isArray(post.tags) ? post.tags.join(', ') : '');
    setStatus(post.status || 'DRAFT');
    setSeoTitle(post.seoTitle || post.title);
    setSeoDescription(post.seoDescription || post.summary || '');
    setModalOpen(true);
  };

  const handleSavePost = async () => {
    if (!title || !content) {
      alert('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title,
        content,
        summary,
        category,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        status,
        seoTitle,
        seoDescription
      };

      const url = editingPost ? `/api/admin/blogs/${editingPost._id}` : '/api/admin/blogs';
      const method = editingPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setModalOpen(false);
        fetchPosts();
      } else {
        alert(data.error || 'Failed to save post');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving post');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchPosts();
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="size-6 text-[#C9A84C]" />
            <span>Blog CMS & Editorial Studio</span>
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Publish, edit, and schedule technical articles, release notes, and engineering insights.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#4F6B85] hover:bg-[#3B5268] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md"
        >
          <Plus className="size-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Blog List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs font-mono text-[#888888]">
            <Loader2 className="size-6 animate-spin mx-auto mb-2 text-[#4F6B85]" />
            Loading blog posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs font-mono text-[#888888] rounded-3xl bg-[#141414] border border-white/10 p-8">
            No blog articles published yet. Click "New Article" to create your first post.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="p-5 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-white/10 text-[#CCCCCC]">
                    {post.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    post.status === 'PUBLISHED'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : post.status === 'REVIEW'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-white/10 text-[#888888]'
                  }`}>
                    {post.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-2">{post.title}</h3>
                <p className="text-xs text-[#888888] mt-2 line-clamp-3">{post.summary || post.content}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#888888]">
                <span className="font-mono text-[10px]">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white transition-all"
                    title="Edit Article"
                  >
                    <Edit className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                    title="Delete Article"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Article Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-[#161616] border border-white/15 p-6 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingPost ? 'Edit Blog Article' : 'Create New Article'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#888888] hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#888888] font-mono uppercase mb-1">Article Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scaling Real-Time Software Architectures"
                  className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#888888] font-mono uppercase mb-1">Category:</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#888888] font-mono uppercase mb-1">Publish Status:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#888888] font-mono uppercase mb-1">Article Content (Markdown / HTML Supported):</label>
                <textarea
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write post content here..."
                  className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none font-mono text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[#888888] font-mono uppercase mb-1">Tags (Comma Separated):</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#AAAAAA] hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                onClick={handleSavePost}
                className="px-6 py-2.5 rounded-xl bg-[#4F6B85] text-xs font-bold text-white hover:bg-[#3B5268] flex items-center gap-2"
              >
                {saving ? <Loader2 className="size-4 animate-spin" /> : 'Save Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage;
