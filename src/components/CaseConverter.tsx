import React, { useState, useCallback } from 'react';
import { TRANSFORMATIONS } from '../utils/textTransformations';
import OutputBox from './OutputBox';

interface CaseConverterProps {
  onCopy: (text: string) => void;
  copiedText: string | null;
}

function CaseConverter({ onCopy, copiedText }: CaseConverterProps) {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<{ [key: string]: string }>({});

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value;
      setInputText(text);

      // Generate all transformations
      const newResults: { [key: string]: string } = {};
      TRANSFORMATIONS.forEach((transformation) => {
        newResults[transformation.name] = transformation.transform(text);
      });
      setResults(newResults);
    },
    []
  );

  const handleClear = useCallback(() => {
    setInputText('');
    setResults({});
  }, []);

  const handleCopy = (text: string, transformationName: string) => {
    navigator.clipboard.writeText(text);
    onCopy(transformationName);
  };

  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = inputText.length;
  const charCountNoSpaces = inputText.replace(/\s/g, '').length;

  return (
    <div className="case-converter">
      <div className="input-section">
        <label htmlFor="input-text" className="label">
          Enter Your Text
        </label>
        <textarea
          id="input-text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type or paste your text here... Example: hello world"
          className="input-textarea"
        />

        <div className="input-stats">
          <span>Words: {wordCount}</span>
          <span>Characters: {charCount}</span>
          <span>Characters (no spaces): {charCountNoSpaces}</span>
        </div>

        <button onClick={handleClear} className="clear-button">
          Clear All
        </button>
      </div>

      <div className="outputs-section">
        <h2>Converted Text</h2>
        <div className="outputs-grid">
          {TRANSFORMATIONS.map((transformation) => (
            <OutputBox
              key={transformation.name}
              title={transformation.name}
              description={transformation.description}
              text={results[transformation.name] || ''}
              onCopy={() => handleCopy(results[transformation.name], transformation.name)}
              isCopied={copiedText === transformation.name}
              isEmpty={!inputText}
            />
          ))}
        </div>
      </div>

      <style>{`
        .case-converter {
          display: grid;
          gap: 30px;
        }

        .input-section {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.6s ease-out;
        }

        .label {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
        }

        .input-textarea {
          width: 100%;
          min-height: 150px;
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          font-family: 'Courier New', monospace;
          resize: vertical;
          transition: border-color 0.3s ease;
        }

        .input-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .input-stats {
          display: flex;
          gap: 20px;
          margin: 15px 0;
          padding: 15px;
          background: #f5f5f5;
          border-radius: 8px;
          font-size: 0.9rem;
          color: #666;
        }

        .input-stats span {
          display: flex;
          align-items: center;
        }

        .clear-button {
          background: #ff6b6b;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .clear-button:hover {
          background: #ff5252;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }

        .outputs-section {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .outputs-section h2 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 20px;
        }

        .outputs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .input-section,
          .outputs-section {
            padding: 20px;
          }

          .outputs-grid {
            grid-template-columns: 1fr;
          }

          .input-stats {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default CaseConverter;
