```tsx
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
            <p>
              Convert text to uppercase, lowercase, title case, sentence case,
              camelCase, PascalCase, snake_case and more instantly.
            </p>
          </header>

          <main className="page-content">
            <CaseConverter onCopy={handleCopy} copiedText={copied} />

            <section className="seo-content">
              <h2>Free Online Text Case Converter</h2>

              <p>
                CaseShift is a free online text case converter that lets you
                quickly transform text into different letter and programming
                cases. Enter your text, choose the case you need, and copy the
                converted result instantly.
              </p>

              <h2>Available Text Case Conversions</h2>

              <div className="case-info">
                <div>
                  <h3>UPPERCASE</h3>
                  <p>
                    Converts all letters in your text to uppercase.
                  </p>
                </div>

                <div>
                  <h3>lowercase</h3>
                  <p>
                    Converts all letters to lowercase.
                  </p>
                </div>

                <div>
                  <h3>Title Case</h3>
                  <p>
                    Capitalizes the important words in your text.
                  </p>
                </div>

                <div>
                  <h3>Sentence case</h3>
                  <p>
                    Capitalizes the first letter of sentences while keeping the
                    remaining text lowercase.
                  </p>
                </div>

                <div>
                  <h3>camelCase</h3>
                  <p>
                    Converts text into camel case, commonly used for
                    JavaScript and other programming languages.
                  </p>
                </div>

                <div>
                  <h3>PascalCase</h3>
                  <p>
                    Converts text into Pascal case, commonly used for class
                    and component names.
                  </p>
                </div>

                <div>
                  <h3>snake_case</h3>
                  <p>
                    Converts words into lowercase snake case separated by
                    underscores.
                  </p>
                </div>
              </div>

              <h2>Why Use CaseShift?</h2>

              <p>
                CaseShift makes text formatting fast and simple. It can be
                useful for writers, students, developers, and anyone who needs
                to change the capitalization or formatting of text without
                manually editing every word.
              </p>
            </section>
          </main>

          <footer className="footer">
            <p>
              &copy; 2026 CaseShift. Free online text case conversion tool.
            </p>
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
          line-height: 1.6;
        }

        .page-content {
          animation: slideUp 0.6s ease-out;
          margin-bottom: 40px;
        }

        .seo-content {
          margin-top: 50px;
          padding: 30px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.08);
          color: white;
          line-height: 1.7;
        }

        .seo-content h2 {
          font-size: 1.8rem;
          margin: 30px 0 12px;
        }

        .seo-content h2:first-child {
          margin-top: 0;
        }

        .seo-content h3 {
          font-size: 1.1rem;
          margin-bottom: 6px;
        }

        .seo-content p {
          font-size: 1rem;
          opacity: 0.95;
        }

        .case-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 20px;
        }

        .case-info > div {
          padding: 18px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
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

        @media (max-width: 700px) {
          .page-layout {
            padding: 20px;
          }

          .seo-content {
            padding: 20px;
          }

          .case-info {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
```
