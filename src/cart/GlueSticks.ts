/**
 * GlueSticks.ts
 * Decorator for Glue Sticks (NZD 25 each).
 * Adds (price x quantity) to the cost of the cart it wraps.
 */
import type { CartComponent } from './CartComponent'
import { ItemDecorator } from './ItemDecorator'

export class GlueSticks extends ItemDecorator {
  static readonly PRICE = 25 // cost of one item in NZD

  constructor(wrapped: CartComponent, quantity: number) {
    super(wrapped, quantity)
  }

  getTotalCost(): number {
    return this.wrapped.getTotalCost() + GlueSticks.PRICE * this.quantity
  }
}
