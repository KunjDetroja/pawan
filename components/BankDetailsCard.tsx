"use client";

import { useState, useEffect } from "react";

interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  ifscCode: string;
}

interface BankDetailsCardProps {
  bankDetails: BankDetails;
}

// Bank icon component
const BankIcon = ({ className = "h-7 w-7" }: { className?: string }) => (
  <svg
    className={`${className} fill-current`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1 2 6v2h20V6z" />
  </svg>
);

// Chevron icon component
const ChevronRightIcon = () => (
  <svg
    className="h-6 w-6 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
  </svg>
);

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

// Copy icon component
const CopyIcon = () => (
  <svg
    className="h-5 w-5 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z" />
  </svg>
);

export function BankDetailsCard({ bankDetails }: BankDetailsCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <>
      {/* Bank Details Trigger Card */}
      <button
        onClick={() => setIsOpen(true)}
        className="glass-card flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left transition-all hover:bg-white/5"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/20 to-emerald-600/5 text-emerald-400">
            <BankIcon />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-white">Bank Details</h3>
            <p className="text-sm text-slate-400">View banking information</p>
          </div>
        </div>
        <span className="text-slate-400">
          <ChevronRightIcon />
        </span>
      </button>

      {/* Bank Details Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="glass-card my-auto w-full max-w-sm rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <BankIcon className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold text-white">Bank Details</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Bank Info */}
            <div className="space-y-4">
              {/* Bank Name */}
              <div className="rounded-xl bg-white/5 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Bank
                </p>
                <p className="font-semibold text-white">{bankDetails.bankName}</p>
              </div>

              {/* Account Name */}
              <div className="rounded-xl bg-white/5 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Account Name
                </p>
                <p className="font-semibold text-white">{bankDetails.accountName}</p>
              </div>

              {/* Account Number - Copyable */}
              <button
                onClick={() => copyToClipboard(bankDetails.accountNumber)}
                className="group flex w-full items-center justify-between rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
              >
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Account Number
                  </p>
                  <p className="font-mono font-semibold text-white">{bankDetails.accountNumber}</p>
                </div>
                <span className="text-slate-500 transition-colors group-hover:text-primary">
                  <CopyIcon />
                </span>
              </button>

              {/* Branch */}
              <div className="rounded-xl bg-white/5 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Branch
                </p>
                <p className="font-semibold text-white">{bankDetails.branch}</p>
              </div>

              {/* IFSC Code - Copyable */}
              <button
                onClick={() => copyToClipboard(bankDetails.ifscCode)}
                className="group flex w-full items-center justify-between rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
              >
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                    RTGS/IFSC Code
                  </p>
                  <p className="font-mono font-semibold text-white">{bankDetails.ifscCode}</p>
                </div>
                <span className="text-slate-500 transition-colors group-hover:text-primary">
                  <CopyIcon />
                </span>
              </button>
            </div>

            {/* Footer Note */}
            <p className="mt-4 text-center text-xs text-slate-500">
              Tap on account number or IFSC to copy
            </p>
          </div>
        </div>
      )}
    </>
  );
}
