import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export function App() {
  const [loading, setLoading] = useState(true);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SpeedInsights />
        <div id="top" className="min-h-screen bg-[#F7F7F5] text-[#111111] selection:bg-[#4F6B85] selection:text-white">
          {/* Splash Loader */}
          <AnimatePresence>
            {loading && <SplashLoader onComplete={() => setLoading(false)} />}
          </AnimatePresence>

          {!loading && (
            <>
              <Header 
                onOpenInquiry={() => setInquiryOpen(true)}
                onOpenAuth={() => setAuthOpen(true)}
                onOpenMyBookings={() => setMyBookingsOpen(true)}
              />

              <main>
                <Routes>
                  <Route path="/" element={<HomePage onOpenInquiry={() => setInquiryOpen(true)} />} />
                  <Route path="/services" element={<ServicesPage onOpenInquiry={() => setInquiryOpen(true)} />} />
                  <Route path="/projects" element={<ProjectsPage onOpenInquiry={() => setInquiryOpen(true)} />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/process" element={<ProcessPage />} />
                  <Route path="/pricing" element={<PricingPage onOpenInquiry={() => setInquiryOpen(true)} />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>

              <Footer />

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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
