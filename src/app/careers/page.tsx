import { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join our team of talented individuals passionate about building the future of enterprise technology.",
};

export default function CareersPage() {
  return <CareersClient />;
}
