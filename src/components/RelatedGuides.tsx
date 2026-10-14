import React from 'react';
import { GUIDES_DATA, GuideArticleData } from '../data/guidesData';

interface RelatedGuidesProps {
  onSelectGuide?: (slug: string) => void;
}

export default function RelatedGuides(_props: RelatedGuidesProps = {}) {
  return (
    <aside className="seo-resources-hub" aria-label="Formatting Guides & Technical Resources">
      <div className="resources-header">
        <div className="resources-badge">
          <span className="dot-pulse" />
          <span>Topical Knowledge Hub</span>
        </div>
        <h2 className="resources-title">Formatting Guides &amp; Deep-Dive Technical Articles</h2>
        <p className="resources-subtitle">
          Comprehensive developer guides, linguistic conventions, and case-transformation tutorials
          designed to optimize your engineering workflows and editorial precision.
        </p>
      </div>

      <nav className="guides-nav" aria-label="Text Formatting and Casing Guides Navigation">
        <div className="guides-grid">
          {GUIDES_DATA.map((guide: GuideArticleData) => (
            <article key={guide.id} className="guide-card">
              <div className="guide-card-top">
                <div className="guide-icon-pill">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div className="guide-meta-pill">
                  <span className="guide-category">{guide.category}</span>
                  <span className="meta-sep">&bull;</span>
                  <span className="guide-read-time">{guide.readTime}</span>
                </div>
              </div>

              <div className="guide-card-body">
                <h3 className="guide-title">
                  <a
                    href={guide.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="guide-title-link"
                    title={`Open ${guide.title} in a new tab`}
                  >
                    {guide.title}
                  </a>
                </h3>
                <p className="guide-excerpt">{guide.summary.slice(0, 160)}...</p>
              </div>

              <div className="guide-card-footer">
                <a
                  href={guide.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guide-read-more"
                  title={`Open ${guide.title} in a new tab`}
                >
                  <span>Read Full Guide</span>
                  <svg
                    className="arrow-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </nav>

      <style>{`
        .seo-resources-hub {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .resources-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        .resources-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--badge-bg);
          color: var(--badge-text);
          border: 1px solid var(--border-subtle);
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .dot-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25);
        }

        .resources-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.3;
        }

        .resources-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
          max-width: 720px;
          line-height: 1.55;
          margin: 0;
        }

        .guides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .guide-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.24s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.24s ease;
        }

        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg), 0 0 0 1px var(--accent-primary);
          border-color: var(--accent-primary);
          background: var(--bg-card-hover);
        }

        .guide-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .guide-icon-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          color: var(--accent-primary);
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .guide-card:hover .guide-icon-pill {
          transform: scale(1.08);
          background: var(--badge-bg);
        }

        .guide-meta-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .guide-category {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .meta-sep {
          opacity: 0.5;
        }

        .guide-card-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .guide-title {
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.35;
          margin: 0;
          color: var(--text-primary);
          letter-spacing: -0.015em;
        }

        .guide-title-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .guide-card:hover .guide-title-link {
          color: var(--accent-primary);
        }

        .guide-excerpt {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .guide-card-footer {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }

        .guide-read-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--accent-primary);
          text-decoration: none;
          cursor: pointer;
          transition: gap 0.2s ease, color 0.15s ease;
        }

        .guide-read-more:hover {
          color: var(--accent-hover);
          gap: 9px;
        }

        .arrow-icon {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .guide-card:hover .arrow-icon {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .guides-grid {
            grid-template-columns: 1fr;
          }
          .guide-card {
            padding: 20px;
          }
        }
      `}</style>
    </aside>
  );
}
