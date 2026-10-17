import React, { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof document !== 'undefined') {
      const currentAttr = document.documentElement.getAttribute('data-theme') as ThemeMode | null;
      if (currentAttr) return currentAttr;
      try {
        const stored = localStorage.getItem('cc_theme') as ThemeMode | null;
        if (stored) return stored;
      } catch (e) {}
    }
    return 'dark';
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 2. Listen for system theme changes if user hasn't explicitly set a preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('cc_theme')) {
        const nextTheme = e.matches ? 'dark' : 'light';
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('cc_theme', nextTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="theme-toggle-skeleton" style={{ width: 44, height: 44 }} />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="icon-wrapper">
        {theme === 'dark' ? (
          // Sun Icon (Switch to Light)
          <svg
            className="theme-icon sun-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : (
          // Moon Icon (Switch to Dark)
          <svg
            className="theme-icon moon-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </div>

      <style>{`
        .theme-toggle-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          outline: none;
        }

        .theme-toggle-btn:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        .theme-toggle-btn:active {
          transform: scale(0.94);
        }

        .theme-toggle-btn:focus-visible {
          box-shadow: 0 0 0 2px var(--accent-primary);
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .theme-toggle-btn:hover .icon-wrapper {
          transform: rotate(15deg);
        }

        .theme-icon {
          color: var(--text-primary);
          transition: color 0.2s ease;
        }

        .sun-icon {
          color: #f59e0b;
        }

        .moon-icon {
          color: #6366f1;
        }
      `}</style>
    </button>
  );
}
