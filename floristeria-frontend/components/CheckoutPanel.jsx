"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Loader2,
  Lock,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import {
  formatCardNumber,
  formatExpiry,
  getCardBrand,
  validateCheckoutForm,
} from "@/lib/validateCheckout";

const DELIVERY_FEE = 35;

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "Ciudad de Guatemala",
  deliveryDate: "",
  deliveryNotes: "",
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvv: "",
};

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export default function CheckoutPanel({ total, onBack, onComplete }) {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form");
  const [orderId, setOrderId] = useState("");

  const grandTotal = total + DELIVERY_FEE;
  const cardBrand = getCardBrand(form.cardNumber);

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateCheckoutForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStep("processing");

    await new Promise((resolve) => setTimeout(resolve, 2200));

    const id = `FL-${Date.now().toString(36).toUpperCase().slice(-8)}`;
    setOrderId(id);
    clearCart();
    setStep("success");
  }

  if (step === "processing") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="text-rose animate-spin mb-4" size={48} />
        <p className="font-serif text-xl">Procesando pago…</p>
        <p className="text-sm text-muted mt-2">
          Validando tarjeta {cardBrand} de forma segura
        </p>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="text-green-600" size={36} />
        </div>
        <p className="font-serif text-2xl text-foreground">¡Compra exitosa!</p>
        <p className="text-sm text-muted mt-2 max-w-xs">
          Tu pedido <strong className="text-foreground">{orderId}</strong> fue
          confirmado. Recibirás un correo a {form.email}.
        </p>
        <p className="text-sm text-muted mt-4">
          Entrega estimada: {form.deliveryDate || "próximo día hábil"}
        </p>
        <button
          type="button"
          onClick={onComplete}
          className="mt-8 bg-rose text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-rose-dark"
        >
          Seguir explorando
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-rose"
        >
          <ArrowLeft size={16} />
          Volver al carrito
        </button>

        <div className="bg-cream rounded-xl p-4 border border-border text-sm">
          <p className="font-medium mb-2">
            Resumen ({cart.length} {cart.length === 1 ? "artículo" : "artículos"})
          </p>
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-muted mt-1">
            <span>Envío</span>
            <span>{formatPrice(DELIVERY_FEE)}</span>
          </div>
          <div className="flex justify-between font-serif text-lg text-rose mt-2 pt-2 border-t border-border">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
        </div>

        <section>
          <h3 className="font-serif text-lg flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-rose" />
            Datos de entrega
          </h3>
          <div className="space-y-3">
            <Field label="Nombre completo" error={errors.fullName}>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-rose"
                placeholder="María López"
              />
            </Field>
            <Field label="Correo electrónico" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-rose"
                placeholder="maria@correo.com"
              />
            </Field>
            <Field label="Teléfono" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-rose"
                placeholder="502 5555 5555"
              />
            </Field>
            <Field label="Dirección" error={errors.address}>
              <input
                type="text"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-rose"
                placeholder="Zona 10, 12 calle 5-30"
              />
            </Field>
            <Field label="Ciudad" error={errors.city}>
              <input
                type="text"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-rose"
              />
            </Field>
            <Field label="Fecha de entrega" error={errors.deliveryDate}>
              <input
                type="date"
                value={form.deliveryDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => updateField("deliveryDate", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-rose"
              />
            </Field>
            <Field label="Notas (opcional)" error={null}>
              <textarea
                value={form.deliveryNotes}
                onChange={(e) => updateField("deliveryNotes", e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm resize-none focus:outline-none focus:border-rose"
                placeholder="Ej. Entregar después de las 14:00"
              />
            </Field>
          </div>
        </section>

        <section>
          <h3 className="font-serif text-lg flex items-center gap-2 mb-2">
            <CreditCard size={18} className="text-rose" />
            Pago con tarjeta
          </h3>
          <p className="text-xs text-muted mb-4 flex items-center gap-1">
            <Lock size={12} />
            Simulación segura · Prueba: 4242 4242 4242 4242
          </p>
          <div className="space-y-3">
            <Field label={`Número de tarjeta (${cardBrand})`} error={errors.cardNumber}>
              <input
                type="text"
                inputMode="numeric"
                value={form.cardNumber}
                onChange={(e) =>
                  updateField("cardNumber", formatCardNumber(e.target.value))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm font-mono focus:outline-none focus:border-rose"
                placeholder="4242 4242 4242 4242"
                maxLength={19}
              />
            </Field>
            <Field label="Nombre en la tarjeta" error={errors.cardName}>
              <input
                type="text"
                value={form.cardName}
                onChange={(e) =>
                  updateField("cardName", e.target.value.toUpperCase())
                }
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-rose"
                placeholder="MARIA LOPEZ"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Vencimiento" error={errors.expiry}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.expiry}
                  onChange={(e) =>
                    updateField("expiry", formatExpiry(e.target.value))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm font-mono focus:outline-none focus:border-rose"
                  placeholder="MM/AA"
                  maxLength={5}
                />
              </Field>
              <Field label="CVV" error={errors.cvv}>
                <input
                  type="password"
                  inputMode="numeric"
                  value={form.cvv}
                  onChange={(e) =>
                    updateField(
                      "cvv",
                      e.target.value.replace(/\D/g, "").slice(0, 4)
                    )
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm font-mono focus:outline-none focus:border-rose"
                  placeholder="123"
                  maxLength={4}
                />
              </Field>
            </div>
          </div>
        </section>
      </div>

      <div className="border-t border-border p-5 bg-cream shrink-0">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-rose text-white py-3.5 rounded-full font-medium hover:bg-rose-dark transition-colors"
        >
          <Lock size={18} />
          Pagar {formatPrice(grandTotal)}
        </button>
        <p className="text-[10px] text-muted text-center mt-2">
          No se realiza un cargo real. Solo simulación de compra.
        </p>
      </div>
    </form>
  );
}
