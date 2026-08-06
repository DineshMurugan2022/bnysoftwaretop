import { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
  title: "Solutions by Industry",
  description: "Enterprise software solutions tailored for retail, fashion, pharmacy, and electronics industries.",
};

export default function SolutionsPage() {
  return <SolutionsClient />;
}
