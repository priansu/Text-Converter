import React from 'react';

export default function AboutDeveloper() {
  return (
    <section className="about-dev-section" id="about-developer" aria-label="About the Developer and Technical Architecture">
      <div className="about-dev-card">
        {/* Left: Avatar with Verified Status */}
        <div className="dev-avatar-wrapper">
          <div className="dev-avatar-ring">
            <div className="dev-avatar-placeholder" role="img" aria-label="Developer Headshot">
              <svg
                className="dev-silhouette"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="verified-shield" title="Verified Authoritative Creator">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm-2 16l-4-4 1.41-1.41L10 15.17l6.59-6.59L18 10l-8 8z" />
              </svg>
            </div>
          </div>
          <span className="dev-status-pill">
            <span className="live-dot" />
            Lead Maintainer
          </span>
        </div>

        {/* Center: Author Bio & E-E-A-T Signals */}
        <div className="dev-info-col">
          <div className="dev-meta-header">
            <div className="name-and-title">
              <h3 className="dev-name">Priansu Kumar Rai</h3>
              <span className="dev-title">Full-Stack Engineer &amp; Open-Source Creator</span>
            </div>
            <div className="eeat-trust-chip" title="Google E-E-A-T Compliance Signal">
              <span>Experience &bull; Expertise &bull; Trust</span>
            </div>
          </div>

          <p className="dev-bio">
            Specializes in high-performance web systems, client-side algorithms, and developer tooling.
            Engineered <strong>CaseConverters.in</strong> as a modern, zero-latency text utility built
            strictly with privacy-first client execution — guaranteeing that your proprietary code,
            data payloads, and written content never touch a remote server.
          </p>

          <div className="trust-tags-row">
            <span className="trust-tag">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Zero-Telemetry Architecture
            </span>
            <span className="trust-tag">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              PEP 8 &amp; ECMAScript Aligned
            </span>
            <span className="trust-tag">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Zero CLS Core Web Vitals
            </span>
          </div>
        </div>

        {/* Right: Direct Profile & Inquiries Contact Links */}
        <div className="dev-actions-col">
          <a
            href="https://www.linkedin.com/in/priansu-rai?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dev-link linkedin-btn"
            title="Connect with Priansu Kumar Rai on LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
            </svg>
            <span>LinkedIn Profile</span>
            <svg className="external-arr" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>

          <a
            href="mailto:priansurai@gmail.com"
            className="btn-dev-link email-btn"
            title="Email Priansu Kumar Rai directly"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Direct Inquiries</span>
          </a>
        </div>
      </div>

      <style>{`
        .about-dev-section {
          contain: layout;
        }

        .about-dev-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 28px 32px;
          box-shadow: var(--shadow-lg);
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 28px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .about-dev-card:hover {
          border-color: var(--border-hover);
        }

        .dev-avatar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .dev-avatar-ring {
          position: relative;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          padding: 3px;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.28);
        }

        .dev-avatar-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          color: var(--text-muted);
        }


        .dev-silhouette {
          color: var(--accent-primary);
          z-index: 1;
        }

        .verified-shield {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #10b981;
          color: #ffffff;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--bg-card);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .dev-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-tertiary);
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          white-space: nowrap;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .dev-info-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .dev-meta-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .name-and-title {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }

        .dev-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.015em;
        }

        .dev-title {
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .eeat-trust-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--badge-bg);
          color: var(--badge-text);
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          border: 1px solid var(--border-subtle);
        }

        .dev-bio {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .dev-bio strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .trust-tags-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          padding-top: 4px;
        }

        .trust-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .trust-tag svg {
          color: var(--accent-primary);
        }

        .dev-actions-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 170px;
        }

        .btn-dev-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .linkedin-btn {
          background: rgba(10, 102, 194, 0.12);
          color: #004182;
          border: 1px solid rgba(10, 102, 194, 0.3);
        }

        [data-theme="dark"] .linkedin-btn {
          color: #70b5f9;
          border-color: rgba(112, 181, 249, 0.3);
        }

        .linkedin-btn:hover {
          background: #0a66c2;
          color: #ffffff;
          border-color: #0a66c2;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(10, 102, 194, 0.35);
        }

        .external-arr {
          opacity: 0.6;
          transition: transform 0.15s ease;
        }

        .linkedin-btn:hover .external-arr {
          transform: translate(2px, -2px);
          opacity: 1;
        }

        .email-btn {
          background: var(--badge-bg);
          color: var(--accent-primary);
          border: 1px solid var(--border-subtle);
        }

        .email-btn:hover {
          background: var(--accent-primary);
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        @media (max-width: 900px) {
          .about-dev-card {
            grid-template-columns: 1fr;
            text-align: left;
            gap: 20px;
          }

          .dev-avatar-wrapper {
            flex-direction: row;
            justify-content: flex-start;
          }

          .dev-actions-col {
            flex-direction: row;
            width: 100%;
          }

          .btn-dev-link {
            flex: 1;
          }
        }

        @media (max-width: 600px) {
          .dev-actions-col {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
