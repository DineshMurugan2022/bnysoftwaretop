import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing | B & Y Technology",
  description: "Transparent pricing for enterprise retail software.",
};

export default function PricingPage() {
  return <PricingClient />;
}
