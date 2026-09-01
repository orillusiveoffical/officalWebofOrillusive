import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from './context/AuthContext';
import { SplashLoader } from './components/SplashLoader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';

// Lazy-loaded Public Sub-pages
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));

// Lazy-loaded CV Maker Suite
const CVMakerPage = lazy(() => import('./pages/cv/CVMakerPage').then((m) => ({ default: m.CVMakerPage })));
const CVDashboardPage = lazy(() => import('./pages/cv/CVDashboardPage').then((m) => ({ default: m.CVDashboardPage })));
const CVBuilderPage = lazy(() => import('./pages/cv/CVBuilderPage').then((m) => ({ default: m.CVBuilderPage })));
const CVCreditsPage = lazy(() => import('./pages/cv/CVCreditsPage').then((m) => ({ default: m.CVCreditsPage })));

// Lazy-loaded Admin Operations Control Center
const AdminRoute = lazy(() => import('./components/admin/AdminRoute').then((m) => ({ default: m.AdminRoute })));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
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

// Lazy-loaded Modals
const DiscoveryModal = lazy(() => import('./components/DiscoveryModal').then((m) => ({ default: m.DiscoveryModal })));
const AuthModal = lazy(() => import('./components/AuthModal').then((m) => ({ default: m.AuthModal })));
const MyBookingsModal = lazy(() => import('./components/MyBookingsModal').then((m) => ({ default: m.MyBookingsModal })));

function PageFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F7F5]">
      <div className="size-8 rounded-full border-2 border-[#4F6B85]/20 border-t-[#4F6B85] animate-spin" />
    </div>
  );
}

function AppContent() {
  const [splashLoading, setSplashLoading] = useState(() => {
    // Show splash once per browsing session to keep subsequent page loads ultra fast
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
    <div id="top" className="min-h-screen bg-[#F7F7F5] text-[#111111] selection:bg-[#4F6B85] selection:text-white">
      {/* Non-blocking Entrance Splash Screen */}
      <AnimatePresence>
        {splashLoading && <SplashLoader onComplete={() => setSplashLoading(false)} />}
      </AnimatePresence>

      {/* Main App Layout — Immediately rendered to allow instant browser LCP paint */}
      {!isNoHeaderFooter && (
        <Header 
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenAuth={() => setAuthOpen(true)}
          onOpenMyBookings={() => setMyBookingsOpen(true)}
        />
      )}

      <main>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage onOpenInquiry={() => setInquiryOpen(true)} />} />
            <Route path="/cv-maker" element={<CVMakerPage onOpenAuth={() => setAuthOpen(true)} />} />
            <Route path="/cv-maker/dashboard" element={<CVDashboardPage onOpenAuth={() => setAuthOpen(true)} />} />
            <Route path="/cv-maker/builder" element={<CVBuilderPage onOpenAuth={() => setAuthOpen(true)} />} />
            <Route path="/cv-maker/builder/:id" element={<CVBuilderPage onOpenAuth={() => setAuthOpen(true)} />} />
            <Route path="/cv-maker/credits" element={<CVCreditsPage />} />
            <Route path="/services" element={<ServicesPage onOpenInquiry={() => setInquiryOpen(true)} />} />
            <Route path="/projects" element={<ProjectsPage onOpenInquiry={() => setInquiryOpen(true)} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/pricing" element={<PricingPage onOpenInquiry={() => setInquiryOpen(true)} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />

            {/* Internal Operations Control Center Protected Routes */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
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
          </Routes>
        </Suspense>
      </main>

      {!isNoHeaderFooter && <Footer />}

      {/* On-demand Modals */}
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
      <BrowserRouter>
        <ScrollToTop />
        <SpeedInsights />
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

