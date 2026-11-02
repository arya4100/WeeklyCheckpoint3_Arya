/**
 * Pens.ts
 * Decorator for Pens (NZD 12 each).
 * Adds (price x quantity) to the cost of the cart it wraps.
 */
import type { CartComponent } from './CartComponent'
import { ItemDecorator } from './ItemDecorator'

export class Pens extends ItemDecorator {
  static readonly PRICE = 12 // cost of one item in NZD

  constructor(wrapped: CartComponent, quantity: number) {
    super(wrapped, quantity)
  }

  getTotalCost(): number {
    return this.wrapped.getTotalCost() + Pens.PRICE * this.quantity
  }
}
