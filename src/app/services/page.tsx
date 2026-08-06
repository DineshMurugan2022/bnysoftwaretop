import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services",
  description: "End-to-end technology solutions designed to scale your business, optimize operations, and drive innovation.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
