/**
 * ExerciseBooks.ts
 * Decorator for Exercise Books (NZD 30 each).
 * Adds (price x quantity) to the cost of the cart it wraps.
 */
import type { CartComponent } from './CartComponent'
import { ItemDecorator } from './ItemDecorator'

export class ExerciseBooks extends ItemDecorator {
  static readonly PRICE = 30 // cost of one item in NZD

  constructor(wrapped: CartComponent, quantity: number) {
    super(wrapped, quantity)
  }

  getTotalCost(): number {
    return this.wrapped.getTotalCost() + ExerciseBooks.PRICE * this.quantity
  }
}
