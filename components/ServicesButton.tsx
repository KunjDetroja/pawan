"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "./Modal";

interface Service {
  name: string;
  icon: string;
}

interface ServicesButtonProps {
  title?: string;
  services?: Service[];
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

const defaultServices: Service[] = [
  { name: "Air Compressor", icon: "air" },
  { name: "Service Pump", icon: "water_pump" },
  { name: "Electric Blower", icon: "mode_fan" },
  { name: "Oil Level Indicator", icon: "oil_barrel" },
  { name: "Vulcanizing Machine", icon: "local_fire_department" },
  { name: "Electric Motor", icon: "electric_meter" },
  { name: "Workshop Machinery", icon: "precision_manufacturing" },
  { name: "Wood Working Machinery", icon: "carpenter" },
  { name: "Electric Machinery", icon: "electric_bolt" },
  { name: "Spares & Parts", icon: "settings" },
  { name: "Repairing & Jobwork", icon: "build" },
];

// Services icon component - Tools representing industrial machinery & services
const ServicesIcon = () => (
  <svg
    className="h-7 w-7 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </svg>
);

export function ServicesButton({
  title = "Our Services",
  services = defaultServices,
  colorScheme = "purple",
}: ServicesButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = colorSchemes[colorScheme];

  return (
    <>
      {/* Services Trigger Button */}
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
          <ServicesIcon />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-medium text-slate-400">Services</p>
          <p className="font-bold tracking-tight text-white">View All</p>
        </div>
      </button>

      {/* Services Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        icon={<ServicesIcon />}
        iconClassName="bg-purple-500/20 text-purple-400"
      >
        {/* Services List */}
        <div className="space-y-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                <span className="material-symbols-outlined">{service.icon}</span>
              </div>
              <p className="font-medium text-white">{service.name}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-slate-400">
          Contact us for more information
        </p>
      </Modal>
    </>
  );
}
