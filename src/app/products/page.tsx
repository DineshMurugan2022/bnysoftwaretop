import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products | B & Y Technology",
  description: "Explore our enterprise software solutions.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
