import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from './context/AuthContext';
import { SplashLoader } from './components/SplashLoader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DiscoveryModal } from './components/DiscoveryModal';
import { AuthModal } from './components/AuthModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CVMakerPage } from './pages/cv/CVMakerPage';
import { CVDashboardPage } from './pages/cv/CVDashboardPage';
import { CVBuilderPage } from './pages/cv/CVBuilderPage';
import { CVCreditsPage } from './pages/cv/CVCreditsPage';

// Internal Admin Dashboard Components
import { AdminRoute } from './components/admin/AdminRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminBlogPage } from './pages/admin/AdminBlogPage';
import { AdminTechnicalIssuesPage } from './pages/admin/AdminTechnicalIssuesPage';
import { AdminSystemHealthPage } from './pages/admin/AdminSystemHealthPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminContactsPage } from './pages/admin/AdminContactsPage';
import { AdminNewsletterPage } from './pages/admin/AdminNewsletterPage';
import { AdminSubscriptionsPage } from './pages/admin/AdminSubscriptionsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminTeamPage } from './pages/admin/AdminTeamPage';

function AppContent() {
  const [loading, setLoading] = useState(true);
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
      {/* Splash Loader */}
      <AnimatePresence>
        {loading && <SplashLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {!isNoHeaderFooter && (
            <Header 
              onOpenInquiry={() => setInquiryOpen(true)}
              onOpenAuth={() => setAuthOpen(true)}
              onOpenMyBookings={() => setMyBookingsOpen(true)}
            />
          )}

          <main>
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
          </main>

          {!isNoHeaderFooter && <Footer />}

          <DiscoveryModal
            isOpen={inquiryOpen}
            onClose={() => setInquiryOpen(false)}
          />

          <AuthModal
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
          />

          <MyBookingsModal
            isOpen={myBookingsOpen}
            onClose={() => setMyBookingsOpen(false)}
            onOpenNewInquiry={() => setInquiryOpen(true)}
          />
        </>
      )}
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

