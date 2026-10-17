import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import CaseConverter from './components/CaseConverter';
import ThemeToggle from './components/ThemeToggle';
import Toast from './components/Toast';
import { GUIDES_DATA } from './data/guidesData';
const GuideArticleView = lazy(() => import('./components/GuideArticleView'));
const AboutDeveloper = lazy(() => import('./components/AboutDeveloper'));

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    subMessage?: string;
  }>({
    isVisible: false,
    message: '',
  });

  // Client-side router navigation helper
  const navigateTo = useCallback((path: string, hash?: string) => {
    const targetUrl = hash ? `${path}${hash}` : path;
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== path || (hash && window.location.hash !== hash)) {
        window.history.pushState(null, '', targetUrl);
      }
      setCurrentPath(path);

      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  // Listen to browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Match current path to an authoritative guide
  const normalizedPath = currentPath.replace(/\/$/, '') || '/';
  const currentGuide = GUIDES_DATA.find(
    (g) => g.slug === normalizedPath || g.slug === currentPath
  );

  // Sync document title with current view
  useEffect(() => {
    if (currentGuide) {
      document.title = `${currentGuide.title} | CaseConverters.in`;
    } else {
      document.title = 'Free Online Case Converter - UPPERCASE, lowercase, Title Case & Dev Cases | CaseConverters.in';
    }
  }, [currentGuide]);

  const showToast = useCallback((message: string, subMessage?: string) => {
    setToast({
      isVisible: true,
      message,
      subMessage,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const isGuideRoute = currentPath.startsWith('/guide');

  return (
    <div className="app-shell">
      {/* Background Subtle Gradient Glow */}
      <div className="bg-glow" aria-hidden="true" />

      {/* Top SaaS Header / Navigation */}
      <header className="global-header">
        <div className="nav-container">
          <div className="brand-lockup">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="brand-logo"
              aria-label="CaseConverters Home"
            >
              <span className="logo-symbol">
                <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <g transform="matrix(0.475, 0, 0, 0.475, -2.25, 8.44)">
                    <path d="M70 30 L30 150 L65 150 L78 110 L122 110 L126 122 C132 108 142 98 156 94 L156 80 L110 30 Z" fill="#0052cc" />
                    <path d="M85 90 L100 45 L115 90 Z" fill="#ffffff" />
                    <path d="M110 25 L140 55 L125 55 L160 140 L175 140 L135 40 L150 40 Z" fill="#00c2ff" />
                    <path d="M150 150 C125 150 110 135 110 115 C110 95 125 80 150 80 C175 80 190 95 190 115 C190 135 175 150 150 150 Z" fill="#00c2ff" opacity="0.85" />
                    <path d="M150 138 C135 138 125 128 125 115 C125 102 135 92 150 92 C165 92 175 102 175 115 C175 128 165 138 150 138 Z" fill="#ffffff" />
                    <path d="M162 100 L162 148 L174 148 L174 100 Z" fill="#00c2ff" />
                  </g>
                </svg>
              </span>
              <span className="brand-name">
                Case<span className="accent-text">Converters</span>
              </span>
            </a>
            <span className="domain-chip">.in</span>
          </div>

          <nav className="header-nav" aria-label="Main Navigation">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className={`nav-link ${!isGuideRoute ? 'active' : ''}`}
            >
              Tool
            </a>
            <a
              href="/#developer-resources"
              onClick={(e) => {
                e.preventDefault();
                if (isGuideRoute) {
                  navigateTo('/', '#developer-resources');
                } else {
                  const el = document.getElementById('developer-resources');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="nav-link"
            >
              Standards
            </a>
            <a
              href="/#guides"
              onClick={(e) => {
                e.preventDefault();
                if (isGuideRoute) {
                  navigateTo('/', '#guides');
                } else {
                  const el = document.getElementById('guides');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`nav-link ${isGuideRoute ? 'active' : ''}`}
            >
              Guides
            </a>
            <a
              href="/#faq"
              onClick={(e) => {
                e.preventDefault();
                if (isGuideRoute) {
                  navigateTo('/', '#faq');
                } else {
                  const el = document.getElementById('faq');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="nav-link"
            >
              FAQ
            </a>
            <a
              href="/#about-developer"
              onClick={(e) => {
                e.preventDefault();
                if (isGuideRoute) {
                  navigateTo('/', '#about-developer');
                } else {
                  const el = document.getElementById('about-developer');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="nav-link"
            >
              About
            </a>
            <div className="nav-divider" />
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Conditionally Render: Hero + CaseConverter Tool OR Dedicated Guide Article */}
      {currentGuide ? (
        <main className="main-viewport">
          <div className="viewport-container">
            <Suspense fallback={<div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading guide...</div>}>
              <GuideArticleView
                article={currentGuide}
                onBackToTool={() => navigateTo('/')}
                onSelectGuide={(slug) => navigateTo(slug)}
              />
            </Suspense>
          </div>
        </main>
      ) : isGuideRoute ? (
        /* Fallback if user types an invalid guide slug */
        <main className="main-viewport">
          <div className="viewport-container">
            <div className="guide-not-found-card">
              <div className="not-found-icon">🔍</div>
              <h1 className="not-found-title">Guide Not Found</h1>
              <p className="not-found-desc">
                The technical guide you are looking for does not exist or may have moved.
              </p>
              <div className="not-found-actions">
                <button
                  type="button"
                  onClick={() => navigateTo('/')}
                  className="btn-back-home"
                >
                  ← Return to Case Converter Tool
                </button>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <>
          {/* Hero Section with Clean Typography */}
          <section className="hero-section">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-dot" />
                <span>Fast &bull; 100% Client-Side &bull; No Server Logging</span>
              </div>
              <h1 className="hero-title">
                Free Online Text Case Converter
              </h1>
              <p className="hero-subtitle">
                Instantly transform text between <strong>UPPERCASE</strong>, <strong>lowercase</strong>,{' '}
                <strong>Title Case</strong>, and developer conventions like <strong>camelCase</strong>,{' '}
                <strong>snake_case</strong>, <strong>PascalCase</strong>, and <strong>kebab-case</strong> with
                zero server roundtrips.
              </p>
            </div>
          </section>

          {/* Main App Workspace */}
          <main className="main-viewport">
            <div className="viewport-container">
              <CaseConverter
                onCopySuccess={showToast}
                onSelectGuide={(slug) => navigateTo(slug)}
              />
            </div>
          </main>
        </>
      )}

      {/* Global Toast Notification */}
      <Toast
        message={toast.message}
        subMessage={toast.subMessage}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* E-E-A-T "About the Developer" Section */}
      <section className="about-dev-wrapper">
        <div className="viewport-container">
          <Suspense fallback={<div style={{ minHeight: '120px' }} />}>
            <AboutDeveloper />
          </Suspense>
        </div>
      </section>

      {/* Global SaaS Footer */}
      <footer className="global-footer" id="guides">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand-col">
              <div className="brand-lockup">
                <span className="logo-symbol small">
                  <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <g transform="matrix(0.475, 0, 0, 0.475, -2.25, 8.44)">
                      <path d="M70 30 L30 150 L65 150 L78 110 L122 110 L126 122 C132 108 142 98 156 94 L156 80 L110 30 Z" fill="#0052cc" />
                      <path d="M85 90 L100 45 L115 90 Z" fill="#ffffff" />
                      <path d="M110 25 L140 55 L125 55 L160 140 L175 140 L135 40 L150 40 Z" fill="#00c2ff" />
                      <path d="M150 150 C125 150 110 135 110 115 C110 95 125 80 150 80 C175 80 190 95 190 115 C190 135 175 150 150 150 Z" fill="#00c2ff" opacity="0.85" />
                      <path d="M150 138 C135 138 125 128 125 115 C125 102 135 92 150 92 C165 92 175 102 175 115 C175 128 165 138 150 138 Z" fill="#ffffff" />
                      <path d="M162 100 L162 148 L174 148 L174 100 Z" fill="#00c2ff" />
                    </g>
                  </svg>
                </span>
                <span className="brand-name">CaseConverters.in</span>
              </div>
              <p className="footer-tagline">
                The world-class text transformation utility built for modern developers, technical writers,
                editors, and SEO practitioners.
              </p>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-title">Core Formats</span>
              <ul className="footer-links">
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/');
                    }}
                  >
                    UPPERCASE Converter
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/');
                    }}
                  >
                    lowercase Converter
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/');
                    }}
                  >
                    Title Case Converter
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/');
                    }}
                  >
                    Sentence case Utility
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-title">Authoritative Guides</span>
              <ul className="footer-links">
                {GUIDES_DATA.map((guide) => (
                  <li key={guide.id}>
                    <a
                      href={guide.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {guide.title.split(':')[0]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-title">Developer Standards</span>
              <ul className="footer-links">
                <li>
                  <a
                    href="/#developer-resources"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/', '#developer-resources');
                    }}
                  >
                    Python PEP 8 Guide
                  </a>
                </li>
                <li>
                  <a
                    href="/#developer-resources"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/', '#developer-resources');
                    }}
                  >
                    Microsoft C# Conventions
                  </a>
                </li>
                <li>
                  <a
                    href="/#developer-resources"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/', '#developer-resources');
                    }}
                  >
                    Oracle Java Standards
                  </a>
                </li>
                <li>
                  <a
                    href="/#developer-resources"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/', '#developer-resources');
                    }}
                  >
                    Google Developer Style
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright-text">
              &copy; 2026 <a href="https://caseconverters.in/">CaseConverters.in</a>. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Notice</a>
              <span className="sep">&bull;</span>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Design Tokens & Styles */}
      <style>{`
        :root {
          --bg-primary: #f8fafc;
          --bg-secondary: #f1f5f9;
          --bg-tertiary: #e2e8f0;
          --bg-card: #ffffff;
          --bg-card-hover: #fcfcfd;
          --bg-sticky: rgba(255, 255, 255, 0.88);
          --border-subtle: #e2e8f0;
          --border-hover: #cbd5e1;
          --border-focus: #6366f1;
          --text-primary: #0f172a;
          --text-secondary: #334155;
          --text-muted: #475569;
          --accent-primary: #4f46e5;
          --accent-hover: #4338ca;
          --accent-gradient: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          --badge-bg: rgba(79, 70, 229, 0.08);
          --badge-text: #4f46e5;
          --code-bg: #f8fafc;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04);
          --shadow-lg: 0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03);
        }

        [data-theme="dark"] {
          --bg-primary: #090d16;
          --bg-secondary: #0f172a;
          --bg-tertiary: #1e293b;
          --bg-card: #111827;
          --bg-card-hover: #162032;
          --bg-sticky: rgba(17, 24, 39, 0.86);
          --border-subtle: rgba(255, 255, 255, 0.08);
          --border-hover: rgba(255, 255, 255, 0.16);
          --border-focus: #818cf8;
          --text-primary: #f8fafc;
          --text-secondary: #cbd5e1;
          --text-muted: #94a3b8;
          --accent-primary: #6366f1;
          --accent-hover: #4f46e5;
          --accent-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          --badge-bg: rgba(99, 102, 241, 0.15);
          --badge-text: #a5b4fc;
          --code-bg: #0b0f19;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
          --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.35);
          --shadow-lg: 0 20px 48px -8px rgba(0, 0, 0, 0.6);
        }

        .app-shell {
          min-height: 100vh;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          transition: background-color 0.25s ease, color 0.25s ease;
        }

        .bg-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 380px;
          background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.18) 0%, rgba(99, 102, 241, 0) 70%);
          pointer-events: none;
          z-index: 0;
        }

        [data-theme="dark"] .bg-glow {
          background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.28) 0%, rgba(99, 102, 241, 0) 70%);
        }

        /* Top Header Navigation */
        .global-header {
          position: sticky;
          top: 0;
          z-index: 60;
          background: var(--bg-sticky);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
          transition: background-color 0.25s ease, border-color 0.25s ease;
        }

        .nav-container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .brand-lockup {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-primary);
        }

        .logo-symbol {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #ffffff;
          border: 1px solid rgba(0, 82, 204, 0.18);
          box-shadow: 0 2px 8px rgba(0, 82, 204, 0.14), 0 0 0 1px rgba(0, 194, 255, 0.12);
          flex-shrink: 0;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
        }

        .brand-logo:hover .logo-symbol {
          transform: translateY(-1px) scale(1.04);
          box-shadow: 0 4px 14px rgba(0, 194, 255, 0.35);
        }

        .logo-symbol.small {
          width: 28px;
          height: 28px;
          border-radius: 8px;
        }

        .brand-name {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.025em;
        }

        .accent-text {
          color: var(--accent-primary);
        }

        .domain-chip {
          background: var(--bg-tertiary);
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--text-primary);
        }

        .nav-divider {
          width: 1px;
          height: 20px;
          background: var(--border-subtle);
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          z-index: 1;
          padding: 48px 20px 24px;
          text-align: center;
        }

        .hero-content {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--badge-bg);
          border: 1px solid var(--border-subtle);
          color: var(--badge-text);
          padding: 5px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: var(--shadow-sm);
        }

        .hero-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
        }

        .hero-title {
          font-size: 2.85rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0;
          background: linear-gradient(135deg, var(--text-primary) 50%, var(--accent-primary) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.08rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 720px;
          margin: 0;
        }

        .hero-subtitle strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Main Viewport Workspace */
        .main-viewport {
          position: relative;
          z-index: 1;
          padding: 8px 20px 64px;
        }

        .viewport-container {
          max-width: 1160px;
          margin: 0 auto;
        }

        .about-dev-wrapper {
          padding: 16px 20px 48px;
          position: relative;
          z-index: 1;
        }

        .guide-not-found-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 60px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 600px;
          margin: 40px auto;
          box-shadow: var(--shadow-lg);
        }

        .not-found-icon {
          font-size: 3rem;
        }

        .not-found-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin: 0;
          color: var(--text-primary);
        }

        .not-found-desc {
          color: var(--text-muted);
          font-size: 1rem;
          margin: 0;
          max-width: 440px;
        }

        .btn-back-home {
          background: var(--accent-gradient);
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
        }

        .btn-back-home:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
        }

        /* Global Footer */
        .global-footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          padding: 56px 20px 36px;
          position: relative;
          z-index: 1;
        }

        .footer-inner {
          max-width: 1160px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1.2fr 1.2fr 1.6fr;
          gap: 36px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-tagline {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
          max-width: 320px;
        }

        .footer-nav-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-col-title {
          font-size: 0.84rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }

        .footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.88rem;
          transition: color 0.15s ease;
        }

        .footer-links a:hover {
          color: var(--accent-primary);
        }

        .footer-privacy-text {
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .copyright-text a {
          color: inherit;
          text-decoration: none;
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-bottom-links a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-bottom-links a:hover {
          color: var(--text-primary);
        }

        .sep {
          opacity: 0.4;
        }

        @media (max-width: 868px) {
          .hero-title {
            font-size: 2.1rem;
          }
          .hero-subtitle {
            font-size: 0.98rem;
          }
          .footer-top {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 580px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
