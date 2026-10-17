import React from 'react';

interface OutputBoxProps {
  title: string;
  category: string;
  description: string;
  text: string;
  onCopy: () => void;
  isCopied: boolean;
  isEmpty: boolean;
}

export default function OutputBox({
  title,
  category,
  description,
  text,
  onCopy,
  isCopied,
  isEmpty,
}: OutputBoxProps) {
  return (
    <div className={`output-card ${isCopied ? 'copied-highlight' : ''}`}>
      <div className="output-card-header">
        <div className="output-title-group">
          <span className="output-title">{title}</span>
          <span className={`output-tag tag-${category}`}>{category}</span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          disabled={isEmpty}
          className={`card-copy-btn ${isCopied ? 'copied' : ''}`}
          aria-label={`Copy ${title}`}
          title={`Copy ${title} to clipboard`}
        >
          {isCopied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <p className="output-description">{description}</p>

      <div className="output-preview">
        {isEmpty ? (
          <span className="output-placeholder">Enter text above to see converted output...</span>
        ) : (
          <code className="output-text">{text}</code>
        )}
      </div>

      <style>{`
        .output-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .output-card:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
          background: var(--bg-card-hover);
        }

        .output-card.copied-highlight {
          border-color: #10b981;
          box-shadow: 0 0 0 1px #10b981, var(--shadow-md);
        }

        .output-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .output-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .output-title {
          font-weight: 700;
          font-size: 0.96rem;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .output-tag {
          font-size: 0.68rem;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .tag-standard {
          background: var(--badge-bg);
          color: var(--badge-text);
          border: 1px solid var(--border-subtle);
        }

        .tag-developer {
          background: rgba(14, 165, 233, 0.12);
          color: #0369a1;
          border: 1px solid rgba(14, 165, 233, 0.25);
        }

        [data-theme="dark"] .tag-developer {
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.3);
        }

        .tag-specialty {
          background: rgba(168, 85, 247, 0.12);
          color: #7e22ce;
          border: 1px solid rgba(168, 85, 247, 0.25);
        }

        [data-theme="dark"] .tag-specialty {
          color: #c084fc;
          border-color: rgba(192, 132, 252, 0.3);
        }

        .output-description {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.4;
        }

        .output-preview {
          background: var(--code-bg);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 12px 14px;
          min-height: 64px;
          max-height: 180px;
          overflow-y: auto;
          display: flex;
          align-items: flex-start;
          word-break: break-all;
        }

        .output-placeholder {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-style: italic;
          align-self: center;
        }

        .output-text {
          font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
          font-size: 0.88rem;
          color: var(--text-primary);
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .card-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          min-height: 36px;
          flex-shrink: 0;
        }

        .card-copy-btn:hover:not(:disabled) {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .card-copy-btn:active:not(:disabled) {
          transform: scale(0.95);
        }

        .card-copy-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .card-copy-btn.copied {
          background: #10b981;
          border-color: #10b981;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
