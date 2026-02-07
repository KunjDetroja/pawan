"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "./Modal";
import { PhoneIcon } from "./ActionCard";

interface PhoneNumber {
  label: string;
  number: string;
  displayNumber: string;
}

interface PhoneCardProps {
  phoneNumbers: PhoneNumber[];
  colorScheme?: "green" | "teal" | "orange" | "purple" | "blue";
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
};

export function PhoneCard({
  phoneNumbers,
  colorScheme = "green",
}: PhoneCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = colorSchemes[colorScheme];

  return (
    <>
      {/* Phone Trigger Card */}
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
          <PhoneIcon />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-medium text-slate-400">Call Us</p>
          <p className="font-bold tracking-tight text-white">Tap to Call</p>
        </div>
      </button>

      {/* Phone Selection Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select Number"
        icon={<PhoneIcon />}
        iconClassName="bg-green-500/20 text-green-400"
      >
        <div className="space-y-3">
          {phoneNumbers.map((phone, index) => (
            <a
              key={index}
              href={`tel:${phone.number}`}
              onClick={() => setIsOpen(false)}
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
