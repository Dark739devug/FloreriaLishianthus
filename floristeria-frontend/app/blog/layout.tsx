import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Florería Lisianthus",
  description:
    "Consejos, tendencias y guías sobre flores y regalos. Inspiración para sorprender a quien más quieres.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
