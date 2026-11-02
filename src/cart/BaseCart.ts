/**
 * BaseCart.ts
 * The concrete component of the decorator pattern: an empty cart that costs 0.
 * Item decorators are wrapped around it one by one.
 */
import type { CartComponent } from './CartComponent'

export class BaseCart implements CartComponent {
  /** An empty cart has no cost. */
  getTotalCost(): number {
    return 0
  }
}
