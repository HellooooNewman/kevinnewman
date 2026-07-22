// Legacy v1 URL: /home → /
import type { Metadata } from "next";
import Redirect from "@/components/Redirect";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function LegacyHomeRedirect() {
  return <Redirect to="/" />;
}
