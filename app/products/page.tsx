import ProductsClient from "./ProductsClient";
import { generateMetadata } from "@/lib/meta";

export const metadata = generateMetadata("/products");

export default function ProductsPageServer() {
  return <ProductsClient />;
}
