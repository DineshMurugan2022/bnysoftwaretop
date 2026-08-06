import { Metadata } from "next";
import CustomersClient from "./CustomersClient";

export const metadata: Metadata = {
  title: "Customers & Success Stories",
  description: "Read how leading brands use B&Y Technology to transform their retail operations.",
};

export default function CustomersPage() {
  return <CustomersClient />;
}
