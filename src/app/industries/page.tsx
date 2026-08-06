import { Metadata } from "next";
import IndustriesClient from "./IndustriesClient";

export const metadata: Metadata = {
  title: "Industries | B & Y Technology",
  description: "Retail software solutions for various industries.",
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
