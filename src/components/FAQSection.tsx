import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  badge?: string;
  sample?: {
    input: string;
    output: string;
  };
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'How do I convert text to snake_case?',
    badge: 'Developer Tooling',
    answer:
      'To convert text to snake_case, type or paste your content into the Input Text editor and click the snake_case button in the floating conversion toolbar. CaseConverters instantly replaces all whitespace, dashes, and punctuation with underscores and converts every character to lowercase. Your converted string appears instantaneously in the Output Window without touching a remote server.',
    sample: {
      input: 'User Account Profile Settings',
      output: 'user_account_profile_settings',
    },
  },
  {
    question: 'Is my text data saved on your servers?',
    badge: 'Privacy & Security',
    answer:
      'No, absolutely not. CaseConverters.in operates entirely on a 100% client-side architecture. All string manipulations, capitalization algorithms, and text metrics execute strictly inside your local browser runtime. No text, clipboard contents, or keystrokes are ever uploaded, transmitted, or logged to remote servers or third parties.',
  },
  {
    question: 'What is the difference between Title Case and Sentence case?',
    badge: 'Editorial Standards',
    answer:
      'Title Case capitalizes the first letter of all major words (nouns, verbs, adjectives, and adverbs) while keeping minor grammatical words (articles and short prepositions like "the", "a", "an", "in", "of") in lowercase, making it the industry standard for book titles, article headlines, and marketing headers. Conversely, Sentence case capitalizes only the very first letter of the first word in a sentence and proper nouns, which is the modern standard for body text, digital microcopy, and UI buttons as prescribed by Apple and Google design guidelines.',
    sample: {
      input: 'the quick brown fox jumps over the lazy dog',
      output: 'Title Case: The Quick Brown Fox Jumps Over the Lazy Dog | Sentence case: The quick brown fox jumps over the lazy dog.',
    },
  },
];

export default function FAQSection() {
  // Track open state for accordion; open first item by default
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="faq-surface" id="faq" aria-label="Frequently Asked Questions">
      <div className="faq-header-block">
        <div className="faq-badge">
          <span className="faq-badge-dot" />
          <span>Conversational Search Hub</span>
        </div>
        <h2 className="faq-main-title">Frequently Asked Questions</h2>
        <p className="faq-main-desc">
          Everything you need to know about string casing conventions, client-side data privacy,
          and algorithmic transformations.
        </p>
      </div>

      <div className="faq-accordion-list" role="region" aria-label="Questions and Answers">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const controlId = `faq-answer-${idx}`;
          const headerId = `faq-header-${idx}`;

          return (
            <div
              key={idx}
              className={`faq-card ${isOpen ? 'faq-card-open' : ''}`}
            >
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={controlId}
                className="faq-question-btn"
                onClick={() => toggleFAQ(idx)}
              >
                <div className="faq-question-title-group">
                  {item.badge && <span className="faq-cat-pill">{item.badge}</span>}
                  <span className="faq-question-text">{item.question}</span>
                </div>
                <div className="faq-icon-wrapper" aria-hidden="true">
                  <svg
                    className={`faq-chevron ${isOpen ? 'faq-chevron-rotated' : ''}`}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              <div
                id={controlId}
                role="region"
                aria-labelledby={headerId}
                className={`faq-answer-collapse ${isOpen ? 'expanded' : ''}`}
              >
                <div className="faq-answer-inner">
                  <p className="faq-answer-text">{item.answer}</p>

                  {item.sample && (
                    <div className="faq-sample-box">
                      <div className="sample-line">
                        <span className="sample-label">Input:</span>
                        <code className="sample-code">{item.sample.input}</code>
                      </div>
                      <div className="sample-line">
                        <span className="sample-label">Result:</span>
                        <code className="sample-code result-accent">{item.sample.output}</code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .faq-surface {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 36px 32px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 28px;
          contain: layout;
        }

        .faq-header-block {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 720px;
        }

        .faq-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--badge-bg);
          color: var(--badge-text);
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          width: fit-content;
          border: 1px solid var(--border-subtle);
        }

        .faq-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 6px var(--accent-primary);
        }

        .faq-main-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.02em;
        }

        .faq-main-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        .faq-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faq-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }

        .faq-card:hover {
          border-color: var(--border-hover);
        }

        .faq-card-open {
          border-color: var(--accent-primary);
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.08);
          background: var(--bg-card);
        }

        .faq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          text-align: left;
          gap: 16px;
          transition: background-color 0.15s ease;
        }

        .faq-question-btn:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: -2px;
        }

        .faq-question-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .faq-cat-pill {
          background: var(--bg-tertiary);
          color: var(--text-muted);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          border: 1px solid var(--border-subtle);
        }

        .faq-card-open .faq-cat-pill {
          background: var(--badge-bg);
          color: var(--badge-text);
        }

        .faq-question-text {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .faq-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, color 0.2s ease;
        }

        .faq-card-open .faq-icon-wrapper {
          background: var(--accent-primary);
          color: #ffffff;
        }

        .faq-chevron {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-chevron-rotated {
          transform: rotate(180deg);
        }

        .faq-answer-collapse {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
          opacity: 0;
        }

        .faq-answer-collapse.expanded {
          max-height: 400px;
          opacity: 1;
        }

        .faq-answer-inner {
          padding: 0 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faq-answer-text {
          font-size: 0.94rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin: 0;
        }

        .faq-sample-box {
          background: var(--code-bg);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.86rem;
        }

        .sample-line {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }

        .sample-label {
          font-weight: 700;
          color: var(--text-muted);
          font-size: 0.78rem;
          text-transform: uppercase;
          min-width: 50px;
        }

        .sample-code {
          font-family: 'JetBrains Mono', monospace;
          background: var(--bg-tertiary);
          padding: 2px 8px;
          border-radius: 6px;
          color: var(--text-primary);
        }

        .sample-code.result-accent {
          color: var(--accent-primary);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .faq-surface {
            padding: 24px 18px;
          }
          .faq-question-btn {
            padding: 16px;
          }
          .faq-answer-inner {
            padding: 0 16px 16px;
          }
        }
      `}</style>
    </section>
  );
}
