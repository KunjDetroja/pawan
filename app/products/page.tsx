import Image from "next/image";
import Link from "next/link";

interface Product {
  image: string;
  name: string;
  model: string;
  litre: string;
}

// Parse pump images to product data
const pumpProducts: Product[] = [
  {
    image: "/product/pump/ke-c2-24.jpeg",
    name: "Pump",
    model: "KE-C2-24",
    litre: "24",
  },
  {
    image: "/product/pump/ke-c3-35.jpeg",
    name: "Pump",
    model: "KE-C3-35",
    litre: "35",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-md items-center gap-4 px-4 py-4">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Our Products</h1>
            <p className="text-sm text-slate-400">Industrial Pump Solutions</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-md px-4 py-6">
        {/* Category Section */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <span className="material-symbols-outlined">water_pump</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Pumps</h2>
              <p className="text-sm text-slate-400">{pumpProducts.length} products available</p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-4">
            {pumpProducts.map((product, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-amber-500/30 hover:bg-white/10"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-800">
                  <Image
                    src={product.image}
                    alt={`${product.name} ${product.model}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Litre Badge */}
                  <div className="absolute right-2 top-2 rounded-full bg-amber-500/90 px-2 py-0.5 text-xs font-bold text-black">
                    {product.litre}L
                  </div>
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
        </section>

        {/* Contact CTA */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-6 text-center">
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
        </section>
      </main>
    </div>
  );
}
