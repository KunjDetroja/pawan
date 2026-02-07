"use client";

import { useState, useCallback } from "react";

interface FloatingDockProps {
  onQrCode?: () => void;
  shareTitle?: string;
  shareText?: string;
}

export function FloatingDock({
  onQrCode,
  shareTitle = "Pawan - Industrial Machinery & Hardware",
  shareText = "Check out our services!",
}: FloatingDockProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.origin,
        });
      } else {
        await navigator.clipboard.writeText(window.location.origin);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      // User cancelled or share failed, fallback to clipboard
      if ((error as Error).name !== "AbortError") {
        await navigator.clipboard.writeText(window.location.origin);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }, [shareTitle, shareText]);

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="glass-dock flex items-center gap-6 rounded-full px-5 py-3 shadow-2xl shadow-blue-900/40">
        <button onClick={onQrCode} className="group flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full bg-white/5 p-2 text-white transition-colors group-hover:bg-white/20">
            <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
          </div>
        </button>
        <div className="h-6 w-px bg-white/10" />
        <button onClick={handleShare} className="group flex flex-col items-center gap-1">
          <div
            className={`flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
              copied
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/5 text-white group-hover:bg-white/20"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {copied ? "check" : "share"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
