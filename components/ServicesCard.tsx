"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";

interface Service {
  name: string;
  icon: string;
  slug: string;
  hasProducts: boolean;
}

interface ServicesCardProps {
  title?: string;
  description?: string;
  services?: Service[];
  backgroundImage?: string;
}

const defaultServices: Service[] = [
  { name: "Air Compressor", icon: "air", slug: "air-compressor", hasProducts: true },
  { name: "Service Pump", icon: "water_pump", slug: "water-pump", hasProducts: true },
  { name: "Electric Blower", icon: "mode_fan", slug: "electric-blower", hasProducts: false },
  { name: "Oil Level Indicator", icon: "oil_barrel", slug: "oil-level-indicator", hasProducts: false },
  { name: "Vulcanizing Machine", icon: "local_fire_department", slug: "vulcanizing-machine", hasProducts: false },
  { name: "Electric Motor", icon: "electric_meter", slug: "electric-motor", hasProducts: false },
  { name: "Workshop Machinery", icon: "precision_manufacturing", slug: "workshop-machinery", hasProducts: false },
  { name: "Wood Working Machinery", icon: "carpenter", slug: "wood-working-machinery", hasProducts: false },
  { name: "Electric Machinery", icon: "electric_bolt", slug: "electric-machinery", hasProducts: false },
  { name: "Spares & Parts", icon: "settings", slug: "spares-parts", hasProducts: false },
  { name: "Repairing & Jobwork", icon: "build", slug: "repairing-jobwork", hasProducts: false },
];

export function ServicesCard({
  title = "Our Services",
  description = "Industrial machinery & hardware solutions.",
  services = defaultServices,
  backgroundImage,
}: ServicesCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleServiceClick = (service: Service) => {
    if (service.hasProducts) {
      setIsOpen(false);
      // Small delay to allow modal to close before navigation
      setTimeout(() => {
        router.push(`/products?category=${service.slug}`);
      }, 100);
    }
  };

  return (
    <>
      {/* Services Trigger Card */}
      <button
        type="button"
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
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        icon={<span className="material-symbols-outlined">category</span>}
        iconClassName="bg-primary/20 text-primary"
      >
        {/* Services List */}
        <div className="space-y-3">
          {services.map((service, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleServiceClick(service)}
              className={`flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all ${
                service.hasProducts
                  ? "cursor-pointer bg-white/5 hover:bg-white/10 hover:border-primary/30 border border-transparent"
                  : "cursor-default bg-white/2 opacity-60"
              }`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                service.hasProducts ? "bg-primary/20 text-primary" : "bg-slate-700/50 text-slate-500"
              }`}>
                <span className="material-symbols-outlined">{service.icon}</span>
              </div>
              <div className="flex-1">
                <p className={`font-medium ${service.hasProducts ? "text-white" : "text-slate-400"}`}>
                  {service.name}
                </p>
                {service.hasProducts ? (
                  <p className="text-xs text-primary/70">View Products →</p>
                ) : (
                  <p className="text-xs text-slate-500">Coming Soon</p>
                )}
              </div>
              {service.hasProducts && (
                <span className="material-symbols-outlined text-primary/50 text-[20px]">chevron_right</span>
              )}
            </button>
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
