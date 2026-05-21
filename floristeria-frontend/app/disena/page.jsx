import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import SiteShell from "@/components/SiteShell";
import BouquetDesigner from "@/components/BouquetDesigner";

export default function DisenaPage() {
  return (
    <SiteShell>
      <main className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-rose transition-colors"
          >
            <ChevronLeft size={18} />
            Volver al inicio
          </Link>
        </div>

        <BouquetDesigner />
      </main>
    </SiteShell>
  );
}
