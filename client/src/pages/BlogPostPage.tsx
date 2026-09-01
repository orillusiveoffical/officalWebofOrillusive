import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Eye, Tag, Share2, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { buildBreadcrumbSchema } from '../data/seoData';

interface BlogPostData {
  _id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  category: string;
  author: string;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
}

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/blogs/${slug}`);
      const data = await res.json();
      if (res.ok && data.success && data.post) {
        setPost(data.post);
      } else {
        setError(data.error || 'Article not found');
      }
    } catch (err) {
      setError('Unable to load article content.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Simple clean markdown formatter for standard blog content
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className="my-6 p-4 sm:p-5 rounded-2xl bg-[#111111] text-[#F7F7F5] font-mono text-xs overflow-x-auto border border-white/10 shadow-inner leading-relaxed">
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-2xl sm:text-4xl font-bold text-[#111111] mt-10 mb-4 font-sans tracking-tight">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl sm:text-2xl font-bold text-[#111111] mt-8 mb-3 font-sans tracking-tight">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg sm:text-xl font-bold text-[#111111] mt-6 mb-2 font-sans tracking-tight">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="my-5 pl-4 sm:pl-5 border-l-2 border-[#4F6B85] italic text-[#555555] text-sm leading-relaxed bg-[#4F6B85]/05 py-2.5 rounded-r-xl">
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={index} className="ml-5 list-disc text-xs sm:text-sm text-[#444444] leading-relaxed my-1.5 font-normal">
            {line.replace(/^[-*]\s+/, '')}
          </li>
        );
      } else if (line.trim() === '') {
        // empty line
      } else {
        elements.push(
          <p key={index} className="my-4 text-xs sm:text-base text-[#444444] leading-relaxed font-normal">
            {line}
          </p>
        );
      }
    });

    if (codeBuffer.length > 0) {
      elements.push(
        <pre key="code-end" className="my-6 p-4 sm:p-5 rounded-2xl bg-[#111111] text-[#F7F7F5] font-mono text-xs overflow-x-auto border border-white/10">
          <code>{codeBuffer.join('\n')}</code>
        </pre>
      );
    }

    return elements;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center justify-center pt-20">
        <div className="size-8 rounded-full border-2 border-[#4F6B85]/20 border-t-[#4F6B85] animate-spin mb-3" />
        <p className="text-xs font-mono text-[#888888] uppercase tracking-widest">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] pt-36 pb-20 px-4 sm:px-8 text-center font-sans">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-[#111111]">Article Not Found</h2>
          <p className="text-xs text-[#777777]">{error || 'The requested article does not exist or has been unpublished.'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2C1E16] transition-all"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  const pageSEO = {
    title: `${post.seoTitle || post.title} — Orillusive Engineering Blog`,
    description: post.seoDescription || post.summary || 'Senior engineering and architectural insights from Orillusive.',
    keywords: post.tags?.length ? post.tags.join(', ') : 'software engineering, system architecture, SaaS development, Orillusive',
    canonicalPath: `/blog/${post.slug}`,
    ogType: 'article' as const,
    breadcrumbName: post.title,
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || post.seoDescription,
    author: {
      '@type': 'Person',
      name: post.author || 'Orillusive Engineering'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Orillusive',
      logo: {
        '@type': 'ImageObject',
        url: 'https://orillusive.com/logo.jpg'
      }
    },
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.createdAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://orillusive.com/blog/${post.slug}`
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] min-h-screen font-sans">
      <SEOHead page={pageSEO} />
      <StructuredData data={articleSchema} id="article-schema" />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
        id="breadcrumb"
      />

      <article className="mx-auto max-w-4xl space-y-8 sm:space-y-10">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#555555] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>All Articles</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-5 border-b border-black/10 pb-8 sm:pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] text-[11px] font-bold uppercase">
              {post.category || 'Software Engineering'}
            </span>
            <span className="text-xs font-mono text-[#888888] flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })
                : new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
            </span>
            <span className="text-xs font-mono text-[#888888] flex items-center gap-1">
              <Eye className="size-3.5" />
              {post.views || 1} views
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-sans text-[#111111] leading-[1.08] tracking-tight">
            {post.title}
          </h1>

          {post.summary && (
            <p className="text-base sm:text-xl text-[#555555] leading-relaxed font-normal">
              {post.summary}
            </p>
          )}

          {/* Author & Share Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="size-9 rounded-full bg-[#4F6B85]/10 text-[#4F6B85] flex items-center justify-center font-bold text-xs">
                <User className="size-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111111]">{post.author || 'Orillusive Studio'}</p>
                <p className="text-[10px] text-[#777777] font-mono">Senior Engineering Insights</p>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/10 text-xs font-bold uppercase tracking-wider text-[#555555] hover:text-[#111111] hover:border-black/20 transition-all shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied URL</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Main Article Body */}
        <div className="prose max-w-none text-[#333333] font-sans">
          {renderFormattedContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t border-black/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#888888] mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white border border-black/10 text-[11px] font-semibold text-[#555555]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Next Step / Consultation Callout Box */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-[#111111] text-[#F7F7F5] space-y-5 border border-white/10 shadow-xl">
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="size-4" />
            <span>Engineered by Orillusive</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white">
            Have a scalable software product to build?
          </h3>
          <p className="text-xs sm:text-sm text-[#AAAAAA] max-w-xl leading-relaxed">
            We partner with ambitious enterprises and founders worldwide to architect, design, and engineer mission-critical digital systems.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#F0F0EC] transition-all shadow-md"
            >
              <span>Consult With Engineers</span>
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all"
            >
              <span>Explore More Field Notes</span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
