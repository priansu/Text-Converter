import React, { useEffect } from 'react';
import { GuideArticleData, GUIDES_DATA } from '../data/guidesData';

interface GuideArticleViewProps {
  article: GuideArticleData;
  onBackToTool: () => void;
  onSelectGuide: (slug: string) => void;
}

export default function GuideArticleView({
  article,
  onBackToTool,
  onSelectGuide,
}: GuideArticleViewProps) {
  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.slug]);

  const otherGuides = GUIDES_DATA.filter((g) => g.id !== article.id);

  return (
    <article className="guide-view-root" itemScope itemType="https://schema.org/TechArticle">
      {/* Top Sticky Navigation Bar */}
      <nav className="guide-top-nav" aria-label="Article navigation">
        <button
          type="button"
          onClick={onBackToTool}
          className="btn-back-tool"
          aria-label="Return to Case Converter Tool"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Case Converter</span>
        </button>
      </nav>

      {/* Main Article Header */}
      <header className="article-header">
        <div className="article-meta-row">
          <span className="article-category-badge">{article.category}</span>
          <span className="meta-sep">&bull;</span>
          <span className="article-read-time">{article.readTime}</span>
          <span className="meta-sep">&bull;</span>
          <span className="article-date">{article.lastUpdated}</span>
        </div>

        <h1 className="article-main-title" itemProp="headline">
          {article.title}
        </h1>

        <p className="article-subtitle" itemProp="description">
          {article.subtitle}
        </p>

        {/* Reference Standard Callout Box */}
        <aside className="source-callout-box" aria-label="Reference Standard">
          <div className="source-callout-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div className="source-callout-content">
            <div className="source-header-line">
              <span className="source-tag">Reference Standard:</span>
              <strong className="source-authority-name">{article.originalSource.authority}</strong>
            </div>
            <p className="source-summary-text">{article.originalSource.summary}</p>
          </div>
        </aside>
      </header>

      {/* Article Body Content */}
      <div className="article-body" itemProp="articleBody">
        {article.sections.map((section, idx) => (
          <section key={idx} className="article-section">
            <h2 className="section-heading">{section.title}</h2>
            <p className="section-paragraph">{section.content}</p>

            {section.callout && (
              <div className="section-callout-note">
                <span className="note-icon">💡</span>
                <p>{section.callout}</p>
              </div>
            )}

            {section.table && (
              <div className="table-wrapper">
                <table className="article-table">
                  <thead>
                    <tr>
                      {section.table.headers.map((h, i) => (
                        <th key={i} scope="col">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.codeExample && (
              <div className="code-example-block">
                {section.codeExample.caption && (
                  <div className="code-caption">
                    <span>{section.codeExample.caption}</span>
                    <span className="code-lang-tag">{section.codeExample.language}</span>
                  </div>
                )}
                <pre className="code-pre">
                  <code>{section.codeExample.code}</code>
                </pre>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Bottom Tool CTA Box */}
      <section className="article-cta-card">
        <div className="cta-content">
          <span className="cta-badge">Ready to convert text?</span>
          <h2 className="cta-title">Test Your Text in CaseConverters Now</h2>
          <p className="cta-desc">
            Instantly transform sentences, code variables, headlines, and data payloads between
            UPPERCASE, lowercase, Title Case, camelCase, snake_case, PascalCase, and kebab-case.
          </p>
        </div>
        <button type="button" onClick={onBackToTool} className="btn-cta-primary">
          <span>Open Case Converter Tool</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </section>

      {/* Recommended Other Guides */}
      <section className="more-guides-section">
        <h2 className="more-guides-title">More Authoritative Formatting Guides</h2>
        <div className="more-guides-grid">
          {otherGuides.slice(0, 3).map((guide) => (
            <div key={guide.id} className="mini-guide-card">
              <span className="mini-guide-cat">{guide.category}</span>
              <h3 className="mini-guide-title">
                <a
                  href={guide.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mini-guide-btn"
                >
                  {guide.title}
                </a>
              </h3>
              <p className="mini-guide-desc">{guide.summary.slice(0, 110)}...</p>
              <div className="mini-card-links">
                <a
                  href={guide.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mini-read-btn"
                >
                  Read Full Guide &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .guide-view-root {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 36px 40px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 36px;
          animation: guideFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .guide-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .btn-back-tool {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          min-height: 44px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-back-tool:hover {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
          transform: translateX(-2px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }



        /* Article Header */
        .article-header {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .article-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.84rem;
          color: var(--text-muted);
          flex-wrap: wrap;
        }

        .article-category-badge {
          background: var(--badge-bg);
          color: var(--badge-text);
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .meta-sep {
          opacity: 0.5;
        }

        .article-main-title {
          font-size: 2.35rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.025em;
          line-height: 1.25;
          margin: 0;
        }

        .article-subtitle {
          font-size: 1.15rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        /* Original Source Callout Box */
        .source-callout-box {
          display: flex;
          gap: 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-left: 4px solid var(--accent-primary);
          border-radius: 12px;
          padding: 20px;
          margin-top: 8px;
        }

        .source-callout-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .source-callout-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .source-header-line {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          font-size: 0.92rem;
        }

        .source-tag {
          color: var(--text-muted);
          font-weight: 500;
        }

        .source-authority-name {
          color: var(--text-primary);
        }

        .source-summary-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0;
        }



        /* Article Body */
        .article-body {
          display: flex;
          flex-direction: column;
          gap: 32px;
          border-top: 1px solid var(--border-subtle);
          padding-top: 32px;
        }

        .article-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .section-heading {
          font-size: 1.55rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.3;
        }

        .section-paragraph {
          font-size: 1.02rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        .section-callout-note {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 0.95rem;
          color: var(--text-primary);
          line-height: 1.6;
        }

        .section-callout-note p {
          margin: 0;
        }

        .table-wrapper {
          overflow-x: auto;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          margin-top: 8px;
        }

        .article-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
          min-width: 600px;
        }

        .article-table th {
          background: var(--bg-secondary);
          color: var(--text-muted);
          font-weight: 600;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .article-table td {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-card);
          color: var(--text-secondary);
        }

        .code-example-block {
          background: var(--code-bg);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 8px;
        }

        .code-caption {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .code-lang-tag {
          text-transform: uppercase;
          background: var(--badge-bg);
          color: var(--badge-text);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.72rem;
        }

        .code-pre {
          padding: 18px;
          margin: 0;
          overflow-x: auto;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--text-primary);
        }

        /* Bottom Tool CTA */
        .article-cta-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .cta-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 600px;
        }

        .cta-badge {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent-primary);
          letter-spacing: 0.05em;
        }

        .cta-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .cta-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        .btn-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--accent-primary);
          color: #ffffff;
          border: none;
          padding: 14px 26px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .btn-cta-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79, 70, 229, 0.45);
        }

        /* More Guides Section */
        .more-guides-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-top: 1px solid var(--border-subtle);
          padding-top: 32px;
        }

        .more-guides-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .more-guides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .mini-guide-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 12px;
        }

        .mini-guide-cat {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent-primary);
        }

        .mini-guide-title {
          font-size: 1.02rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.35;
        }

        .mini-guide-btn {
          background: transparent;
          border: none;
          padding: 0;
          text-align: left;
          color: var(--text-primary);
          font-size: inherit;
          font-weight: inherit;
          cursor: pointer;
          transition: color 0.15s ease;
        }

        .mini-guide-btn:hover {
          color: var(--accent-primary);
        }

        .mini-guide-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        .mini-card-links {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
        }

        .mini-read-btn {
          background: transparent;
          border: none;
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 0.84rem;
          cursor: pointer;
          padding: 0;
        }

        .mini-read-btn:hover {
          text-decoration: underline;
        }



        @keyframes guideFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .guide-view-root {
            padding: 22px 18px;
          }

          .article-main-title {
            font-size: 1.85rem;
          }

          .source-callout-box {
            flex-direction: column;
            gap: 10px;
          }

          .article-cta-card {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-cta-primary {
            justify-content: center;
          }
        }
      `}</style>
    </article>
  );
}
