import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from './context/AuthContext';
import { TokenProvider } from './context/TokenContext';
import { SplashLoader } from './components/SplashLoader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Core UI Platform Pages (Lazy Loaded)
const DesignsCatalogPage = lazy(() =>
  import('./pages/DesignsCatalogPage').then((m) => ({ default: m.DesignsCatalogPage }))
);
const DesignDetailPage = lazy(() =>
  import('./pages/DesignDetailPage').then((m) => ({ default: m.DesignDetailPage }))
);
const PricingPlansPage = lazy(() =>
  import('./pages/PricingPlansPage').then((m) => ({ default: m.PricingPlansPage }))
);
const CategoriesPage = lazy(() =>
  import('./pages/CategoriesPage').then((m) => ({ default: m.CategoriesPage }))
);

// Public Studio Pages
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// CV Maker Suite
const CVMakerPage = lazy(() => import('./pages/cv/CVMakerPage').then((m) => ({ default: m.CVMakerPage })));
const CVDashboardPage = lazy(() => import('./pages/cv/CVDashboardPage').then((m) => ({ default: m.CVDashboardPage })));
const CVBuilderPage = lazy(() => import('./pages/cv/CVBuilderPage').then((m) => ({ default: m.CVBuilderPage })));
const CVCreditsPage = lazy(() => import('./pages/cv/CVCreditsPage').then((m) => ({ default: m.CVCreditsPage })));

// Admin Operations Control Center
const AdminRoute = lazy(() => import('./components/admin/AdminRoute').then((m) => ({ default: m.AdminRoute })));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const AdminDesignsPage = lazy(() => import('./pages/admin/AdminDesignsPage').then((m) => ({ default: m.AdminDesignsPage })));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage })));
const AdminBlogPage = lazy(() => import('./pages/admin/AdminBlogPage').then((m) => ({ default: m.AdminBlogPage })));
const AdminTechnicalIssuesPage = lazy(() => import('./pages/admin/AdminTechnicalIssuesPage').then((m) => ({ default: m.AdminTechnicalIssuesPage })));
const AdminSystemHealthPage = lazy(() => import('./pages/admin/AdminSystemHealthPage').then((m) => ({ default: m.AdminSystemHealthPage })));
const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminAnalyticsPage').then((m) => ({ default: m.AdminAnalyticsPage })));
const AdminContactsPage = lazy(() => import('./pages/admin/AdminContactsPage').then((m) => ({ default: m.AdminContactsPage })));
const AdminNewsletterPage = lazy(() => import('./pages/admin/AdminNewsletterPage').then((m) => ({ default: m.AdminNewsletterPage })));
const AdminSubscriptionsPage = lazy(() => import('./pages/admin/AdminSubscriptionsPage').then((m) => ({ default: m.AdminSubscriptionsPage })));
const AdminReportsPage = lazy(() => import('./pages/admin/AdminReportsPage').then((m) => ({ default: m.AdminReportsPage })));
const AdminAuditLogsPage = lazy(() => import('./pages/admin/AdminAuditLogsPage').then((m) => ({ default: m.AdminAuditLogsPage })));
const AdminTeamPage = lazy(() => import('./pages/admin/AdminTeamPage').then((m) => ({ default: m.AdminTeamPage })));

// Modals
const DiscoveryModal = lazy(() => import('./components/DiscoveryModal').then((m) => ({ default: m.DiscoveryModal })));
const AuthModal = lazy(() => import('./components/AuthModal').then((m) => ({ default: m.AuthModal })));
const MyBookingsModal = lazy(() => import('./components/MyBookingsModal').then((m) => ({ default: m.MyBookingsModal })));

function PageFallback() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');

  return (
    <div className={`min-h-[70vh] flex items-center justify-center ${isAdmin ? 'bg-[#0D0D0D]' : 'bg-[#FBFBFA]'}`}>
      <div className={`size-8 rounded-full border-2 ${isAdmin ? 'border-white/10 border-t-[#C9A84C]' : 'border-black/20 border-t-black'} animate-spin`} />
    </div>
  );
}

