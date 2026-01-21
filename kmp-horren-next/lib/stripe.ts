import Stripe from "stripe";

// Server-side Stripe instance
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2023-10-16",
      typescript: true,
    });
  }
  return stripeInstance;
}

/**
 * Format amount for Stripe (converts euros to cents)
 * Stripe requires amounts in the smallest currency unit
 * €10.50 becomes 1050
 */
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Format amount from Stripe (converts cents to euros)
 * 1050 becomes €10.50
 */
export function formatAmountFromStripe(amount: number): number {
  return amount / 100;
}

/**
 * Map internal payment method names to Stripe payment method types
 */
export function mapPaymentMethodToStripe(
  method: string
): Stripe.Checkout.SessionCreateParams.PaymentMethodType[] {
  const methodMap: Record<
    string,
    Stripe.Checkout.SessionCreateParams.PaymentMethodType[]
  > = {
    ideal: ["ideal"],
    bancontact: ["bancontact"],
    creditcard: ["card"],
    paypal: ["paypal"],
    klarna: ["klarna"],
  };
  return methodMap[method] || ["ideal", "card", "bancontact"];
}
