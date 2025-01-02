import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Knitting Tracker",
  description: "Manage your yarn inventory and projects",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en">
          <body>
              <Navigation /> {/* Add your NavBar here */}
              <main>{children}</main> {/* Render page content */}
          </body>
      </html>
  );
}
