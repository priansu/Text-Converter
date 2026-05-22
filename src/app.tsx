import React, { useState, useCallback } from 'react';
import CaseConverter from './components/CaseConverter';

function App() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = useCallback((text: string) => {
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="page-layout">
          <header className="header">
            <h1>Text Case Converter</h1>
            <p>Convert your text to different cases instantly</p>
          </header>

          <main className="page-content">
            <CaseConverter onCopy={handleCopy} copiedText={copied} />
          </main>

          <footer className="footer">
            <p>&copy; 2026 Text Case Converter. Free online text transformation tool.</p>
          </footer>
        </div>
      </div>

      <style>{`
        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .page-layout {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(10px);
        }

        .header {
          text-align: center;
          color: white;
          margin-bottom: 30px;
          animation: slideDown 0.6s ease-out;
        }

        .header h1 {
          font-size: 3rem;
          margin-bottom: 10px;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .header p {
          font-size: 1.2rem;
          opacity: 0.95;
        }

        .page-content {
          animation: slideUp 0.6s ease-out;
          margin-bottom: 40px;
        }

        .footer {
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          padding: 20px 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          margin-top: 20px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr;
          }

          .header h1 {
            font-size: 2rem;
          }

          .header p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
