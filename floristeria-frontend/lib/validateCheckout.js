export function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }

  return sum % 10 === 0;
}

export function validateCheckoutForm(data) {
  const errors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Ingresa tu nombre completo";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Correo electrónico no válido";
  }

  const phone = data.phone.replace(/\D/g, "");
  if (phone.length < 8) {
    errors.phone = "Teléfono debe tener al menos 8 dígitos";
  }

  if (!data.address.trim()) {
    errors.address = "Ingresa la dirección de entrega";
  }

  if (!data.city.trim()) {
    errors.city = "Ingresa la ciudad";
  }

  const cardDigits = data.cardNumber.replace(/\D/g, "");
  if (!luhnCheck(cardDigits)) {
    errors.cardNumber = "Número de tarjeta no válido";
  }

  if (!data.cardName.trim()) {
    errors.cardName = "Nombre del titular requerido";
  }

  const [monthStr, yearStr] = data.expiry.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (!monthStr || !yearStr || month < 1 || month > 12) {
    errors.expiry = "Fecha de vencimiento inválida (MM/AA)";
  } else {
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.expiry = "La tarjeta está vencida";
    }
  }

  const cvv = data.cvv.replace(/\D/g, "");
  if (cvv.length < 3 || cvv.length > 4) {
    errors.cvv = "CVV debe tener 3 o 4 dígitos";
  }

  return errors;
}

export function getCardBrand(cardNumber) {
  const digits = cardNumber.replace(/\D/g, "");
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  return "Tarjeta";
}
