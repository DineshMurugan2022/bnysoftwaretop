import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with B & Y Technology to learn how our retail software can transform your business.",
};

export default function ContactPage() {
  return <ContactClient />;
}
