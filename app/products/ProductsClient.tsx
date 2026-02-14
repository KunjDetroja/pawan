"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

interface Product {
  image: string;
  name: string;
  model: string;
  litre: string;
  category: string;
}

interface AirCompressor {
  image: string;
  name: string;
  model: string;
  hp: string;
  tank: string;
  litre: string;
  pound: string;
  piston: string;
  oil: string;
  weight: string;
  workingPressure: string;
  category: string;
}

// Category definitions for filter dropdown
const categories = [
  { slug: "all", name: "All Products", icon: "apps" },
  { slug: "air-compressor", name: "Air Compressor", icon: "air" },
  { slug: "water-pump", name: "Service Pump", icon: "water_pump" },
];

// Air Compressor products data
const airCompressorProducts: AirCompressor[] = [
  {
    image: "/product/air_compressor/AK 4 12-30.jpg",
    name: "Air Compressor",
    model: "AK-4 12-30",
    hp: "1",
    tank: "12*30",
    litre: "60",
    pound: "200",
    piston: "Single",
    oil: "220 no",
    weight: "60 kg",
    workingPressure: "130 psi",
    category: "air-compressor",
  },
  {
    image: "/product/air_compressor/AK 4 15-36.jpg",
    name: "Air Compressor",
    model: "AK-4 15-36",
    hp: "1",
    tank: "15*36",
    litre: "100",
    pound: "300",
    piston: "Single",
    oil: "220 no",
    weight: "115 kg",
    workingPressure: "100 psi",
    category: "air-compressor",
  },
  {
    image: "/product/air_compressor/AK6 10-28.jpg",
    name: "Air Compressor",
    model: "AK-6 10-28",
    hp: "1",
    tank: "10*28",
    litre: "40",
    pound: "150",
    piston: "Double",
    oil: "220 no",
    weight: "50 kg",
    workingPressure: "100 psi",
    category: "air-compressor",
  },
  {
    image: "/product/air_compressor/AK 6 12-30.jpg",
    name: "Air Compressor",
    model: "AK-6 12-30",
    hp: "1",
    tank: "12*30",
    litre: "60",
    pound: "200",
    piston: "Double",
    oil: "220 no",
    weight: "128 kg",
    workingPressure: "115 psi",
    category: "air-compressor",
  },
  {
    image: "/product/air_compressor/AK 6 15-36.jpg",
    name: "Air Compressor",
    model: "AK-6 15-36",
    hp: "1",
    tank: "15*36",
    litre: "100",
    pound: "300",
    piston: "Double",
    oil: "220 no",
    weight: "60 kg",
    workingPressure: "150 psi",
    category: "air-compressor",
  },
  {
    image: "/product/air_compressor/AK 8 16-36.jpg",
    name: "Air Compressor",
    model: "AK-8 16-36",
    hp: "2",
    tank: "18*36",
    litre: "150",
    pound: "300",
    piston: "Double",
    oil: "220 no",
    weight: "90 kg",
    workingPressure: "150 psi",
    category: "air-compressor",
  },
  {
    image: "/product/air_compressor/AK 8V 16-36.jpg",
    name: "Air Compressor",
    model: "AK-8V 16-36",
    hp: "2",
    tank: "16-36",
    litre: "130",
    pound: "300",
    piston: "Double",
    oil: "220 no",
    weight: "-",
    workingPressure: "-",
    category: "air-compressor",
  },
];

