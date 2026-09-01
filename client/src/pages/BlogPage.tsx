import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, User, Clock, Search, BookOpen, Tag } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../data/seoData';

interface BlogPostItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  author: string;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
  views: number;
}

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      const res = await fetch(`/api/blogs?${params.toString()}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setPosts(data.posts || []);
      } else {
        setError(data.error || 'Failed to load blog posts');
      }
    } catch (err) {
      setError('Unable to load articles due to a network connection issue.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Architecture', 'Software Engineering', 'SaaS Development', 'AI & Cloud'];

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      (post.summary && post.summary.toLowerCase().includes(q)) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] min-h-screen font-sans">
      <SEOHead page={PAGE_SEO.blog} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
        id="breadcrumb"
      />

      <div className="mx-auto max-w-[1360px] space-y-10 sm:space-y-14">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85] mb-3 sm:mb-4">
              Field Notes & Engineering Journal
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-sans font-bold text-[#111111] leading-tight mb-4 sm:mb-6">
              Engineering Insights <br />
              <span className="text-[#4F6B85]">From The Studio.</span>
            </h1>
            <p className="text-sm sm:text-lg leading-relaxed text-[#555555]">
              In-depth articles, system architecture patterns, and technical field notes authored by Orillusive engineers.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full lg:w-72">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 size-4 text-[#888888]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-black/10 text-xs text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#4F6B85] shadow-2xs transition-all"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-black/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-[#F7F7F5] shadow-xs'
                  : 'bg-white border border-black/10 text-[#555555] hover:text-[#111111] hover:border-black/20'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Blog Post List */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="size-8 rounded-full border-2 border-[#4F6B85]/20 border-t-[#4F6B85] animate-spin mx-auto" />
            <p className="text-xs font-mono text-[#888888] uppercase tracking-widest">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="p-8 rounded-3xl bg-white border border-black/10 text-center space-y-4 max-w-lg mx-auto">
            <p className="text-xs text-red-500 font-semibold">{error}</p>
            <button
              onClick={fetchPosts}
              className="px-6 py-2 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider"
            >
              Retry
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center space-y-4 rounded-3xl bg-white border border-black/10 p-8">
            <BookOpen className="size-10 text-[#4F6B85]/40 mx-auto" />
            <h3 className="text-lg font-bold text-[#111111]">No Articles Found</h3>
            <p className="text-xs text-[#777777] max-w-sm mx-auto">
              {searchQuery ? `No articles matching "${searchQuery}".` : 'No published articles in this category yet. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col justify-between rounded-3xl bg-white border border-black/10 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#4F6B85]/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-[#888888]">
                    <span className="px-3 py-1 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] font-bold uppercase font-sans">
                      {post.category || 'Engineering'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 text-[#888888]" />
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-bold font-sans text-[#111111] group-hover:text-[#4F6B85] transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs leading-relaxed text-[#555555] line-clamp-3">
                    {post.summary || 'Read full engineering breakdown and architecture insights in this article.'}
                  </p>
                </div>

                {/* Footer Metadata & Read Button */}
                <div className="mt-8 pt-5 border-t border-black/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-[#777777] text-[11px]">
                    <User className="size-3.5 text-[#4F6B85]" />
                    <span className="font-semibold truncate max-w-[120px]">{post.author || 'Orillusive'}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#111111] group-hover:text-[#4F6B85] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
