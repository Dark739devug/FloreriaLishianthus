import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diseña tu ramo | Florería Lisianthus",
  description:
    "Crea tu ramo personalizado: elige flores, colores, envoltorio y mensaje.",
};

export default function DisenaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
