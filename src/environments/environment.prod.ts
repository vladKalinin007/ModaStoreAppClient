import { ProdEnvironment } from 'src/app/core/config/environment.enum'

export const environment = {
  production: ProdEnvironment.PRODUCTION,
  apiUrl: ProdEnvironment.API_URL,
  stripePublicKey: ProdEnvironment.STRIPE_PUBLIC_KEY,
}
