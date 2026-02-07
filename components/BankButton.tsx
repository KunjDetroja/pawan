"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "./Modal";

interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  ifscCode: string;
}

interface BankButtonProps {
  bankDetails: BankDetails;
  colorScheme?: "green" | "teal" | "orange" | "purple" | "blue" | "emerald";
}

const colorSchemes = {
  green: {
    gradient: "from-green-500/20 to-green-600/5",
    border: "border-green-500/20",
    text: "text-green-400",
    hover: "group-hover:text-green-300",
  },
  teal: {
    gradient: "from-teal-500/20 to-teal-600/5",
    border: "border-teal-500/20",
    text: "text-teal-400",
    hover: "group-hover:text-teal-300",
  },
  orange: {
    gradient: "from-orange-500/20 to-orange-600/5",
    border: "border-orange-500/20",
    text: "text-orange-400",
    hover: "group-hover:text-orange-300",
  },
  purple: {
    gradient: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/20",
    text: "text-purple-400",
    hover: "group-hover:text-purple-300",
  },
  blue: {
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/20",
    text: "text-blue-400",
    hover: "group-hover:text-blue-300",
  },
  emerald: {
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    hover: "group-hover:text-emerald-300",
  },
};

// Bank icon component
const BankIcon = () => (
  <svg
    className="h-7 w-7 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1 2 6v2h20V6z" />
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

// Check/Tick icon component
const CheckIcon = () => (
  <svg
    className="h-5 w-5 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

export function BankButton({
  bankDetails,
  colorScheme = "emerald",
}: BankButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const colors = colorSchemes[colorScheme];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <>
      {/* Bank Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="glass-card group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl p-4 text-left transition-all hover:bg-white/5"
      >
        <div
          className={cn(
            "relative z-10 flex items-center justify-center rounded-xl border bg-linear-to-br p-2.5 transition-colors duration-300",
            colors.gradient,
            colors.border,
            colors.text,
            colors.hover
          )}
        >
          <BankIcon />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-medium text-slate-400">Bank</p>
          <p className="font-bold tracking-tight text-white">View Details</p>
        </div>
      </button>

      {/* Bank Details Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Bank Details"
        icon={<BankIcon />}
        iconClassName="bg-emerald-500/20 text-emerald-400"
      >
        {/* Bank Info */}
        <div className="space-y-4">
          {/* Bank Name */}
          <div className="rounded-xl bg-white/5 p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              Bank
            </p>
            <p className="font-semibold text-white">{bankDetails.bankName}</p>
          </div>

          {/* Account Name */}
          <div className="rounded-xl bg-white/5 p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              Account Name
            </p>
            <p className="font-semibold text-white">{bankDetails.accountName}</p>
          </div>

          {/* Account Number - Copyable */}
          <button
            onClick={() => copyToClipboard(bankDetails.accountNumber, "accountNumber")}
            className="group flex w-full items-center justify-between rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
          >
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                Account Number
              </p>
              <p className="font-mono font-semibold text-white">{bankDetails.accountNumber}</p>
            </div>
            <span
              className={`transition-all duration-300 ${
                copiedField === "accountNumber"
                  ? "scale-110 text-emerald-400"
                  : "scale-100 text-slate-400 group-hover:text-primary"
              }`}
            >
              {copiedField === "accountNumber" ? <CheckIcon /> : <CopyIcon />}
            </span>
          </button>

          {/* Branch */}
          <div className="rounded-xl bg-white/5 p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              Branch
            </p>
            <p className="font-semibold text-white">{bankDetails.branch}</p>
          </div>

          {/* IFSC Code - Copyable */}
          <button
            onClick={() => copyToClipboard(bankDetails.ifscCode, "ifscCode")}
            className="group flex w-full items-center justify-between rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
          >
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                RTGS/IFSC Code
              </p>
              <p className="font-mono font-semibold text-white">{bankDetails.ifscCode}</p>
            </div>
            <span
              className={`transition-all duration-300 ${
                copiedField === "ifscCode"
                  ? "scale-110 text-emerald-400"
                  : "scale-100 text-slate-400 group-hover:text-primary"
              }`}
            >
              {copiedField === "ifscCode" ? <CheckIcon /> : <CopyIcon />}
            </span>
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-4 text-center text-xs text-slate-400">
          Tap on account number or IFSC to copy
        </p>
      </Modal>
    </>
  );
}
