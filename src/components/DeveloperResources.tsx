import React from 'react';

interface ResourceGuide {
  id: string;
  name: string;
  authority: string;
  url?: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
}

const DEVELOPER_RESOURCES: ResourceGuide[] = [
  {
    id: 'python-pep8',
    name: 'Python (PEP 8 Style Guide)',
    authority: 'Python Software Foundation',
    url: 'https://pep8.org/',
    badge: 'Official PEP 8',
    description:
      'The definitive style guide for Python code. Dictates strict naming conventions including snake_case for functions and variables, PascalCase for classes, and SCREAMING_SNAKE_CASE for global constants. Enforces precise rules around avoiding extraneous whitespace immediately inside parentheses, brackets, or braces, handling slice colons, and formatting function calls.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'csharp-standards',
    name: 'C# Coding Standards',
    authority: 'Microsoft .NET Documentation',
    url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions',
    badge: 'Microsoft Standard',
    description:
      'Official Microsoft guidelines establishing PascalCase for class names, method signatures, properties, namespaces, and public constants. Conversely, specifies camelCase for local variable declarations, private fields, and method arguments to optimize readability and maintain enterprise codebases.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'java-guidelines',
    name: 'Java Programming Guidelines',
    authority: 'Oracle Technology Network',
    url: 'https://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html',
    badge: 'Oracle Java Standard',
    description:
      'Oracle naming conventions requiring package names to be in strictly all-lowercase reverse-domain format (com.example.app). Mandates UpperCamelCase (PascalCase) for class and interface types, lowerCamelCase for variables and methods, and UPPERCASE with underscores for constants.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 19v-3M10 19v-7M14 19v-4M18 19v-9" />
        <line x1="2" y1="19" x2="22" y2="19" />
      </svg>
    ),
  },
  {
    id: 'general-it-naming',
    name: 'General IT Naming Conventions',
    authority: 'Industry Open Architecture',
    badge: 'Industry Standard',
    description:
      'Standardized cross-platform conventions for modern software engineering and systems administration. Defines camelCase (capitalizing subsequent words without spaces) for frontend scripting, PascalCase (capitalizing all words) for components and classes, and kebab-case (hyphen-delimited lowercase) for URL slugs, CLI flags, and filesystem naming to avoid POSIX path bugs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'w3c-manual-of-style',
    name: 'W3C Manual of Style',
    authority: 'World Wide Web Consortium',
    url: 'https://www.w3.org/guide/manual-of-style/',
    badge: 'Web Standard',
    description:
      'The World Wide Web Consortium editorial and technical manual. Emphasizes using locale-neutral representations of data values, choosing inclusive examples for global accessibility, using standard semantic HTML markup instead of inventing ad-hoc syntax, and adhering to strict lowercase formatting for web attributes and CSS properties.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function DeveloperResources() {
  return (
    <section
      id="developer-resources"
      className="dev-resources-section"
      aria-label="Official Developer Resources & Open Style Guides"
    >
      <div className="section-header">
        <div className="section-badge">
          <span className="badge-glow-dot" />
          <span>External Authority Hub</span>
        </div>
        <h2 className="section-title">Official Developer Resources &amp; Open Style Guides</h2>
        <p className="section-subtitle">
          Leading engineering organizations, language designers, and web standards bodies enforce
          strict string casing conventions. Explore the official open-source documentation below:
        </p>
      </div>

      <div className="resources-grid">
        {DEVELOPER_RESOURCES.map((resource) => (
          <article key={resource.id} className="resource-card">
            <div className="card-top">
              <div className="resource-icon-box">{resource.icon}</div>
              <span className="authority-pill">{resource.badge}</span>
            </div>

            <div className="card-content">
              <h3 className="resource-heading">
                {resource.url ? (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-resource-link"
                    title={`Open ${resource.name} in a new tab`}
                  >
                    <span>{resource.name}</span>
                    <svg
                      className="external-icon"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ) : (
                  <span>{resource.name}</span>
                )}
              </h3>
              <span className="source-label">{resource.authority}</span>
              <p className="resource-desc">{resource.description}</p>
            </div>

            {resource.url && (
              <div className="card-footer">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-doc-link"
                >
                  <span>View Official Guide</span>
                  <svg
                    width="14"
                    height="14"
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
            )}
          </article>
        ))}
      </div>

      <style>{`
        .dev-resources-section {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 32px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .section-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        .section-badge {
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

        .badge-glow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25);
        }

        .section-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.3;
          margin: 0;
        }

        .section-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 760px;
          margin: 0;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .resource-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.22s ease;
        }

        .resource-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-md), 0 0 0 1px var(--accent-primary);
          background: var(--bg-card-hover);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .resource-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          color: var(--accent-primary);
        }

        .authority-pill {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 3px 8px;
          border-radius: 6px;
          background: var(--badge-bg);
          color: var(--badge-text);
          border: 1px solid var(--border-subtle);
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .resource-heading {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.015em;
          margin: 0;
        }

        .external-resource-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .external-resource-link:hover {
          color: var(--accent-primary);
        }

        .external-icon {
          opacity: 0.65;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .external-resource-link:hover .external-icon {
          transform: translate(1px, -1px);
          opacity: 1;
        }

        .source-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .resource-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 4px 0 0 0;
        }

        .card-footer {
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }

        .view-doc-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--accent-primary);
          text-decoration: none;
          transition: gap 0.2s ease;
        }

        .view-doc-link:hover {
          gap: 9px;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .dev-resources-section {
            padding: 20px;
          }
          .resources-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
