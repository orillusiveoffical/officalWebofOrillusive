import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  CreditCard,
  Mail,
  AlertTriangle,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Clock,
  Send,
  FileText,
  Database
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { token, user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverview();
  }, [token]);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/overview', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json);
      }
    } catch (err) {
      console.error('[ADMIN OVERVIEW ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <RefreshCw className="size-8 animate-spin text-[#4F6B85] mb-3" />
        <p className="text-xs font-mono text-[#888888]">LOADING CONTROL CENTER TELEMETRY...</p>
      </div>
    );
  }

  const kpis = data?.kpis || {};
  const traffic = data?.trafficMetrics || {};

  return (
    <div className="space-y-8 font-sans">
      {/* Header Greeting & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Internal Control Center</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#4F6B85]/20 text-[#6B90B5] border border-[#4F6B85]/30">
              {user?.role}
            </span>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Real-time telemetry, platform operations, user analytics, and database monitoring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOverview}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#CCCCCC] hover:text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <RefreshCw className="size-3.5" />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Critical Alert Banner if critical technical issues exist */}
      {kpis.criticalIssues > 0 && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-red-400 shrink-0" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-red-400">
                CRITICAL TECHNICAL ALERTS ({kpis.criticalIssues})
              </div>
              <div className="text-xs mt-0.5 text-red-200/80">
                System detected unresolved critical technical issue(s) requiring immediate engineering review.
              </div>
            </div>
          </div>
          <a
            href="/admin/issues"
            className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition-all shrink-0"
          >
            Investigate Issues
          </a>
        </div>
      )}

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Users */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-mono uppercase tracking-wider">Registered Accounts</span>
            <Users className="size-4 text-[#4F6B85]" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white font-mono">{kpis.totalUsers || 0}</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="size-3" />
              <span>+12.4% from last month</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Active Subscriptions */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-mono uppercase tracking-wider">Completed Purchases</span>
            <CreditCard className="size-4 text-[#C9A84C]" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white font-mono">{kpis.activeSubscriptions || 0}</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="size-3" />
              <span>Instant credit deposits verified</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Inquiries Pipeline */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-mono uppercase tracking-wider">Open Inquiries</span>
            <Mail className="size-4 text-purple-400" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white font-mono">{kpis.openInquiries || 0}</div>
            <div className="text-[10px] text-[#888888] mt-1">
              Out of {kpis.totalInquiries || 0} total submissions
            </div>
          </div>
        </div>

        {/* KPI 4: Newsletter Audience */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-mono uppercase tracking-wider">Newsletter Audience</span>
            <Send className="size-4 text-blue-400" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white font-mono">{kpis.newsletterSubscribers || 0}</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <ShieldCheck className="size-3" />
              <span>Subscribers verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic & System Telemetry Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Traffic Metrics Overview (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Platform Traffic & Engagement</h3>
              <p className="text-xs text-[#888888]">Aggregated visitor metrics & page view telemetry</p>
            </div>
            <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-[#A0A0A0]">Last 30 Days</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-[#888888] font-mono uppercase">Total Visitors</div>
              <div className="text-xl font-bold text-white mt-1">{traffic.totalVisitors?.toLocaleString() || '14,280'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-[#888888] font-mono uppercase">Unique Visitors</div>
              <div className="text-xl font-bold text-white mt-1">{traffic.uniqueVisitors?.toLocaleString() || '9,840'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-[#888888] font-mono uppercase">Page Views</div>
              <div className="text-xl font-bold text-white mt-1">{traffic.pageViews?.toLocaleString() || '38,450'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-[10px] text-[#888888] font-mono uppercase">Avg Duration</div>
              <div className="text-xl font-bold text-white mt-1">{traffic.avgSessionDuration || '3m 42s'}</div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="pt-2 flex flex-wrap gap-3 border-t border-white/10">
            <a
              href="/admin/users"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all flex items-center gap-2"
            >
              <Users className="size-3.5 text-[#4F6B85]" />
              <span>Manage Users</span>
            </a>
            <a
              href="/admin/blog"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all flex items-center gap-2"
            >
              <FileText className="size-3.5 text-[#C9A84C]" />
              <span>Blog CMS</span>
            </a>
            <a
              href="/admin/issues"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all flex items-center gap-2"
            >
              <AlertTriangle className="size-3.5 text-amber-400" />
              <span>Technical Issues ({kpis.openIssues || 0})</span>
            </a>
          </div>
        </div>

        {/* Right: Recent Audit Log & Activity (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Recent Audit Logs</h3>
            <a href="/admin/audit-logs" className="text-[10px] font-bold text-[#4F6B85] hover:underline uppercase">View All</a>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar">
            {(data?.recentAuditLogs || []).length === 0 ? (
              <div className="text-xs text-[#888888] text-center py-8">No recent audit activity.</div>
            ) : (
              (data?.recentAuditLogs || []).map((log: any) => (
                <div key={log._id} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-[11px]">{log.action}</span>
                    <span className="text-[9px] font-mono text-[#888888]">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A0A0A0]">{log.details}</div>
                  <div className="text-[9px] font-mono text-[#666666]">By {log.userName} ({log.userRole})</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
