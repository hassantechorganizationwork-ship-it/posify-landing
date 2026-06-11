// Single source of truth for Posify contact details — keep all WhatsApp links in sync.
export const WA_NUMBER = "923174065200"; // 0317-4065200 in international format
export const PHONE_DISPLAY = "0317-4065200";
export const EMAIL = "info@posify.pk";

export const WA_DEFAULT_MESSAGE =
  "Assalam o Alaikum! Mujhe Posify POS ke baare mein maloomat chahiye. Please details bhejein.";

export function waLink(message: string = WA_DEFAULT_MESSAGE) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
