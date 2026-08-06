import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the mission, vision, and team behind B & Y Technology.",
};

export default function AboutPage() {
  return <AboutClient />;
}
