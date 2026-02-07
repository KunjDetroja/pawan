"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Service {
  name: string;
  icon: string;
}

interface ServicesCardProps {
  title?: string;
  description?: string;
  services?: Service[];
  backgroundImage?: string;
}

const defaultServices: Service[] = [
  { name: "Workshop Machinery", icon: "precision_manufacturing" },
  { name: "Wood Working Machinery", icon: "carpenter" },
  { name: "Electric Machinery", icon: "electric_bolt" },
  { name: "M.S. & S.S. Hardware", icon: "hardware" },
  { name: "Spares & Parts", icon: "settings" },
  { name: "Repairing & Jobwork", icon: "build" },
];

export function ServicesCard({
  title = "Our Services",
  description = "Industrial machinery & hardware solutions.",
  services = defaultServices,
  backgroundImage,
}: ServicesCardProps) {
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

  return (
    <>
      {/* Services Trigger Card */}
      <button
        onClick={() => setIsOpen(true)}
        className="glass-card relative w-full overflow-hidden rounded-2xl p-5 text-left transition-all hover:bg-white/5"
      >
        {/* Background decorative image */}
        {backgroundImage && (
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover object-right"
            />
          </div>
        )}

        {/* Default decorative gradient if no image */}
        {!backgroundImage && (
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="max-w-[75%]">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              {description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              View All
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[28px]">category</span>
          </div>
        </div>
      </button>

      {/* Services Modal */}
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">category</span>
                </div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Services List */}
            <div className="space-y-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-white/5 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">{service.icon}</span>
                  </div>
                  <p className="font-medium text-white">{service.name}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <p className="mt-4 text-center text-xs text-slate-500">
              Contact us for more information
            </p>
          </div>
        </div>
      )}
    </>
  );
}
