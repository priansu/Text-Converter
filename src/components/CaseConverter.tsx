import React, { useState, useCallback, useMemo, useEffect, lazy, Suspense } from 'react';
import {
  TRANSFORMATIONS,
  TextTransformation,
} from '../utils/textTransformations';
import OutputBox from './OutputBox';

const RelatedGuides = lazy(() => import('./RelatedGuides'));
const DeveloperResources = lazy(() => import('./DeveloperResources'));
const FAQSection = lazy(() => import('./FAQSection'));

interface CaseConverterProps {
  onCopySuccess: (message: string, subMessage?: string) => void;
  onSelectGuide?: (slug: string) => void;
}

export default function CaseConverter({ onCopySuccess, onSelectGuide }: CaseConverterProps) {
  // 1. LocalStorage Auto-Save Initialization (Preserves user's source text)
  const [inputText, setInputText] = useState(() => {
    try {
      return localStorage.getItem('cc_autosave_draft') || '';
    } catch {
      return '';
    }
  });

  // 2. Active Casing Mode (Defaults to camelCase or Title Case)
  const [activeCase, setActiveCase] = useState<string>('camelCase');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [outputCopied, setOutputCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'standard' | 'developer'>('all');
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Auto-save draft on every change
  useEffect(() => {
    try {
      if (inputText) {
        localStorage.setItem('cc_autosave_draft', inputText);
      } else {
        localStorage.removeItem('cc_autosave_draft');
      }
    } catch (e) {
      // Ignore storage quota warnings
    }
  }, [inputText]);

  // Compute live statistics for source input
  const stats = useMemo(() => {
    const raw = inputText;
    const trimmed = raw.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const chars = raw.length;
    const charsNoSpaces = raw.replace(/\s/g, '').length;
    const lines = raw ? raw.split(/\r\n|\r|\n/).length : 0;
    const readingTimeSec = words > 0 ? Math.ceil((words / 200) * 60) : 0;

    return { words, chars, charsNoSpaces, lines, readingTimeSec };
  }, [inputText]);

  // Find the active transformation object
  const activeTransformation = useMemo(() => {
    return (
      TRANSFORMATIONS.find((t) => t.name.toLowerCase() === activeCase.toLowerCase()) ||
      TRANSFORMATIONS[0]
    );
  }, [activeCase]);

  // Compute Converted Output based on pristine source text (NEVER mutates input!)
  const convertedOutput = useMemo(() => {
    if (!inputText) return '';
    return activeTransformation.transform(inputText);
  }, [inputText, activeTransformation]);

  // Compute live statistics for converted output
  const outputStats = useMemo(() => {
    const raw = convertedOutput;
    const trimmed = raw.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const chars = raw.length;
    const charsNoSpaces = raw.replace(/\s/g, '').length;
    const lines = raw ? raw.split(/\r\n|\r|\n/).length : 0;
    return { words, chars, charsNoSpaces, lines };
  }, [convertedOutput]);

  // Compute all transformations for multi-case cards grid
  const transformedOutputs = useMemo(() => {
    const map: Record<string, string> = {};
    TRANSFORMATIONS.forEach((t) => {
      map[t.name] = t.transform(inputText);
    });
    return map;
  }, [inputText]);

  // Handle textarea text change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  // Switch active casing mode (Updates Output window only; source input stays pristine!)
  const selectCasingMode = useCallback(
    (name: string) => {
      setActiveCase(name);
      setLastAction(name);
      setTimeout(() => setLastAction(null), 1500);
    },
    []
  );

  // Clipboard copy helper
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
      return false;
    }
  };

  // Copy converted output with feedback
  const handleCopyOutput = useCallback(async () => {
    if (!convertedOutput) return;
    const success = await copyToClipboard(convertedOutput);
    if (success) {
      setOutputCopied(true);
      onCopySuccess(`✓ Copied ${activeTransformation.name}`, 'Formatted text ready to paste');
      setTimeout(() => setOutputCopied(false), 2000);
    }
  }, [convertedOutput, activeTransformation, onCopySuccess]);

  // Optional: Swap / Use Converted text as new input (chaining)
  const handleUseAsInput = () => {
    if (!convertedOutput) return;
    setInputText(convertedOutput);
    onCopySuccess('⇄ Applied to Input', 'Input replaced with current converted output');
  };

  // Paste from clipboard into input
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        onCopySuccess('📋 Text Pasted', 'Clipboard content loaded into input editor');
      }
    } catch (e) {
      // Browser permissions prompt handled by browser
    }
  };

  // Clear text and auto-saved draft
  const handleClear = () => {
    setInputText('');
    try {
      localStorage.removeItem('cc_autosave_draft');
    } catch (e) {}
  };

  // Copy individual card from all-formats grid
  const handleOutputCardCopy = useCallback(
    async (text: string, transformationName: string) => {
      if (!text) return;
      const success = await copyToClipboard(text);
      if (success) {
        setCopiedFormat(transformationName);
        onCopySuccess(`✓ Copied ${transformationName}`, 'Formatted string copied to clipboard');
        setTimeout(() => setCopiedFormat(null), 2000);
      }
    },
    [onCopySuccess]
  );

  // Filter transformations by tab for bottom grid
  const filteredTransformations = useMemo(() => {
    if (activeTab === 'all') return TRANSFORMATIONS;
    return TRANSFORMATIONS.filter((t) => t.category === activeTab);
  }, [activeTab]);

  return (
    <div className="converter-container">
      {/* 100% Client-Side Privacy Badge */}
      <div className="privacy-badge" role="status">
        <div className="privacy-icon-pill">
          <svg
            className="shield-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <p className="privacy-text">
          <strong>100% Secure &amp; Private:</strong> All text processing happens locally in your
          browser. Your input text is never overwritten and no data is sent to our servers.
        </p>
      </div>

      {/* ==================================================================== */}
      {/* Sticky Floating Action Bar for Instant Mode Switching               */}
      {/* Click any format to immediately view the result in the Output Window! */}
      {/* ==================================================================== */}
      <div className="sticky-action-bar-wrapper">
        <div className="sticky-action-bar">
          <div className="action-bar-label">
            <span className="pulse-indicator" />
            <span>Convert To:</span>
          </div>

          <div className="core-buttons-group">
            {/* Standard Cases */}
            <button
              type="button"
              className={`btn-action ${activeCase === 'UPPERCASE' ? 'active-case' : ''}`}
              onClick={() => selectCasingMode('UPPERCASE')}
              title="Convert to UPPERCASE"
            >
              UPPERCASE
            </button>
            <button
              type="button"
              className={`btn-action ${activeCase === 'lowercase' ? 'active-case' : ''}`}
              onClick={() => selectCasingMode('lowercase')}
              title="Convert to lowercase"
            >
              lowercase
            </button>
            <button
              type="button"
              className={`btn-action ${activeCase === 'Title Case' ? 'active-case' : ''}`}
              onClick={() => selectCasingMode('Title Case')}
              title="Convert to Title Case"
            >
              Title Case
            </button>
            <button
              type="button"
              className={`btn-action ${activeCase === 'Sentence case' ? 'active-case' : ''}`}
              onClick={() => selectCasingMode('Sentence case')}
              title="Convert to Sentence case"
            >
              Sentence case
            </button>

            <div className="action-bar-divider" />

            {/* Developer Cases */}
            <button
              type="button"
              className={`btn-action btn-dev-action ${activeCase === 'camelCase' ? 'active-case' : ''}`}
              onClick={() => selectCasingMode('camelCase')}
              title="Convert to camelCase"
            >
              camelCase
            </button>
            <button
              type="button"
              className={`btn-action btn-dev-action ${activeCase === 'snake_case' ? 'active-case' : ''}`}
              onClick={() => selectCasingMode('snake_case')}
              title="Convert to snake_case"
            >
              snake_case
            </button>
            <button
              type="button"
              className={`btn-action btn-dev-action ${activeCase === 'PascalCase' ? 'active-case' : ''}`}
              onClick={() => selectCasingMode('PascalCase')}
              title="Convert to PascalCase"
            >
              PascalCase
            </button>
            <button
              type="button"
              className={`btn-action btn-dev-action ${activeCase === 'kebab-case' ? 'active-case' : ''}`}
              onClick={() => selectCasingMode('kebab-case')}
              title="Convert to kebab-case"
            >
              kebab-case
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* Dual-Pane Workspace: Source Input Window (Left) vs Output Window (Right) */}
      {/* Source input is completely preserved! Output renders the active format. */}
      {/* ==================================================================== */}
      <section className="workspace-split" aria-label="Text Converter Dual Workspace">
        {/* Left Pane: Original Source Input Window */}
        <div className="workspace-pane input-pane">
          <div className="pane-header">
            <div className="pane-title-group">
              <span className="pane-title">Input Text (Original)</span>
              {inputText && (
                <span className="autosave-badge" title="Your text is automatically saved in your browser locally">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Auto-saved
                </span>
              )}
            </div>
            <div className="pane-actions">
              <button
                type="button"
                onClick={handlePaste}
                className="btn-pane-util"
                title="Paste text from clipboard"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                <span>Paste</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={!inputText}
                className="btn-pane-util btn-danger"
                title="Clear input text"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                <span>Clear</span>
              </button>
            </div>
          </div>

          <textarea
            id="main-editor-textarea"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type or paste your text here... Your original text is always preserved while the output window displays your chosen casing format."
            className="pane-textarea"
            aria-label="Source text input"
            spellCheck={false}
          />

          <div className="pane-footer-stats">
            <span className="stat-unit">Words: <strong>{stats.words}</strong></span>
            <span className="stat-unit">Chars: <strong>{stats.chars}</strong></span>
            <span className="stat-unit">No Spaces: <strong>{stats.charsNoSpaces}</strong></span>
            <span className="stat-unit">Lines: <strong>{stats.lines}</strong></span>
          </div>
        </div>

        {/* Right Pane: Dedicated Converted Output Window */}
        <div className="workspace-pane output-pane">
          <div className="pane-header">
            <div className="pane-title-group">
              <span className="pane-title">Converted Output</span>
              <span className="active-format-pill">{activeTransformation.name}</span>
              {lastAction && (
                <span className="applied-pill animate-fade">Active</span>
              )}
            </div>
            <div className="pane-actions">
              <button
                type="button"
                onClick={handleUseAsInput}
                disabled={!convertedOutput}
                className="btn-pane-util"
                title="Replace original input with this output to chain transformations"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="17 1 21 5 17 9" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <polyline points="7 23 3 19 7 15" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
                <span>Use as Input</span>
              </button>
              <button
                type="button"
                onClick={handleCopyOutput}
                disabled={!convertedOutput}
                className={`btn-pane-util btn-copy-accent ${outputCopied ? 'btn-copied' : ''}`}
                title="Copy converted text to clipboard"
              >
                {outputCopied ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <textarea
            id="converted-output-textarea"
            value={convertedOutput}
            readOnly
            placeholder={`Your converted text in ${activeTransformation.name} will appear here instantly...`}
            className="pane-textarea output-textarea"
            aria-label="Converted text output"
            spellCheck={false}
          />

          <div className="pane-footer-stats">
            <span className="stat-unit">Words: <strong>{outputStats.words}</strong></span>
            <span className="stat-unit">Chars: <strong>{outputStats.chars}</strong></span>
            <span className="stat-unit">No Spaces: <strong>{outputStats.charsNoSpaces}</strong></span>
            <span className="stat-unit">Lines: <strong>{outputStats.lines}</strong></span>
            {inputText && (
              <span className="stat-unit char-diff">
                {convertedOutput.length - inputText.length >= 0 ? '+' : ''}
                {convertedOutput.length - inputText.length} chars
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Multi-Case Outputs Preview Grid (All Formats at a Glance) */}
      <section className="outputs-surface" aria-label="All Casing Transformations Overview">
        <div className="outputs-header">
          <div>
            <h2 className="outputs-heading">All Formats at a Glance</h2>
            <p className="outputs-sub">
              Compare all 12 transformation styles side-by-side and copy whichever one you need.
            </p>
          </div>
          <div className="filter-pill-nav">
            <button
              type="button"
              className={`pill-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Formats ({TRANSFORMATIONS.length})
            </button>
            <button
              type="button"
              className={`pill-tab ${activeTab === 'standard' ? 'active' : ''}`}
              onClick={() => setActiveTab('standard')}
            >
              Standard
            </button>
            <button
              type="button"
              className={`pill-tab ${activeTab === 'developer' ? 'active' : ''}`}
              onClick={() => setActiveTab('developer')}
            >
              Developer
            </button>
          </div>
        </div>

        <div className="outputs-grid">
          {filteredTransformations.map((t: TextTransformation) => (
            <OutputBox
              key={t.name}
              title={t.name}
              category={t.category}
              description={t.description}
              text={transformedOutputs[t.name] || ''}
              onCopy={() => handleOutputCardCopy(transformedOutputs[t.name], t.name)}
              isCopied={copiedFormat === t.name}
              isEmpty={!inputText}
            />
          ))}
        </div>
      </section>

      {/* 1. Formatting Guides Section (Directly Below Main Tool Area) */}
      <Suspense fallback={<div style={{ minHeight: '120px' }} />}>
        <RelatedGuides onSelectGuide={onSelectGuide} />
      </Suspense>

      {/* 2. Official Developer Resources & Open Style Guides (External Authority Hub) */}
      <Suspense fallback={<div style={{ minHeight: '120px' }} />}>
        <DeveloperResources />
      </Suspense>

      {/* 3. SEO Technical Guide: When to Use Each Casing Style */}
      <section className="guide-surface" aria-label="Casing Styles Reference and Best Practices">
        <div className="guide-header-block">
          <div className="badge-pill">
            <span>Reference Cheatsheet</span>
          </div>
          <h2 className="guide-main-title">
            When to Use Each Casing Style: The Comprehensive Developer &amp; Editorial Guide
          </h2>
          <p className="guide-main-desc">
            Choosing the correct casing format is essential for writing clean code, preventing
            compiler errors, adhering to editorial standards, and optimizing technical SEO
            architectures.
          </p>
        </div>

        <div className="rules-grid">
          {/* Sentence case */}
          <article className="rule-card">
            <div className="rule-badge badge-editorial">Editorial</div>
            <h3 className="rule-title">Sentence case</h3>
            <p className="rule-desc">
              Capitalizes only the very first letter of each sentence, keeping subsequent words
              lowercase except for proper nouns and acronyms.
            </p>
            <div className="rule-sample">
              <span>Example:</span> <code>Deploying to production on Friday is not recommended.</code>
            </div>
            <div className="rule-bullets">
              <strong>Recommended for:</strong>
              <ul>
                <li>Article paragraphs, technical documentation, and blog posts</li>
                <li>Modern UX buttons, toasts, and input labels (Google &amp; Apple HIG)</li>
                <li>Email subject lines and customer communication</li>
              </ul>
            </div>
          </article>

          {/* Title Case */}
          <article className="rule-card">
            <div className="rule-badge badge-editorial">Editorial</div>
            <h3 className="rule-title">Title Case</h3>
            <p className="rule-desc">
              Capitalizes principal words while keeping articles, short conjunctions, and
              prepositions (such as <em>a, an, the, and, of, in, to</em>) lowercase.
            </p>
            <div className="rule-sample">
              <span>Example:</span> <code>Designing Distributed Systems for High Availability</code>
            </div>
            <div className="rule-bullets">
              <strong>Recommended for:</strong>
              <ul>
                <li>Blog post headings, H1/H2 titles, and guide headlines</li>
                <li>Book titles, whitepapers, and presentation decks</li>
                <li>Top-level website navigation bars and product releases</li>
              </ul>
            </div>
          </article>

          {/* UPPERCASE */}
          <article className="rule-card">
            <div className="rule-badge badge-code">Code &amp; Legal</div>
            <h3 className="rule-title">UPPERCASE</h3>
            <p className="rule-desc">
              Transforms every alphabetical character to its capitalized equivalent. Imparts maximum
              visual weight and emphasis.
            </p>
            <div className="rule-sample">
              <span>Example:</span> <code>SELECT COUNT(*) FROM USERS WHERE ACTIVE = TRUE;</code>
            </div>
            <div className="rule-bullets">
              <strong>Recommended for:</strong>
              <ul>
                <li>SQL keywords and reserved syntax statements</li>
                <li>Technical acronyms (REST, JSON, GraphQL, HTTPS)</li>
                <li>Environment variables (<code>DATABASE_URL</code>, <code>JWT_SECRET</code>)</li>
              </ul>
            </div>
          </article>

          {/* lowercase */}
          <article className="rule-card">
            <div className="rule-badge badge-code">Web &amp; Systems</div>
            <h3 className="rule-title">lowercase</h3>
            <p className="rule-desc">
              Converts all characters into small letters with zero capital letters.
            </p>
            <div className="rule-sample">
              <span>Example:</span> <code>https://caseconverters.in/tools</code>
            </div>
            <div className="rule-bullets">
              <strong>Recommended for:</strong>
              <ul>
                <li>Website URLs, permalinks, and domain hostnames</li>
                <li>Email addresses and database connection strings</li>
                <li>CSS selector properties (<code>display: flex; gap: 16px;</code>)</li>
              </ul>
            </div>
          </article>

          {/* camelCase */}
          <article className="rule-card highlight-card">
            <div className="rule-badge badge-dev">Developer Standard</div>
            <h3 className="rule-title">camelCase</h3>
            <p className="rule-desc">
              Starts with a lowercase first word and capitalizes the first letter of each subsequent
              word, removing all whitespace and delimiters.
            </p>
            <div className="rule-sample">
              <span>Example:</span> <code>const userProfileSettings = fetchSettings(userId);</code>
            </div>
            <div className="rule-bullets">
              <strong>Recommended for:</strong>
              <ul>
                <li>JavaScript, TypeScript, and Java variable and function names</li>
                <li>JSON payload keys and REST API responses</li>
                <li>Swift and Kotlin properties and method signatures</li>
              </ul>
            </div>
          </article>

          {/* snake_case */}
          <article className="rule-card highlight-card">
            <div className="rule-badge badge-dev">Developer Standard</div>
            <h3 className="rule-title">snake_case</h3>
            <p className="rule-desc">
              Joins lowercase words with an underscore (<code>_</code>) character.
            </p>
            <div className="rule-sample">
              <span>Example:</span> <code>def calculate_tax_liability(gross_income):</code>
            </div>
            <div className="rule-bullets">
              <strong>Recommended for:</strong>
              <ul>
                <li>Python variables and functions (official PEP 8 convention)</li>
                <li>SQL database tables and column schemas (e.g. <code>created_at</code>)</li>
                <li>Rust identifiers and configuration keys</li>
              </ul>
            </div>
          </article>

          {/* PascalCase */}
          <article className="rule-card highlight-card">
            <div className="rule-badge badge-dev">Developer Standard</div>
            <h3 className="rule-title">PascalCase</h3>
            <p className="rule-desc">
              Capitalizes the first letter of every connected word including the first (also called
              UpperCamelCase).
            </p>
            <div className="rule-sample">
              <span>Example:</span> <code>export default function CaseConverter() &#123;&#125;</code>
            </div>
            <div className="rule-bullets">
              <strong>Recommended for:</strong>
              <ul>
                <li>React, Next.js, Vue, and Angular component names</li>
                <li>TypeScript interfaces, types, and class definitions</li>
                <li>C# and Java classes, namespaces, and enums</li>
              </ul>
            </div>
          </article>

          {/* kebab-case */}
          <article className="rule-card highlight-card">
            <div className="rule-badge badge-dev">Developer &amp; SEO</div>
            <h3 className="rule-title">kebab-case</h3>
            <p className="rule-desc">
              Joins all words with hyphens (<code>-</code>). Standard across the web for URLs and
              stylesheets.
            </p>
            <div className="rule-sample">
              <span>Example:</span> <code>/blog/kebab-case-urls-technical-seo-best-practices</code>
            </div>
            <div className="rule-bullets">
              <strong>Recommended for:</strong>
              <ul>
                <li>SEO-friendly URL slugs and clean permalinks</li>
                <li>CSS class names and BEM methodology (<code>.card__btn--active</code>)</li>
                <li>HTML custom <code>data-*</code> attributes and npm package names</li>
              </ul>
            </div>
          </article>
        </div>

        {/* Quick Comparison Cheatsheet Table */}
        <div className="table-responsive-container">
          <table className="seo-comparison-table">
            <thead>
              <tr>
                <th scope="col">Casing Format</th>
                <th scope="col">Rule Pattern</th>
                <th scope="col">Formatted Output</th>
                <th scope="col">Primary Industry Standard</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Sentence case</strong></td>
                <td>First word capitalized</td>
                <td><code>Case converter tool</code></td>
                <td>Articles, documentation, modern UI copy</td>
              </tr>
              <tr>
                <td><strong>Title Case</strong></td>
                <td>Capitalize principal words</td>
                <td><code>Case Converter Tool</code></td>
                <td>Headlines, titles, books, marketing</td>
              </tr>
              <tr>
                <td><strong>UPPERCASE</strong></td>
                <td>All characters capitalized</td>
                <td><code>CASE CONVERTER</code></td>
                <td>SQL queries, constants, legal notices</td>
              </tr>
              <tr>
                <td><strong>lowercase</strong></td>
                <td>All characters small</td>
                <td><code>case converter</code></td>
                <td>URLs, email addresses, CSS properties</td>
              </tr>
              <tr>
                <td><strong>camelCase</strong></td>
                <td>firstWordLowercase</td>
                <td><code>caseConverterTool</code></td>
                <td>JavaScript, TypeScript, Java variables</td>
              </tr>
              <tr>
                <td><strong>snake_case</strong></td>
                <td>words_joined_by_underscore</td>
                <td><code>case_converter_tool</code></td>
                <td>Python (PEP 8), SQL database columns</td>
              </tr>
              <tr>
                <td><strong>PascalCase</strong></td>
                <td>EveryWordCapitalized</td>
                <td><code>CaseConverterTool</code></td>
                <td>React components, classes, TypeScript types</td>
              </tr>
              <tr>
                <td><strong>kebab-case</strong></td>
                <td>words-joined-by-hyphen</td>
                <td><code>case-converter-tool</code></td>
                <td>URL slugs, CSS classes, HTML data attributes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Conversational FAQ Accordion Section (Targeting Long-Tail Queries) */}
      <Suspense fallback={<div style={{ minHeight: '120px' }} />}>
        <FAQSection />
      </Suspense>

      <style>{`
        .converter-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Privacy Badge */
        .privacy-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 12px;
          padding: 12px 18px;
          box-shadow: var(--shadow-sm);
        }

        .privacy-icon-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          flex-shrink: 0;
        }

        .shield-icon {
          width: 18px;
          height: 18px;
        }

        .privacy-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.45;
        }

        .privacy-text strong {
          color: #047857;
        }

        [data-theme="dark"] .privacy-text strong {
          color: #34d399;
        }

        /* ==================================================================== */
        /* Sticky Floating Action Bar Styles                                    */
        /* ==================================================================== */
        .sticky-action-bar-wrapper {
          position: sticky;
          top: 16px;
          z-index: 50;
        }

        .sticky-action-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-sticky);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 10px 16px;
          box-shadow: var(--shadow-lg), 0 0 0 1px var(--border-subtle);
          overflow-x: auto;
          scrollbar-width: none;
        }

        .sticky-action-bar::-webkit-scrollbar {
          display: none;
        }

        .action-bar-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .pulse-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
          animation: pulse 2s infinite;
        }

        .core-buttons-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
        }

        .action-bar-divider {
          width: 1px;
          height: 24px;
          background: var(--border-subtle);
          flex-shrink: 0;
          margin: 0 4px;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          min-height: 44px; /* Ergonomic 44px tap target */
          min-width: 44px;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-action:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
          transform: translateY(-1px);
        }

        .btn-action:active {
          transform: scale(0.95);
        }

        .btn-action.active-case {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
        }

        .btn-dev-action {
          background: rgba(14, 165, 233, 0.1);
          border-color: rgba(14, 165, 233, 0.25);
          color: #0369a1;
        }

        [data-theme="dark"] .btn-dev-action {
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.25);
        }

        .btn-dev-action:hover {
          background: rgba(14, 165, 233, 0.2);
        }

        .btn-dev-action.active-case {
          background: #0369a1;
          border-color: #0369a1;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(3, 105, 161, 0.4);
        }

        /* ==================================================================== */
        /* Dual-Pane Workspace Layout (Split Screen)                            */
        /* ==================================================================== */
        .workspace-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }

        .workspace-pane {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 22px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          height: 100%;
          box-sizing: border-box;
        }

        .pane-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          min-height: 42px;
          height: 42px;
          flex-wrap: nowrap;
        }

        .pane-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          min-width: 0;
        }

        .pane-title {
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.015em;
          white-space: nowrap;
        }

        .active-format-pill {
          background: var(--badge-bg);
          color: var(--badge-text);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border: 1px solid var(--border-subtle);
        }

        .autosave-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(16, 185, 129, 0.1);
          color: #047857;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        [data-theme="dark"] .autosave-badge {
          color: #34d399;
        }

        .applied-pill {
          background: rgba(14, 165, 233, 0.12);
          color: #0369a1;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
        }

        [data-theme="dark"] .applied-pill {
          color: #38bdf8;
        }

        .pane-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .btn-pane-util {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 7px 13px;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          min-height: 38px;
          height: 38px;
          box-sizing: border-box;
          white-space: nowrap;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-pane-util:hover:not(:disabled) {
          background: var(--bg-card-hover);
          color: var(--text-primary);
          border-color: var(--border-hover);
          transform: translateY(-1px);
        }

        .btn-pane-util:active:not(:disabled) {
          transform: scale(0.96);
        }

        .btn-pane-util:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .btn-pane-util.btn-danger {
          color: #dc2626;
          border-color: rgba(220, 38, 38, 0.3);
          background: transparent;
        }

        .btn-pane-util.btn-danger:hover:not(:disabled) {
          background: rgba(239, 68, 68, 0.1);
          border-color: #dc2626;
        }

        .btn-copy-accent {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 1px 3px rgba(79, 70, 229, 0.3);
        }

        .btn-copy-accent:hover:not(:disabled) {
          background: var(--accent-hover);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
        }

        .btn-copy-accent.btn-copied {
          background: #10b981;
          border-color: #10b981;
          color: #ffffff;
        }

        .pane-textarea {
          width: 100%;
          height: 340px;
          min-height: 340px;
          max-height: 340px;
          padding: 16px 18px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1.5px solid var(--border-subtle);
          border-radius: 14px;
          font-size: 0.96rem;
          font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
          line-height: 1.6;
          resize: none;
          overflow-y: auto;
          box-sizing: border-box;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .pane-textarea:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .output-textarea {
          cursor: text;
          user-select: text;
        }

        .output-textarea:read-only {
          background: var(--bg-secondary);
        }

        .output-textarea::placeholder {
          color: var(--text-muted);
          opacity: 0.65;
        }

        .pane-footer-stats {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: 14px;
          padding: 10px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          font-size: 0.82rem;
          color: var(--text-muted);
          min-height: 42px;
          height: 42px;
          box-sizing: border-box;
          white-space: nowrap;
          overflow-x: auto;
        }

        .stat-unit strong {
          color: var(--text-primary);
          font-family: 'JetBrains Mono', monospace;
        }

        .char-diff {
          margin-left: auto;
          color: var(--accent-primary);
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Outputs Surface */
        .outputs-surface {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 24px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .outputs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .outputs-heading {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin: 0 0 4px 0;
        }

        .outputs-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin: 0;
        }

        .filter-pill-nav {
          display: flex;
          gap: 6px;
          background: var(--bg-tertiary);
          padding: 4px;
          border-radius: 10px;
          border: 1px solid var(--border-subtle);
        }

        .pill-tab {
          background: transparent;
          color: var(--text-muted);
          border: none;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          min-height: 34px;
          transition: all 0.18s ease;
        }

        .pill-tab:hover {
          color: var(--text-primary);
        }

        .pill-tab.active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        .outputs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 16px;
        }

        /* Guide Surface */
        .guide-surface {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 32px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .guide-header-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .badge-pill {
          display: inline-flex;
          background: var(--badge-bg);
          color: var(--badge-text);
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: fit-content;
        }

        .guide-main-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.3;
          margin: 0;
        }

        .guide-main-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 720px;
          margin: 0;
        }

        .rules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .rule-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.2s ease;
        }

        .rule-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .rule-badge {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 8px;
          border-radius: 6px;
          width: fit-content;
        }

        .badge-editorial {
          background: var(--badge-bg);
          color: var(--badge-text);
        }

        .badge-code {
          background: rgba(14, 165, 233, 0.15);
          color: #0369a1;
        }

        [data-theme="dark"] .badge-code {
          color: #38bdf8;
        }

        .badge-dev {
          background: rgba(168, 85, 247, 0.15);
          color: #7e22ce;
        }

        [data-theme="dark"] .badge-dev {
          color: #c084fc;
        }

        .rule-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .rule-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .rule-sample {
          background: var(--code-bg);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.82rem;
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          word-break: break-all;
        }

        .rule-sample code {
          color: var(--accent-primary);
          font-family: 'JetBrains Mono', monospace;
        }

        .rule-bullets {
          font-size: 0.84rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .rule-bullets strong {
          color: var(--text-secondary);
          display: block;
          margin-bottom: 4px;
        }

        .rule-bullets ul {
          margin: 0;
          padding-left: 18px;
        }

        .rule-bullets li {
          margin-bottom: 3px;
        }

        .rule-bullets code {
          background: var(--bg-tertiary);
          padding: 1px 4px;
          border-radius: 4px;
          color: var(--text-primary);
          font-size: 0.78rem;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Comparison Table */
        .table-responsive-container {
          overflow-x: auto;
          margin-top: 10px;
          border-radius: 12px;
          border: 1px solid var(--border-subtle);
        }

        .seo-comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
          min-width: 640px;
        }

        .seo-comparison-table th {
          background: var(--bg-secondary);
          color: var(--text-muted);
          font-weight: 600;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .seo-comparison-table td {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-card);
          color: var(--text-secondary);
        }

        .seo-comparison-table tr:hover td {
          background: var(--bg-card-hover);
        }

        .seo-comparison-table code {
          font-family: 'JetBrains Mono', monospace;
          background: var(--code-bg);
          color: var(--accent-primary);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.82rem;
          border: 1px solid var(--border-subtle);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade {
          animation: fade 0.2s ease-out;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .workspace-split {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .workspace-pane,
          .outputs-surface,
          .guide-surface {
            padding: 18px;
          }

          .pane-header {
            flex-direction: column;
            align-items: stretch;
            height: auto;
            min-height: auto;
          }

          .pane-footer-stats {
            flex-wrap: wrap;
            height: auto;
            min-height: auto;
          }

          .pane-actions {
            justify-content: stretch;
          }

          .pane-actions button {
            flex: 1;
          }

          .rules-grid {
            grid-template-columns: 1fr;
          }

          .sticky-action-bar {
            padding: 8px 12px;
          }

          .btn-action {
            padding: 8px 12px;
            font-size: 0.82rem;
          }
        }
      `}</style>
    </div>
  );
}