// Parse pump images to product data
const pumpProducts: Product[] = [
  {
    image: "/product/pump/ke-c2-24.jpeg",
    name: "Service Pump",
    model: "KE-C2-24",
    litre: "24",
    category: "water-pump",
  },
  {
    image: "/product/pump/ke-c3-35.jpeg",
    name: "Service Pump",
    model: "KE-C3-35",
    litre: "35",
    category: "water-pump",
  },
  {
    image: "/product/pump/ke-g3-50.jpeg",
    name: "Service Pump",
    model: "KE-G3-50",
    litre: "50",
    category: "water-pump",
  },
  {
    image: "/product/pump/ke-s2-24.jpeg",
    name: "Service Pump",
    model: "KE-S2-24",
    litre: "24",
    category: "water-pump",
  },
  {
    image: "/product/pump/ke-s3-35.jpeg",
    name: "Service Pump",
    model: "KE-S3-35",
    litre: "35",
    category: "water-pump",
  },
  {
    image: "/product/pump/ke-s3-36.jpeg",
    name: "Service Pump",
    model: "KE-S3-36",
    litre: "36",
    category: "water-pump",
  },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Collapsible section states - all expanded by default
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    pumps: true,
    airCompressors: true,
  });

  // Toggle section expand/collapse
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Expand all sections
  const expandAll = () => {
    setExpandedSections({
      pumps: true,
      airCompressors: true,
    });
  };

  // Collapse all sections
  const collapseAll = () => {
    setExpandedSections({
      pumps: false,
      airCompressors: false,
    });
  };

  // Derive category directly from URL params (single source of truth)
  const selectedCategory = searchParams.get("category") || "all";

  // Handle category change
  const handleCategoryChange = (slug: string) => {
    setIsDropdownOpen(false);
    if (slug === "all") {
      router.push("/products");
    } else {
      router.push(`/products?category=${slug}`);
    }
  };

  // Clear filter
  const handleClearFilter = () => {
    router.push("/products");
  };

  // Get current category info
  const currentCategory = categories.find((c) => c.slug === selectedCategory) || categories[0];

  // Filter products based on selected category
  const showPumps = selectedCategory === "all" || selectedCategory === "water-pump";
  const showAirCompressors = selectedCategory === "all" || selectedCategory === "air-compressor";

  // Count total products
  const totalProducts =
    (showPumps ? pumpProducts.length : 0) +
    (showAirCompressors ? airCompressorProducts.length : 0);

  // Check if all sections are collapsed
  const allCollapsed = !expandedSections.pumps && !expandedSections.airCompressors;

  return (
    <div className="min-h-dvh bg-slate-950">
      {/* Background gradient overlay */}
      <div className="pointer-events-none fixed inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950" />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-md items-center gap-4 px-4 py-4">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Our Products</h1>
            <p className="text-sm text-slate-400">
              {totalProducts} products available
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-md px-4 py-6">
        {/* Filter Section */}
        <div className="mb-6">
          {/* Filter Label */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">Filter by Category</p>
            {selectedCategory !== "all" && (
              <button
                onClick={handleClearFilter}
                className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
                Clear Filter
              </button>
            )}
          </div>

          {/* Dropdown + Expand/Collapse in one row */}
          <div className="flex items-center gap-3">
            {/* Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-all hover:border-primary/30 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <span className="material-symbols-outlined text-[20px]">
                      {currentCategory.icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{currentCategory.name}</p>
                    <p className="text-xs text-slate-500">
                      {selectedCategory === "all"
                        ? `${totalProducts} products`
                        : selectedCategory === "water-pump"
                        ? `${pumpProducts.length} products`
                        : `${airCompressorProducts.length} products`}
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-slate-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>

              {/* Dropdown Options */}
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                        selectedCategory === category.slug
                          ? "bg-primary/10 text-primary"
                          : "text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {category.icon}
                      </span>
                      <span className="font-medium">{category.name}</span>
                      {selectedCategory === category.slug && (
                        <span className="material-symbols-outlined ml-auto text-[18px]">
                          check
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Expand/Collapse Button - only show when "All Products" is selected */}
            {selectedCategory === "all" && (
              <button
                type="button"
                onClick={allCollapsed ? expandAll : collapseAll}
                className="flex h-[62px] items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-medium text-slate-400 transition-all hover:border-primary/30 hover:bg-white/10 hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {allCollapsed ? "unfold_more" : "unfold_less"}
                </span>
              </button>
            )}
          </div>

          {/* Active Filter Badge */}
          {selectedCategory !== "all" && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-slate-500">Active filter:</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                <span className="material-symbols-outlined text-[14px]">
                  {currentCategory.icon}
                </span>
                {currentCategory.name}
                <button
                  onClick={handleClearFilter}
                  className="ml-1 rounded-full p-0.5 transition-colors hover:bg-primary/20"
                >
                  <span className="material-symbols-outlined text-[12px]">close</span>
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Service Pumps Section */}
        {showPumps && (
          <section>
            {/* Section Header - Clickable to toggle */}
            <button
              type="button"
              onClick={() => toggleSection("pumps")}
              className="mb-4 flex w-full items-center gap-3 rounded-xl bg-white/5 p-3 text-left transition-all hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                <span className="material-symbols-outlined">water_pump</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white">Service Pumps</h2>
                <p className="text-sm text-slate-400">{pumpProducts.length} products</p>
              </div>
              <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${expandedSections.pumps ? "rotate-180" : ""}`}>
                expand_more
              </span>
            </button>

            {/* Products List - Collapsible */}
            <div className={`grid transition-all duration-300 ease-in-out ${expandedSections.pumps ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="space-y-4">
                  {pumpProducts.map((product, index) => (
                    <div
                      key={index}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-amber-500/30 hover:bg-white/10"
                    >
                      {/* Product Image */}
                      <div className="w-full overflow-hidden bg-slate-800">
                        <Image
                          unoptimized={true}
                          src={product.image}
                          alt={`${product.name} ${product.model}`}
                          height={100}
                          width={100}
                          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <p className="text-lg font-bold text-white">{product.name}</p>
                        <p className="text-sm font-medium text-amber-400">{product.model}</p>
                        <p className="mt-2 text-xs text-slate-400">Capacity: {product.litre} Litres</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Air Compressor Section */}
        {showAirCompressors && (
          <section>
            {/* Section Header - Clickable to toggle */}
            <button
              type="button"
              onClick={() => toggleSection("airCompressors")}
              className="mb-4 flex w-full items-center gap-3 rounded-xl bg-white/5 p-3 text-left transition-all hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <span className="material-symbols-outlined">air</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white">Air Compressors</h2>
                <p className="text-sm text-slate-400">{airCompressorProducts.length} products</p>
              </div>
              <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${expandedSections.airCompressors ? "rotate-180" : ""}`}>
                expand_more
              </span>
            </button>

            {/* Air Compressor Products List - Collapsible */}
            <div className={`grid transition-all duration-300 ease-in-out ${expandedSections.airCompressors ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="space-y-4">
                  {airCompressorProducts.map((product, index) => (
                    <div
                      key={index}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-emerald-500/30 hover:bg-white/10"
                    >
                      {/* Product Image */}
                      <div className="w-full overflow-hidden bg-slate-800">
                        <Image
                          unoptimized={true}
                          src={product.image}
                          alt={`${product.name} ${product.model}`}
                          height={100}
                          width={100}
                          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <p className="text-lg font-bold text-white">{product.name}</p>
                        <p className="text-sm font-medium text-emerald-400">{product.model}</p>
                        
                        {/* Specifications Grid */}
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="rounded-lg bg-white/5 p-2">
                            <p className="text-[10px] uppercase text-slate-500">HP</p>
                            <p className="text-sm font-semibold text-white">{product.hp}</p>
                          </div>
                          <div className="rounded-lg bg-white/5 p-2">
                            <p className="text-[10px] uppercase text-slate-500">Litre</p>
                            <p className="text-sm font-semibold text-white">{product.litre} L</p>
                          </div>
                          <div className="rounded-lg bg-white/5 p-2">
                            <p className="text-[10px] uppercase text-slate-500">Tank</p>
                            <p className="text-sm font-semibold text-white">{product.tank}</p>
                          </div>
                          <div className="rounded-lg bg-white/5 p-2">
                            <p className="text-[10px] uppercase text-slate-500">Piston</p>
                            <p className="text-sm font-semibold text-white">{product.piston}</p>
                          </div>
                          <div className="rounded-lg bg-white/5 p-2">
                            <p className="text-[10px] uppercase text-slate-500">Weight</p>
                            <p className="text-sm font-semibold text-white">{product.weight}</p>
                          </div>
                          <div className="col-span-2 rounded-lg bg-emerald-500/10 p-2">
                            <p className="text-[10px] uppercase text-emerald-400">Working Pressure</p>
                            <p className="text-sm font-semibold text-emerald-300">{product.workingPressure}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        {/* <section className="rounded-2xl border border-white/10 bg-linear-to-br from-amber-500/10 to-orange-500/5 p-6 text-center">
          <h3 className="mb-2 text-lg font-bold text-white">Interested in our products?</h3>
          <p className="mb-4 text-sm text-slate-400">
            Contact us for pricing, availability, and bulk orders.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black transition-all hover:bg-amber-400"
          >
            <span className="material-symbols-outlined text-[20px]">call</span>
            Contact Us
          </Link>
        </section> */}
      </main>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-slate-400">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
