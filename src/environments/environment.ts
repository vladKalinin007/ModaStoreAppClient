import { DevEnvironment } from "src/app/core/config/environment.enum";

export const environment = {
  production: DevEnvironment.PRODUCTION,
  apiUrl: DevEnvironment.API_URL,
  stripePublicKey: DevEnvironment.STRIPE_PUBLIC_KEY,
}