function AppContent() {
  const [splashLoading, setSplashLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('orillusive_splash_shown');
      if (seen) return false;
      sessionStorage.setItem('orillusive_splash_shown', '1');
      return true;
    }
    return false;
  });

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);

  const location = useLocation();
  const isNoHeaderFooter =
    location.pathname.startsWith('/cv-maker/builder') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/dashboard');

  return (
    <div id="top" className="min-h-screen bg-[#FBFBFA] text-[#111111] selection:bg-[#4F6B85] selection:text-white flex flex-col justify-between">
      {/* Entrance Splash Loader */}
      <AnimatePresence>
        {splashLoading && <SplashLoader onComplete={() => setSplashLoading(false)} />}
      </AnimatePresence>

      {/* Main App Navigation Bar */}
      {!isNoHeaderFooter && (
        <Header
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenAuth={() => setAuthOpen(true)}
          onOpenMyBookings={() => setMyBookingsOpen(true)}
        />
      )}

      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Primary UI Design Platform Routes */}
            <Route path="/" element={<DesignsCatalogPage />} />
            <Route path="/designs" element={<DesignsCatalogPage />} />
            <Route path="/design/:slug" element={<DesignDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/pricing" element={<PricingPlansPage />} />

            {/* Public Studio Subpages */}
            <Route path="/services" element={<ServicesPage onOpenInquiry={() => setInquiryOpen(true)} />} />
            <Route path="/projects" element={<ProjectsPage onOpenInquiry={() => setInquiryOpen(true)} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* CV Maker SaaS Module */}
            <Route path="/cv-maker" element={<CVMakerPage onOpenAuth={() => setAuthOpen(true)} />} />
            <Route path="/cv-maker/dashboard" element={<CVDashboardPage onOpenAuth={() => setAuthOpen(true)} />} />
            <Route path="/cv-maker/builder" element={<CVBuilderPage onOpenAuth={() => setAuthOpen(true)} />} />
            <Route path="/cv-maker/builder/:id" element={<CVBuilderPage onOpenAuth={() => setAuthOpen(true)} />} />
            <Route path="/cv-maker/credits" element={<CVCreditsPage />} />

            {/* Canonical 301-equivalent Client Redirects */}
            <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
            <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
            <Route path="/products" element={<Navigate to="/projects" replace />} />
            <Route path="/products/autiva" element={<Navigate to="/projects" replace />} />
            <Route path="/products/autiva/*" element={<Navigate to="/projects" replace />} />

            {/* Operations Control Center Protected Routes */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/designs" element={<AdminDesignsPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/blog" element={<AdminBlogPage />} />
                <Route path="/admin/issues" element={<AdminTechnicalIssuesPage />} />
                <Route path="/admin/health" element={<AdminSystemHealthPage />} />
                <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                <Route path="/admin/contacts" element={<AdminContactsPage />} />
                <Route path="/admin/newsletter" element={<AdminNewsletterPage />} />
                <Route path="/admin/subscriptions" element={<AdminSubscriptionsPage />} />
                <Route path="/admin/reports" element={<AdminReportsPage />} />
                <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
                <Route path="/admin/team" element={<AdminTeamPage />} />
              </Route>
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isNoHeaderFooter && <Footer />}

      {/* Modals */}
      <Suspense fallback={null}>
        {inquiryOpen && (
          <DiscoveryModal
            isOpen={inquiryOpen}
            onClose={() => setInquiryOpen(false)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {authOpen && (
          <AuthModal
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {myBookingsOpen && (
          <MyBookingsModal
            isOpen={myBookingsOpen}
            onClose={() => setMyBookingsOpen(false)}
            onOpenNewInquiry={() => setInquiryOpen(true)}
          />
        )}
      </Suspense>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <TokenProvider>
        <BrowserRouter>
          <ScrollToTop />
          <SpeedInsights />
          <AppContent />
        </BrowserRouter>
      </TokenProvider>
    </AuthProvider>
  );
}

export default App;
