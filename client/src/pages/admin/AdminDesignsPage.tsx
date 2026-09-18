import React, { useState, useEffect } from 'react';
import {
  Layers,
  Search,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  Star,
  Eye,
  CheckCircle2,
  X,
  Code2,
  Sparkles,
  RefreshCw,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { UIDesign } from '../../types/design';
import { INITIAL_DESIGNS } from '../../data/designsData';

export const AdminDesignsPage: React.FC = () => {
  const [designs, setDesigns] = useState<UIDesign[]>(INITIAL_DESIGNS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [editingDesign, setEditingDesign] = useState<UIDesign | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'meta' | 'code' | 'prompts'>('meta');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/designs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
      });
      const data = await res.json();
      if (data.success && data.designs) {
        setDesigns(data.designs);
      }
    } catch (err) {
      // Fallback to local state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const filteredDesigns = designs.filter((d) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        d.title.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (categoryFilter !== 'all' && d.category !== categoryFilter) return false;
    if (tierFilter === 'free' && d.isPremium) return false;
    if (tierFilter === 'premium' && !d.isPremium) return false;
    return true;
  });

  const handleTogglePremium = async (design: UIDesign) => {
    const updated = !design.isPremium;
    setDesigns((prev) => prev.map((d) => (d.slug === design.slug ? { ...d, isPremium: updated } : d)));
    notify(`Set ${design.title} to ${updated ? 'Pro Tier' : 'Free Library'}`);
  };

  const handleToggleFeatured = async (design: UIDesign) => {
    const updated = !design.isFeatured;
    setDesigns((prev) => prev.map((d) => (d.slug === design.slug ? { ...d, isFeatured: updated } : d)));
    notify(`Toggled featured status for ${design.title}`);
  };

  const handleDelete = (slug: string) => {
    if (window.confirm(`Are you sure you want to delete '${slug}'?`)) {
      setDesigns((prev) => prev.filter((d) => d.slug !== slug));
      notify(`Design '${slug}' deleted successfully.`);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDesign) return;
    setDesigns((prev) => prev.map((d) => (d.slug === editingDesign.slug ? editingDesign : d)));
    setEditingDesign(null);
    notify(`Design '${editingDesign.title}' saved successfully.`);
  };

  const categories = Array.from(new Set(designs.map((d) => d.category)));

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Notifications */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-3 ${
            notification.type === 'success'
              ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
              : 'bg-red-900 text-red-100 border-red-700'
          }`}
        >
          <CheckCircle2 size={15} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Layers size={22} className="text-[#4F6B85]" />
            UI Designs Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage production UI library components, inspect React/HTML code, and configure authentic AI prompts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDesigns}
            className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl border border-white/10 transition-colors"
            title="Refresh list"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-md hover:bg-gray-100 transition-colors"
          >
            <Plus size={14} /> Add New UI Design
          </button>
        </div>
      </div>

      {/* Stats Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#14161A] border border-white/10 rounded-2xl">
          <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Total Designs</p>
          <p className="text-2xl font-bold text-white mt-1">{designs.length}</p>
        </div>
        <div className="p-4 bg-[#14161A] border border-white/10 rounded-2xl">
          <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Free Library</p>
          <p className="text-2xl font-bold text-white mt-1">
            {designs.filter((d) => !d.isPremium).length}
          </p>
        </div>
        <div className="p-4 bg-[#14161A] border border-white/10 rounded-2xl">
          <p className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Pro Tier</p>
          <p className="text-2xl font-bold text-white mt-1">
            {designs.filter((d) => d.isPremium).length}
          </p>
        </div>
        <div className="p-4 bg-[#14161A] border border-white/10 rounded-2xl">
          <p className="text-[10px] uppercase font-bold tracking-wider text-[#4F6B85]">Featured</p>
          <p className="text-2xl font-bold text-white mt-1">
            {designs.filter((d) => d.isFeatured).length}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#14161A] border border-white/10 rounded-2xl p-3 text-xs">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-full sm:w-80">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, slug, tag..."
            className="bg-transparent outline-none text-white w-full placeholder:text-gray-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as any)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
          >
            <option value="all">All Tiers</option>
            <option value="free">Free Only</option>
            <option value="premium">Pro Only</option>
          </select>
        </div>
      </div>

      {/* Designs Table */}
      <div className="bg-[#14161A] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-gray-400 uppercase text-[10px] tracking-wider font-semibold">
              <th className="p-4">Design Title / Slug</th>
              <th className="p-4">Category</th>
              <th className="p-4">Tier</th>
              <th className="p-4">Code Readiness</th>
              <th className="p-4">Prompts</th>
              <th className="p-4">Views</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredDesigns.map((d) => (
              <tr key={d.slug} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-white text-xs">{d.title}</p>
                  <p className="font-mono text-[10px] text-gray-500 mt-0.5">{d.slug}</p>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium">
                    {d.category}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleTogglePremium(d)}
                    className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 transition-colors ${
                      d.isPremium
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {d.isPremium ? <Lock size={10} /> : <Unlock size={10} />}
                    {d.isPremium ? 'Pro' : 'Free'}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <span className={`px-1.5 py-0.5 rounded ${d.reactCode ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                      React
                    </span>
                    <span className={`px-1.5 py-0.5 rounded ${d.htmlCode ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                      HTML
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] font-semibold flex items-center gap-1 ${d.reactPrompt ? 'text-emerald-400' : 'text-gray-500'}`}>
                    <Sparkles size={11} /> {d.reactPrompt ? 'Authentic' : 'Pending'}
                  </span>
                </td>
                <td className="p-4 font-mono font-semibold text-gray-300">
                  {d.metrics?.views || 0}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleToggleFeatured(d)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      d.isFeatured
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'border-white/10 text-gray-500 hover:text-white'
                    }`}
                    title="Toggle featured status"
                  >
                    <Star size={13} fill={d.isFeatured ? 'currentColor' : 'none'} />
                  </button>

                  <button
                    onClick={() => setEditingDesign(d)}
                    className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    title="Edit design"
                  >
                    <Edit2 size={13} />
                  </button>

                  <button
                    onClick={() => handleDelete(d.slug)}
                    className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Delete design"
                  >
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Design Modal */}
      {editingDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#14161A] border border-white/10 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Edit UI Design: {editingDesign.title}</h3>
                <p className="font-mono text-xs text-gray-400">{editingDesign.slug}</p>
              </div>
              <button onClick={() => setEditingDesign(null)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('meta')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'meta' ? 'bg-white text-black' : 'text-gray-400'}`}
              >
                Metadata
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'code' ? 'bg-white text-black' : 'text-gray-400'}`}
              >
                React & HTML Code
              </button>
              <button
                onClick={() => setActiveTab('prompts')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'prompts' ? 'bg-white text-black' : 'text-gray-400'}`}
              >
                AI Prompts
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              {activeTab === 'meta' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-400 mb-1">Design Title</label>
                    <input
                      type="text"
                      value={editingDesign.title}
                      onChange={(e) => setEditingDesign({ ...editingDesign, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingDesign.description}
                      onChange={(e) => setEditingDesign({ ...editingDesign, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingDesign.category}
                        onChange={(e) => setEditingDesign({ ...editingDesign, category: e.target.value as any })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Style</label>
                      <select
                        value={editingDesign.style}
                        onChange={(e) => setEditingDesign({ ...editingDesign, style: e.target.value as any })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                      >
                        <option value="saas">SaaS</option>
                        <option value="minimal">Minimal</option>
                        <option value="luxury">Luxury</option>
                        <option value="modern">Modern</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-3 font-mono">
                  <div>
                    <label className="block text-gray-400 mb-1 font-sans">React Source Code (.tsx)</label>
                    <textarea
                      rows={6}
                      value={editingDesign.reactCode || ''}
                      onChange={(e) => setEditingDesign({ ...editingDesign, reactCode: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-emerald-400 text-[11px] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 font-sans">HTML Markup (.html)</label>
                    <textarea
                      rows={4}
                      value={editingDesign.htmlCode || ''}
                      onChange={(e) => setEditingDesign({ ...editingDesign, htmlCode: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-blue-400 text-[11px] outline-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'prompts' && (
                <div className="space-y-3 font-mono">
                  <div>
                    <label className="block text-gray-400 mb-1 font-sans">React AI Generation Prompt</label>
                    <textarea
                      rows={6}
                      value={editingDesign.reactPrompt || ''}
                      onChange={(e) => setEditingDesign({ ...editingDesign, reactPrompt: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-amber-300 text-[11px] outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDesign(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-white text-black font-semibold shadow-md hover:bg-gray-100"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
