import { Metadata } from "next";
import SupportClient from "./SupportClient";

export const metadata: Metadata = {
  title: "Support Center",
  description: "Get help, read documentation, and contact support.",
};

export default function SupportPage() {
  return <SupportClient />;
}
