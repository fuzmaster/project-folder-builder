import Stripe from "stripe";

export const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
export const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
export const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "";

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-02-24.acacia"
    })
  : null;
