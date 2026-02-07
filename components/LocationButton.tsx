"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "./Modal";

interface LocationButtonProps {
  address: string;
  city: string;
  embedUrl?: string;
  latitude?: number;
  longitude?: number;
  colorScheme?: "green" | "teal" | "orange" | "purple" | "blue" | "red";
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
  red: {
    gradient: "from-red-500/20 to-red-600/5",
    border: "border-red-500/20",
    text: "text-red-400",
    hover: "group-hover:text-red-300",
  },
};

// Location icon component
const LocationIcon = () => (
  <svg
    className="h-7 w-7 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

export function LocationButton({
  address,
  city,
  embedUrl,
  latitude = 22.283303,
  longitude = 70.799252,
  colorScheme = "red",
}: LocationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = colorSchemes[colorScheme];

  // Generate directions URL
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  };

  return (
    <>
      {/* Location Trigger Button */}
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
          <LocationIcon />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-medium text-slate-400">Location</p>
          <p className="font-bold tracking-tight text-white">View Map</p>
        </div>
      </button>

      {/* Location Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Our Location"
        icon={<LocationIcon />}
        iconClassName="bg-red-500/20 text-red-400"
      >
        {/* Map */}
        <div className="overflow-hidden rounded-xl">
          <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-800">
            {/* Google Maps Embed */}
            {embedUrl ? (
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            ) : (
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE2JzU5LjkiTiA3MMKwNDcnNTcuMyJF!5e0!3m2!1sen!2sin`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            )}
          </div>
        </div>

        {/* Address Info */}
        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-white/5 p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              Address
            </p>
            <p className="font-semibold text-white">{address}</p>
            <p className="mt-1 text-sm text-slate-300">{city}</p>
          </div>

          {/* Get Directions Button */}
          <a
            href={getDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/20 py-3 text-center font-semibold text-red-400 transition-all hover:bg-red-500/30 hover:text-red-300"
          >
            <span className="material-symbols-outlined text-[20px]">directions</span>
            Get Directions
          </a>
        </div>
      </Modal>
    </>
  );
}
