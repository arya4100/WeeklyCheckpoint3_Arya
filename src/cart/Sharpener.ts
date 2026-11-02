/**
 * Sharpener.ts
 * Decorator for Sharpener (NZD 18 each).
 * Adds (price x quantity) to the cost of the cart it wraps.
 */
import type { CartComponent } from './CartComponent'
import { ItemDecorator } from './ItemDecorator'

export class Sharpener extends ItemDecorator {
  static readonly PRICE = 18 // cost of one item in NZD

  constructor(wrapped: CartComponent, quantity: number) {
    super(wrapped, quantity)
  }

  getTotalCost(): number {
    return this.wrapped.getTotalCost() + Sharpener.PRICE * this.quantity
  }
}
