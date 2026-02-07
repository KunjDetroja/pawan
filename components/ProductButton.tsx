import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductButtonProps {
  colorScheme?: "green" | "teal" | "orange" | "purple" | "blue" | "amber";
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
  amber: {
    gradient: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/20",
    text: "text-amber-400",
    hover: "group-hover:text-amber-300",
  },
};

// Product icon component
const ProductIcon = () => (
  <svg
    className="h-7 w-7 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 6V4l-2-2h-5L9 4v2H5v11s1 2 2 2h11c1 0 2-1.36 2-2V6h-2zm-7-2h3v2h-3V4zM7 6h11v11H7V6zm3 2v7h1V9h2v6h1V9h2v6h1V8h-7z" />
  </svg>
);

export function ProductButton({ colorScheme = "amber" }: ProductButtonProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <Link
      href="/products"
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
        <ProductIcon />
      </div>
      <div className="relative z-10">
        <p className="text-xs font-medium text-slate-400">Products</p>
        <p className="font-bold tracking-tight text-white">View All</p>
      </div>
    </Link>
  );
}
