import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActionCardProps {
  href: string;
  icon?: string;
  customIcon?: ReactNode;
  label: string;
  value: string;
  colorScheme: "green" | "teal" | "orange" | "purple" | "blue";
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

// Phone icon component
export const PhoneIcon = () => (
  <svg
    className="h-7 w-7 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
  </svg>
);

// WhatsApp icon component
export const WhatsAppIcon = () => (
  <svg
    className="h-7 w-7 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

// Email icon component
export const EmailIcon = () => (
  <svg
    className="h-7 w-7 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

// Facebook icon component
export const FacebookIcon = () => (
  <svg
    className="h-7 w-7 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export function ActionCard({
  href,
  icon,
  customIcon,
  label,
  value,
  colorScheme,
}: ActionCardProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="glass-card group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl p-4"
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
        {customIcon ? (
          customIcon
        ) : (
          <span className="material-symbols-outlined text-[28px]">{icon}</span>
        )}
      </div>
      <div className="relative z-10">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="font-bold tracking-tight text-white">{value}</p>
      </div>
    </a>
  );
}
