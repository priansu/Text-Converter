import React from 'react';

interface OutputBoxProps {
  title: string;
  description: string;
  text: string;
  onCopy: () => void;
  isCopied: boolean;
  isEmpty: boolean;
}

function OutputBox({ title, description, text, onCopy, isCopied, isEmpty }: OutputBoxProps) {
  return (
    <div className="output-box">
      <div className="output-header">
        <div>
          <h3 className="output-title">{title}</h3>
          <p className="output-description">{description}</p>
        </div>
      </div>

      <div className="output-content">
        {isEmpty ? (
          <p className="output-placeholder">Enter text to see results...</p>
        ) : (
          <p className="output-text">{text || ''}</p>
        )}
      </div>

      <button
        onClick={onCopy}
        disabled={isEmpty}
        className={`copy-button ${isCopied ? 'copied' : ''}`}
      >
        {isCopied ? '✓ Copied!' : 'Copy'}
      </button>

      <style>{`
        .output-box {
          background: #f9f9f9;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          min-height: 200px;
          position: relative;
        }

        .output-box:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .output-title {
          font-size: 1rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 4px;
        }

        .output-description {
          font-size: 0.8rem;
          color: #999;
          margin: 0;
        }

        .output-content {
          flex: 1;
          margin-bottom: 12px;
          min-height: 80px;
          overflow-y: auto;
        }

        .output-text {
          font-family: 'Courier New', monospace;
          font-size: 0.95rem;
          color: #333;
          word-break: break-word;
          white-space: pre-wrap;
          margin: 0;
          line-height: 1.4;
        }

        .output-placeholder {
          font-size: 0.9rem;
          color: #ccc;
          font-style: italic;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          margin: 0;
        }

        .copy-button {
          background: #667eea;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.85rem;
          width: 100%;
        }

        .copy-button:hover:not(:disabled) {
          background: #5568d3;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }

        .copy-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .copy-button.copied {
          background: #52c41a;
        }

        @media (max-width: 768px) {
          .output-box {
            min-height: 180px;
          }

          .output-text {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}

export default OutputBox;
