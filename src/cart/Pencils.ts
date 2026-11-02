/**
 * Pencils.ts
 * Decorator for Pencils (NZD 10 each).
 * Adds (price x quantity) to the cost of the cart it wraps.
 */
import type { CartComponent } from './CartComponent'
import { ItemDecorator } from './ItemDecorator'

export class Pencils extends ItemDecorator {
  static readonly PRICE = 10 // cost of one item in NZD

  constructor(wrapped: CartComponent, quantity: number) {
    super(wrapped, quantity)
  }

  getTotalCost(): number {
    return this.wrapped.getTotalCost() + Pencils.PRICE * this.quantity
  }
}
