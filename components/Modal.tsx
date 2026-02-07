"use client";

import { useEffect, useRef, useCallback, useState, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  iconClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  icon,
  iconClassName = "bg-primary/20 text-primary",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // Handle open/close
  useEffect(() => {
    if (isOpen) {
      // Mount first, then animate in
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
    } else if (shouldRender) {
      // Animate out, then unmount
      setIsAnimatingIn(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  // Trigger animation after mount
  useEffect(() => {
    if (shouldRender && isOpen) {
      // Use double RAF to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
    }
  }, [shouldRender, isOpen]);

  // Handle close with animation
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (shouldRender) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldRender]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-100 flex items-center justify-center overflow-y-auto p-4 transition-all duration-300 ease-out m-0 ${
        isAnimatingIn
          ? "bg-black/50 backdrop-blur-lg"
          : "bg-black/0 backdrop-blur-none"
      }`}
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className={`relative my-auto flex max-h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/50 transition-all duration-300 ease-out ${
          isAnimatingIn
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        </div>

        {/* Sticky Header */}
        {(title || icon) && (
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-900/95 px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {icon && (
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
                >
                  {icon}
                </div>
              )}
              {title && <h2 className="text-lg font-bold text-white">{title}</h2>}
            </div>
            <button
              onClick={handleClose}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="relative flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

// Close icon component
const CloseIcon = () => (
  <svg
    className="h-5 w-5 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);
