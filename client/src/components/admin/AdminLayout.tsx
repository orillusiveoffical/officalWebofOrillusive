import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isSuperAdmin, isDeveloper, isAnalytics } from '../../utils/roles';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Mail,
  FileText,
  AlertTriangle,
  Activity,
  BarChart3,
  FileCheck,
  Shield,
  FileSpreadsheet,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  Database,
  Cpu
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Keyboard shortcut Ctrl+K / Cmd+K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const role = user?.role || 'client';

  // Navigation Items Config with Role Permissions
  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, allowed: true }
      ]
    },
    {
      title: 'BUSINESS & OPERATIONS',
      items: [
        { name: 'Users & Credits', path: '/admin/users', icon: Users, allowed: isSuperAdmin(role) },
        { name: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard, allowed: isDeveloper(role) },
        { name: 'Contacts & Inquiries', path: '/admin/contacts', icon: Mail, allowed: isSuperAdmin(role) },
        { name: 'Newsletter', path: '/admin/newsletter', icon: SendIcon, allowed: isSuperAdmin(role) }
      ]
    },
    {
      title: 'CONTENT CMS',
      items: [
        { name: 'Blog CMS', path: '/admin/blog', icon: FileText, allowed: isDeveloper(role) }
      ]
    },
    {
      title: 'TECHNICAL & INFRASTRUCTURE',
      items: [
        { name: 'Technical Issues', path: '/admin/issues', icon: AlertTriangle, allowed: isDeveloper(role) },
        { name: 'System & DB Health', path: '/admin/health', icon: Activity, allowed: isDeveloper(role) || isAnalytics(role) }
      ]
    },
    {
      title: 'ANALYTICS & REPORTS',
      items: [
        { name: 'Traffic Analytics', path: '/admin/analytics', icon: BarChart3, allowed: isAnalytics(role) },
        { name: 'Reports Generator', path: '/admin/reports', icon: FileSpreadsheet, allowed: isAnalytics(role) }
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { name: 'Team & Roles', path: '/admin/team', icon: Shield, allowed: isSuperAdmin(role) },
        { name: 'Audit Logs', path: '/admin/audit-logs', icon: FileCheck, allowed: isSuperAdmin(role) }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E0E0E0] font-sans flex flex-col md:flex-row selection:bg-[#4F6B85] selection:text-white">
      {/* Mobile Top Header Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-white/10 sticky top-0 z-40">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-[#4F6B85] text-white flex items-center justify-center font-bold text-xs">
            O
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-white">ORILLUSIVE ADMIN</span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-[#A0A0A0] hover:text-white"
        >
          {mobileSidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-30 h-screen w-64 bg-[#121212] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Studio Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="size-9 rounded-full bg-gradient-to-br from-[#4F6B85] to-[#111111] border border-white/20 flex items-center justify-center shadow-md">
                <Sparkles className="size-4 text-[#C9A84C]" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-white font-mono">
                  ORILLUSIVE<span className="text-[#4F6B85]">.</span>
                </div>
                <div className="text-[10px] text-[#888888] font-mono uppercase tracking-wider">CONTROL CENTER</div>
              </div>
            </Link>
          </div>

          {/* User Profile Card */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="min-w-0 flex-1 pr-2">
              <div className="text-xs font-bold text-white truncate">{user?.name}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-[#4F6B85]/20 text-[#6B90B5] border border-[#4F6B85]/30">
                  {user?.role}
                </span>
              </div>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-white/10 transition-colors"
              title="Open Public Website"
            >
              <ExternalLink className="size-3.5" />
            </a>
          </div>

          {/* Nav Links */}
          <div className="px-3 py-2 space-y-4 overflow-y-auto max-h-[calc(100vh-210px)] custom-scrollbar">
            {navSections.map((section) => {
              const visibleItems = section.items.filter((item) => item.allowed);
              if (visibleItems.length === 0) return null;

              return (
                <div key={section.title} className="space-y-1">
                  <div className="px-3 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#666666]">
                    {section.title}
                  </div>
                  {visibleItems.map((item) => {
                    const IconComp = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin'}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                            isActive
                              ? 'bg-[#4F6B85] text-white font-bold shadow-md'
                              : 'text-[#A0A0A0] hover:text-white hover:bg-white/5'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComp className="size-4" />
                          <span>{item.name}</span>
                        </div>
                        {isActive && <ChevronRight className="size-3 text-white/70" />}
                      </NavLink>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Logout Bottom */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/10 text-xs font-bold text-[#A0A0A0] transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="size-3.5" />
            <span>Sign Out Control Center</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Operational Navigation Bar */}
        <header className="sticky top-0 z-20 bg-[#121212]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            {/* Global Search Bar (Ctrl + K) */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-[#888888] hover:border-white/20 hover:text-[#CCCCCC] transition-all"
            >
              <div className="flex items-center gap-2">
                <Search className="size-3.5" />
                <span>Search users, blogs, inquiries, issues...</span>
              </div>
              <kbd className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-mono text-[#888888] border border-white/10">
                Ctrl + K
              </kbd>
            </button>
          </div>

          {/* System Indicators */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM OPERATIONAL</span>
            </div>

            <Link
              to="/"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>Main Site</span>
              <ExternalLink className="size-3" />
            </Link>
          </div>
        </header>

        {/* Dashboard Main Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl bg-[#161616] border border-white/15 p-4 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 flex-1">
                <Search className="size-4 text-[#4F6B85]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Global Search (Users, Inquiries, Issues, Blogs)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none"
                />
              </div>
              <button onClick={() => setSearchModalOpen(false)} className="text-[#888888] hover:text-white">
                <X className="size-4" />
              </button>
            </div>

            <div className="text-xs text-[#888888] py-6 text-center font-mono">
              {searchQuery ? `Searching for "${searchQuery}" across database...` : 'Type to search users, contacts, issues, or blogs...'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Icon placeholder
const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export default AdminLayout;
