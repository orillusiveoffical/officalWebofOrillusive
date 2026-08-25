import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  BarChart3,
  Globe,
  Smartphone,
  Monitor,
  TrendingUp,
  RefreshCw,
  Users,
  Eye,
  ArrowUpRight
} from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { token } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [token]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.analytics);
      } else {
        setError(json.error || 'Failed to load traffic analytics');
      }
    } catch (err: any) {
      console.error('[ADMIN ANALYTICS ERROR]', err);
      setError(err?.message || 'Network error fetching analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <RefreshCw className="size-8 animate-spin text-[#4F6B85] mb-3" />
        <p className="text-xs font-mono text-[#888888]">AGGREGATING TRAFFIC TELEMETRY...</p>
      </div>
    );
  }

  const traffic = data?.traffic || [];
  const sources = data?.sources || [];
  const devices = data?.devices || [];
  const topPages = data?.topPages || [];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <BarChart3 className="size-6 text-emerald-400" />
            <span>Traffic & Audience Analytics</span>
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Visitor behavior breakdown, device telemetry, referrer sources, and top pages.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between gap-4 text-xs">
          <span>{error}</span>
          <button
            onClick={fetchAnalytics}
            className="px-3 py-1.5 rounded-xl bg-amber-500 text-[#111111] font-bold hover:bg-amber-400 transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* Traffic Trend Chart (CSS Bar Visuals) */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Daily Traffic Overview</h3>
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
            <TrendingUp className="size-3.5" />
            <span>+18.6% Growth</span>
          </span>
        </div>

        <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4 border-b border-white/10">
          {traffic.map((t: any) => (
            <div key={t.day} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="text-[10px] font-mono text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {t.visitors}
              </div>
              <div
                className="w-full bg-gradient-to-t from-[#4F6B85] to-[#6B90B5] rounded-t-xl transition-all duration-300 group-hover:brightness-125"
                style={{ height: `${Math.max(20, (t.visitors / 3000) * 100)}%` }}
              />
              <span className="text-[10px] font-mono text-[#888888]">{t.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Channels & Device Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sources */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Globe className="size-4 text-[#4F6B85]" />
            <span>Traffic Channels</span>
          </h3>

          <div className="space-y-3 pt-2">
            {sources.map((s: any) => (
              <div key={s.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">{s.name}</span>
                  <span className="text-[#888888] font-mono">{s.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-[#4F6B85] rounded-full"
                    style={{ width: `${s.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Eye className="size-4 text-[#C9A84C]" />
            <span>Most Visited Pages</span>
          </h3>

          <div className="divide-y divide-white/5 pt-1">
            {topPages.map((p: any) => (
              <div key={p.path} className="py-2.5 flex items-center justify-between text-xs">
                <span className="font-mono text-white">{p.path}</span>
                <span className="font-mono text-[#888888] font-bold">{p.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
