"use client";

import { useState, useCallback } from "react";
import { Modal } from "./Modal";

// Phone icon component
const PhoneIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    className={`${className} fill-current`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
  </svg>
);

// WhatsApp icon component
const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    className={`${className} fill-current`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

// Phone numbers configuration
const phoneNumbers = [
  {
    label: "Primary",
    number: "+919428010011",
    displayNumber: "+91 94280 10011",
  },
  {
    label: "Alternative",
    number: "+919723600001",
    displayNumber: "+91 97236 00001",
  },
];

interface FloatingDockProps {
  shareTitle?: string;
  shareText?: string;
  whatsappNumber?: string;
}

export function FloatingDock({
  shareTitle = "Pawan - Industrial Machinery & Hardware",
  shareText = "Check out our services!",
  whatsappNumber = "919428010011",
}: FloatingDockProps) {
  const [copied, setCopied] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

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
    <>
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <div className="glass-dock flex items-center gap-4 rounded-full px-5 py-3 shadow-2xl shadow-blue-900/40">
          {/* Call Button */}
          <button
            onClick={() => setIsPhoneModalOpen(true)}
            className="group flex flex-col items-center gap-1"
          >
            <div className="flex items-center justify-center rounded-full bg-white/5 p-2.5 text-white transition-colors group-hover:bg-white/20">
              <PhoneIcon />
            </div>
          </button>

          <div className="h-6 w-px bg-white/10" />

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1"
          >
            <div className="flex items-center justify-center rounded-full bg-white/5 p-2.5 text-white transition-colors group-hover:bg-white/20">
              <WhatsAppIcon />
            </div>
          </a>

          <div className="h-6 w-px bg-white/10" />

          {/* Share Button */}
          <button onClick={handleShare} className="group flex flex-col items-center gap-1">
            <div
              className={`flex items-center justify-center rounded-full p-2.5 transition-all duration-300 ${
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

      {/* Phone Selection Modal */}
      <Modal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        title="Select Number"
        icon={<PhoneIcon className="h-6 w-6" />}
        iconClassName="bg-green-500/20 text-green-400"
      >
        <div className="space-y-3">
          {phoneNumbers.map((phone, index) => (
            <a
              key={index}
              href={`tel:${phone.number}`}
              onClick={() => setIsPhoneModalOpen(false)}
              className="group flex items-center justify-between rounded-xl bg-white/5 p-4 transition-all hover:bg-green-500/10"
            >
              <div>
                <p className="text-sm font-medium text-slate-400">{phone.label}</p>
                <p className="text-lg font-bold text-white">{phone.displayNumber}</p>
              </div>
              <span className="material-symbols-outlined text-[24px] text-slate-400 transition-colors group-hover:text-green-400">
                arrow_forward
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-slate-400">
          Tap a number to call
        </p>
      </Modal>
    </>
  );
}
