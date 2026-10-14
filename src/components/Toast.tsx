import React, { useEffect } from 'react';

export interface ToastProps {
  message: string;
  subMessage?: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  subMessage = 'Text successfully copied to clipboard',
  isVisible,
  onClose,
  duration = 2400,
}: ToastProps) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="toast-container"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-card">
        <div className="toast-icon-wrapper">
          <svg
            className="toast-check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="toast-content">
          <p className="toast-title">{message}</p>
          {subMessage && <p className="toast-sub">{subMessage}</p>}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="toast-close-btn"
          aria-label="Dismiss notification"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="toast-progress-bar" style={{ animationDuration: `${duration}ms` }} />
      </div>

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          pointer-events: auto;
          animation: toastSlideIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .toast-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-lg), 0 0 0 1px rgba(16, 185, 129, 0.2);
          border-radius: 14px;
          padding: 14px 18px;
          min-width: 300px;
          max-width: 420px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          position: relative;
          overflow: hidden;
        }

        .toast-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          flex-shrink: 0;
        }

        .toast-check-icon {
          width: 16px;
          height: 16px;
          stroke-dasharray: 24;
          stroke-dashoffset: 0;
          animation: checkDraw 0.4s ease-out forwards;
        }

        .toast-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .toast-title {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.25;
        }

        .toast-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.2;
        }

        .toast-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .toast-close-btn:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .toast-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #10b981, #34d399);
          width: 100%;
          animation: progressShrink linear forwards;
          transform-origin: left;
        }

        @keyframes toastSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes checkDraw {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes progressShrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }

        @media (max-width: 640px) {
          .toast-container {
            bottom: 16px;
            right: 16px;
            left: 16px;
          }
          .toast-card {
            min-width: unset;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
