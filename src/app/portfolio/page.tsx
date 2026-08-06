import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore how we've helped enterprises transform their operations through cutting-edge technology.",
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
