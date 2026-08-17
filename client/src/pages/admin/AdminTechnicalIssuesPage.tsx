import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  AlertTriangle,
  Bug,
  CheckCircle,
  Clock,
  Code2,
  Terminal,
  Search,
  Filter,
  Plus,
  Loader2,
  ChevronDown,
  ChevronUp,
  UserCheck
} from 'lucide-react';

export const AdminTechnicalIssuesPage: React.FC = () => {
  const { token, user } = useAuth();
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // New Issue Modal
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [stackTrace, setStackTrace] = useState('');
  const [severity, setSeverity] = useState('HIGH');
  const [endpoint, setEndpoint] = useState('/api/subscriptions');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, [token]);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/issues', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIssues(data.issues || []);
      }
    } catch (err) {
      console.error('[ADMIN ISSUES ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/issues/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          note: `Status updated by ${user?.name}`
        })
      });
      if (res.ok) fetchIssues();
    } catch (err) {
      alert('Failed to update issue status');
    }
  };

  const handleCreateIssue = async () => {
    if (!title || !errorMsg) return;
    setCreating(true);
    try {
      const res = await fetch('/api/admin/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          errorMsg,
          stackTrace,
          severity,
          endpoint
        })
      });
      if (res.ok) {
        setNewModalOpen(false);
        setTitle('');
        setErrorMsg('');
        setStackTrace('');
        fetchIssues();
      }
    } catch (err) {
      alert('Failed to log issue');
    } finally {
      setCreating(false);
    }
  };

  const filtered = issues.filter((i) => {
    if (severityFilter && i.severity !== severityFilter) return false;
    if (statusFilter && i.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Bug className="size-6 text-red-400" />
            <span>Technical Error Center</span>
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Real-time frontend, backend, database query, and API telemetry issue tracking.
          </p>
        </div>

        <button
          onClick={() => setNewModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md"
        >
          <Plus className="size-4" />
          <span>Report Issue</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#141414] border border-white/10">
        <div className="flex items-center gap-3">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-[#1C1C1C] border border-white/10 text-xs font-semibold text-white px-3 py-2 rounded-xl focus:outline-none"
          >
            <option value="">All Severities</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1C1C1C] border border-white/10 text-xs font-semibold text-white px-3 py-2 rounded-xl focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">OPEN</option>
            <option value="INVESTIGATING">INVESTIGATING</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="IGNORED">IGNORED</option>
          </select>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-[#888888]">
            <Loader2 className="size-6 animate-spin mx-auto mb-2 text-red-400" />
            Loading error telemetry logs...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-[#888888] rounded-3xl bg-[#141414] border border-white/10">
            No technical issues reported matching filter criteria.
          </div>
        ) : (
          filtered.map((issue) => {
            const isExpanded = expandedId === issue._id;

            return (
              <div
                key={issue._id}
                className={`rounded-2xl bg-[#141414] border transition-all ${
                  issue.severity === 'CRITICAL'
                    ? 'border-red-500/40 bg-red-950/10'
                    : 'border-white/10'
                }`}
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : issue._id)}
                  className="p-4 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                      issue.severity === 'CRITICAL'
                        ? 'bg-red-500 text-white animate-pulse'
                        : issue.severity === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : issue.severity === 'MEDIUM'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-white/10 text-[#AAAAAA]'
                    }`}>
                      {issue.severity}
                    </span>

                    <div>
                      <h3 className="text-xs font-bold text-white">{issue.title}</h3>
                      <div className="flex items-center gap-3 text-[10px] text-[#888888] font-mono mt-0.5">
                        <span>Endpoint: <strong className="text-[#CCCCCC]">{issue.endpoint}</strong></span>
                        <span>Occurrences: <strong className="text-white">{issue.occurrences}</strong></span>
                        <span>First: {new Date(issue.firstDetected).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={issue.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleUpdateStatus(issue._id, e.target.value)}
                      className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-xl border focus:outline-none ${
                        issue.status === 'RESOLVED'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : issue.status === 'INVESTIGATING'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-white/10 text-white border-white/20'
                      }`}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="INVESTIGATING">INVESTIGATING</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="IGNORED">IGNORED</option>
                    </select>

                    {isExpanded ? <ChevronUp className="size-4 text-[#888888]" /> : <ChevronDown className="size-4 text-[#888888]" />}
                  </div>
                </div>

                {/* Expanded Stack Trace Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-white/10 bg-black/40 space-y-4 rounded-b-2xl text-xs font-mono">
                    <div>
                      <div className="text-[10px] font-bold text-[#888888] uppercase mb-1">Error Description:</div>
                      <div className="p-3 rounded-xl bg-black/60 text-red-300 border border-red-500/20">
                        {issue.errorMsg}
                      </div>
                    </div>

                    {issue.stackTrace && (
                      <div>
                        <div className="text-[10px] font-bold text-[#888888] uppercase mb-1">Stack Trace:</div>
                        <pre className="p-3 rounded-xl bg-black/80 text-emerald-400 text-[11px] overflow-x-auto border border-white/10 whitespace-pre-wrap leading-relaxed max-h-48">
                          {issue.stackTrace}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* New Issue Report Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#161616] border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">Log Technical Issue</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#888888] font-mono uppercase mb-1">Issue Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Database Connection Pool Timeout"
                  className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#888888] font-mono uppercase mb-1">Severity & Endpoint:</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                  <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    className="bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#888888] font-mono uppercase mb-1">Error Message:</label>
                <textarea
                  rows={3}
                  value={errorMsg}
                  onChange={(e) => setErrorMsg(e.target.value)}
                  className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#888888] font-mono uppercase mb-1">Stack Trace:</label>
                <textarea
                  rows={4}
                  value={stackTrace}
                  onChange={(e) => setStackTrace(e.target.value)}
                  className="w-full bg-[#222222] border border-white/15 text-white p-3 rounded-xl focus:outline-none font-mono text-[10px]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setNewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#AAAAAA] hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={creating}
                onClick={handleCreateIssue}
                className="px-5 py-2.5 rounded-xl bg-red-500 text-xs font-bold text-white hover:bg-red-600"
              >
                Log Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTechnicalIssuesPage;
